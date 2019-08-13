// 实现所有与分类数据相关的业务处理
var cateModel = require('../models/cateModel');
// 获取所有分类数据
exports.getAllCate = (req,res)=>{
    cateModel.getAllCate((err,data)=>{
        if(err){
            res.json({code:400,msg:'数据查询失败'});
        }else{
            res.json({
                code: 200,
                msg: '数据查询成功',
                data: data
            });
        }
    });
}

// 实现分类数据的编辑
exports.editCategory = (req,res)=>{
    var obj = req.body;
    cateModel.editCategory(obj,(err)=>{
        if(err){
            res.json({code:400,msg:'数据编辑失败'})
        }else{
            res.json({
                code:200,
                msg:'数据编辑成功'
            })
        }
    })
}

// 实现分类数据的添加
exports.addCategory = (req,res)=>{
    var obj = req.body;
    obj.id = null;
    cateModel.addCategory(obj,(err)=>{
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

// 编辑分类数据删除
exports.delCategory = (req,res)=>{
	var id = req.query.id;
	cateModel.delCategory(id,(err)=>{
		if(err){
			res.json({code: 400,msg: '数据删除失败'});
		}else{
			res.json({code: 200,msg: '数据删除成功'});
		}
	});
}