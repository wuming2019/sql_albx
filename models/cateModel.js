var conn = require('../commen/myconn.js');

// 获取所有分类数据
exports.getAllCate = (callback) => {
    var sql = 'select * from categories';
    conn.query(sql,(err,data)=>{
        if(err){
            callback(err);
        }else{
            callback(null,data);
        }
    });
}

// 实现分类数据的编辑
exports.editCategory = (obj,callback)=>{
    var sql = 'update categories set ? where id = ?';
    conn.query(sql,[obj,obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 实现分类数据的新增
exports.addCategory = (obj,callback)=>{
    var sql = 'insert into categories set ?';
    conn.query(sql,obj,(err) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 实现分类数据删除
exports.delCategory = (id,callback)=>{
    var sql = 'delete from categories where id = ?';
    conn.query(sql,[id],(err,results)=>{
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}