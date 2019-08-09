// 这个控制器完成所有与文章相关的业务处理
const postModel = require('../models/postModel.js');
const moment = require('moment');

// 获取所有文章列表数据
exports.getAllPost = (req,res)=>{
    // 获取用户参数
    var obj = req.query;
    postModel.getAllPost(obj,(err,data)=>{
        if(err){
            res.json({code:400,msg:'数据查询失败'});
        }else{
            // for(var i = 0; i < data.length; i++){
            //     data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss');
            // }
            res.json({
                code : 200,
                msg : '数据查询成功',
                data : data
            })
        }
    });
}
// 文章新增
exports.addPost = (req,res)=>{
    // 接收参数
    var obj = req.body;
    // 添加数据库所需要的三个字段的数据
    obj.views = 0;
    obj.likes = 0;
    obj.user_id = req.session.currentUser.id;
    // 调用数据模块中的方法
    postModel.addPost(obj,(err)=>{
        if(err){
            console.log(err);
            res.json({code: 400,msg: '数据新增失败'});
        }else{
            res.json({code: 200,msg: '数据新增成功'});
        }
    });
}