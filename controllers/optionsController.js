// 这个控制器文件专门用来处理options表的业务处理
const optionsModel = require('../models/optionsModel');

exports.addMenu = (req,res)=>{
    var obj = req.body;
    obj.icon = 'fa fa-glass';
    optionsModel.addMenu(obj,(err)=>{
        if(err){
            res.json({code:400,msg:'数据新增失败'})
        }else{
            res.json({
                code:200,
                msg:'数据新增成功'
            })
        }      
    });
}

// 获取网站默认设置
exports.getOptions = (req,res)=>{
    optionsModel.getOptions((err,data)=>{
        if(err){
            res.json({code: 400,msg: '数据查询失败'});
        }else{
            res.json({
                code: 200,
                msg: '数据查询成功',
                data: data
            })
        }
    })
}

// 实现网站设置的更新提交
exports.updateOptions = (req,res)=>{
    // 接收参数
    var obj = req.body;
    // 对参数进行细节处理
    obj.comment_status = obj.comment_status ? 1 : 0;
    obj.comment_reviewed = obj.comment_reviewed ? 1 : 0;
    // 调用数据模块进行处理
    optionsModel.updateOptions(obj,(err)=>{
        if(err){
            res.json({code: 400,msg: '数据更新失败'})
        }else{
            res.json({
                code: 200,
                msg: '数据更新成功'
            })
        }
    })
}