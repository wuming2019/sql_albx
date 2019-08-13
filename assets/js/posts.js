$(function () {
  // 定义全局的页码和数量
  var pageNum = 1;
  var pageSize = 5;

  function init(search) {
    $.ajax({
      url: '/getAllPost',
      type: 'get',
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        ...search
      },
      success: function (result) {
        console.log(result);
        // 生成动态数据结构
        // 如果数据是对象，直接传递对象，如果数据是数组，就包装为对象
        var html = template('postTemp', result.data);
        $('tbody').html(html);
        // 生成分页结构
        setPage(Math.ceil(result.data.total / pageSize));
      }
    })
  }
  init();
  // 实现分页功能
  /* 
   * @param pageCurrent 当前所在页
   * @param pageSum 总页数
   * @param callback 调用ajax
   */
  function setPage(total) {
    $('.pagination').bootstrapPaginator({
      // 设置版本号 
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage: pageNum,
      // 总页数
      totalPages: total,
      // 当单击操作按钮的时候,执行该函数,调用ajax渲染页面 
      onPageClicked: function (event, originalEvent, type, page) {
        // page就是当前想获取数据的页码
        pageNum = page;
        // 重新调用加载数据的方法
        init();
      }
    })
  }
  // 加载分类数据
  $.ajax({
    type: 'get',
    url: '/getAllCate',
    dataType: 'json',
    success: function (res) {
      // console.log(res)
      var str = '<option value = "all">所有分类</option>';
      for (var i = 0; i < res.data.length; i++) {
        str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
      }
      $('.cateSelector').html(str);
    }
  });
  // 实现筛选功能
  $('.btn-search').on('click', function () {
    // 收集数据
    var obj = {
      cate: $('.cateSelector').val(),
      status: $('.statuSelector').val()
    }
    console.log(obj);
    // 发送ajax请求
    init(obj);
  });

  // 实现文章的删除
  $('tboby').on('click', '.btnDel', function () {
    var id = $(this).data('id');
    // 弹出确认
    if (confirm('请问是否真的需要删除？')) {
      $.ajax({
        url: '/delPostById?id=' + id,
        type: 'get',
        dataType: 'json',
        success: function (res) {
          if (res.code == 200) {
            $('.alert-danger > span').text(res.msg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            // 刷新的细节
            // 基本事实：删除和刷新是两个操作
            // 1.如果当前页只有一条记录，那么删除之后就应该加载 上一页的数据
            // 2.如果当前页有多条记录，那么就直接重新加载这一页
            // 3.如果是第一页，只有一条记录，那么就给出提示
            if ($('tbody>tr').length == 1) {
              if (pageNum > 1) {
                pageNum--
              }
            }
            init()
          }
        }
      });
    }
  });
});