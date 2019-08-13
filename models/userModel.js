// 这个模块完成所有与用户相关的增删改查
var mysql = require('mysql');
// 创建连接
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'baixiu'
});

// 这个控制器完成所有与用户相关的增加删除修改和查询

exports.login = (email,callback)=>{
    // 创建sql语句
    // var sql = `select * from users where email = "${email}"`;
    // 参数占位符，后期你根据占位符的数量传入相应的参数，？不再需要考虑是否有引号
    var sql = `select * from users where email = ?`
    // 调用mysql模块
    connection. query(sql,[email],(err,results)=>{
        if(err) {
            callback(err);
        }else{
            callback(null,results[0]);
            // console.log(results);
            
        }
    });
}