$(function () {
	// 一选择文件就实现文件的上传操作
	$('#feature').on('change', function () {
		// 经典：formdata + ajax
		// 使用formdata收集图片数据
		// 使用ajax发起异步请求
		// 1.获取文件对象
		var myfile = document.querySelector('#feature').files[0];
		// var myfile = this.files[0];
		// console.log(myfile);

		// 2.创建formdata对象
		var formdata = new FormData();
		// 3.在formdata中追加数据
		formdata.append('img', myfile);
		formdata.append('username', "名字叫 ： jackandrose");
		// 4.使用ajax发起请求
		$.ajax({
			type: 'post',
			// 路径一定要设置正确
			url: '/uploadFile',
			data: formdata,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function (res) {
				// console.log(res);
				if (res.code == 200) {
					// 将文件名称存储到指定的隐藏域中
					$('[name=feature]').val(res.img)
					// 实现预览，发起二次请求
					$('.thumbnail').attr('src', '/uploads/' + res.img).show();
				} else {
					$('.alert-danger > span').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
				}
			}
		});
	});

	// 动态加载分类数据
	$.ajax({
		type: 'get',
		url: '/getAllCate',
		dataType: 'json',
		success: function (res) {
			// console.log(res);
			// 生成分类下拉列表动态结构
			var str = '<option value="all">所有分类</option>';
			for (var i = 0; i < res.data.length; i++) {
				str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
			}
			$('#category').html(str);
		}
	})

	// 创建ckeditor富文本框控件替换页面中的textarea
	CKEDITOR.replace('content');

	// 获取参数id
	var id = itcast.getParameter(location.search).id;

	// 保存文章数据，实现文章的新增
	$('.btnsave').on('click', function (e) {
		e.preventDefault();
		// 同步数据、将富文本框中的数据与textarea中的数据进行同步
		// 同步后两者数据会一样
		CKEDITOR.instances.content.updateElement()
		// console.log(CKEDITOR.instances.content.getData())
		// 这个方法确实也是能获取到数据，但是需要我们手动拼接
		// console.log($('form').serialize());
		if (id) {
			opt('/editPostById');
		} else {
			opt('/addPost');
		}
	});
	// 实现编辑和新增
	function opt(url) {
		$.ajax({
			type: 'post',
			url: url,
			data: $('form').serialize(),
			dataType: 'json',
			success: function (res) {
				if (res.code == 200) {
					// 提示
					// 跳转
					location.href = '/admin/posts';
				} else {
					console.log(res.msg);
				}
			}
		});
	}

	// 判断当前是编辑还是新增
	if (id) {
		// 说明是编辑
		// 根据id发起ajax请求
		$.ajax({
			type: 'get',
			// url:'/getPostById?id='+id,
			url: 'getPostById',
			data: {
				id
			},
			dataType: 'json',
			success: function (res) {
				// console.log(res)
				// 实现数据默认展示
				$('#title').val(res.data.title);
				$('#content').val(res.data.content);
				$('#slug').val(res.data.slug);
				$('.thumbnail').attr('src', '/uploads/' + res.data.feature).show();
				$('#category').val(res.data.category_id);
				$('#status').val(res.data.status);
				// 图片隐藏域
				$('[name="feature"]').val(res.data.feature);
				// id隐藏域
				$('[name="id"]').val(res.data.id);
				// 时间戳处理
				$('#created').val(res.data.created);
			}
		});
	}
});