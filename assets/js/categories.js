$(function () {
	// 数据初始化
	function init() {
		$.ajax({
			url: '/getAllCate',
			dataType: 'json',
			success: function (res) {
				$('tbody').html(template('cateListTemp', res))
			}
		})
	}
	init();

	// 添加编辑按钮的委托事件
	$('tbody').on('click', '.btnedit', function () {
		// 使用自定义属性的意义在于获取数据的时候可以直接获取到对象
		// 自定义属性值的获取
		// jq的方式：$(this).data()：获取到的是一个对象
		// 原生方式：$(this)[0].dataset：获取到的是一个对象
		var obj = $(this).data()
		console.log(obj)
		$('#id').val(obj.id)
		$('#name').val(obj.name)
		$('#slug').val(obj.slug)
		$('.optinfo').text('编辑分类数据')
		$('.btnAdd').hide()
		$('.btnEdit').show()
	})

	// 为编辑按钮绑定事件
	$('.btnEdit').on('click', function () {
		$.ajax({
			type: 'post',
			url: '/editCategory',
			data: $('form').serialize(),
			dataType: 'json',
			success: function (res) {
				if (res.code == 200) {
					$('.alert-danger > span').text(res.msg);
					$('.alert-danger').fadeIn(500).delay(3000).fadeOut(500);
					// alert('编辑成功');
					$('.info').text('新增分类目录');

					$('#name').val('');
					$('#slug').val('');
					$('#id').val('');

					$('.btnAdd').show();
					$('.btnEdit').hide();

					init();
				}
			}
		})
	});

	// 为添加按钮绑定事件
	$('.btnAdd').on('click', function () {
		$.ajax({
			type: 'post',
			url: '/addCate',
			data: $('form').serialize(),
			dataType: 'json',
			success: function (res) {
				if (res.code == 200) {
					$('.alert-danger > span').text(res.msg)
					$('.alert-danger').fadeIn(500).delay(3000).fadeOut(500)

					$('[name="name"]').val('')
					$('[name="slug"]').val('')
					init()
				}
			}
		})
	})

	// 使用事件委托的方式实现删除
	$('tbody').on('click', 'btndel', function () {
		var id = $(this).data().id;
		if (confirm('请问是否真的需要删除')) {
			$.ajax({
				type: 'get',
				url: '/delCategory?id=' + id,
				dataType: 'json',
				success: function (res) {
					if (res.code == 200) {
						alert('删除成功');
						init();
					}
				}
			})
		}
	});

	// 全选全不选
	$('.chkAll').on('click', function () {
		// 不要试图通过checked属性来获取复选框的状态，因为jq进行封装
		var status = $('.chkAll').prop('checked');
		// 为tbody中的所有复选框设置相同状态的值
		$('tbody').find('.chkSinger').prop('checked', status);
		// 让批量按钮显示
		var cnt = $('tbody').find('.chkSinger:checked').length;
		// 判断是否让全选复选框被选中
		if (cnt > 1) {
			$('.btndels').show(500);
		} else {
			$('.btndels').hide(500);
		}
	});

	// 当用户选择一条以上的数据时，显示”批量删除“按钮，否则不显示
	$('tbody').on('click', '.chkSinger', function () {
		var total = $('tbody').find('.chkSinger').length;
		// 获取当前tbody中被选中的复选框的数量
		var cnt = $('tbody').find('.chkSinger:checked').length;
		// 判断
		if (cnt > 1) {
			$('.btndels').show(500);
		} else {
			$('.btndels').hide(500);
		}
		// 判断是否让全选复选框被选中
		if (cnt == total) {
			$('.chkAll').prop('checked', true);
		} else {
			$('.chkAll').prop('checked', false);
		}
	});

	// 批量删除
	$('.btndels').on('click', function () {
		if (confirm('请问是否真的需要删除？')) {
			// 获取所有被选中的复选框的id
			// 1.获取所有被选中的复选框
			var allchk = $('tbody').find('.chkSinger:checked'); //数组
			var arr = [];
			for (var i = 0; i < allchk.length; i++) {
				arr.push($(allchk[i]).data('id'));
			}
			// 发起ajax
			$.ajax({
				type: 'get',
				url: '/delCategory',
				data: {
					id: arr.join(',')
				},
				dataType: 'json',
				success: function (res) {
					if (res.code == 200) {
                        $('.alert-danger > span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500);
						init();
					}
				}
			})
		}
	});
})