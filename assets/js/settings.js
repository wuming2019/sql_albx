$(function () {
    // 封装一个刷新数据的方法
    function init() {
        $.ajax({
            url: '/getSettings',
            dataType: 'json',
            success: function (res) {
                $('form').html(template('settingTemp', res));
            }
        });
    }
    init();

    // 保存设置
    $('form').on('click', '.btnSave', function () {
        // 收集数据
        var data = $('form').serialize();
        // 发起请求
        $.ajax({
            type: 'post',
            url: '/updateSettings',
            dataType: 'json',
            success: function(res){
                // console.log(res);
                if(res.code == 200){
                    $('.alert-danger > span').text(res.msg);
                    $('.alert-danger').fade(500).delay(2000).fadeOut(500);
                    init();
                }
            }
        });
    });
});