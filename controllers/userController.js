// 这个控制器完成所有与用户相关的业务操作
const userModel = require('../models/userModel.js');

exports.login = (req,res)=>{
    // 接收参数
    var obj = req.body;
    // 业务处理--调用数据模块
    userModel.login(obj.email,(err,data)=>{
        if(err){
            res.json({code:400,msg:'服务器异常'});
        }else{
            if(data){
                if(data.password == obj.password){
                    // 使用session写入登陆状态
                    req.session.isLogin = 'true';
                    req.session.currentUser = data;
                    res.end(JSON.stringify({code:200,msg:'登陆成功'}));
                }else {
                    res.JSON({code:400,msg:'密码出入错误'});
                }
            }else{
                res.json({code:400,msg:'邮箱输入错误'});
            }
        }
    });
    // 返回结果
}