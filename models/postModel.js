const conn = require('../commen.js/myconn.js');

// 获取所有文章数据
exports.getAllPost = (obj, callback) => {
	// 创建sql语句 -- 多表连接
	var sql = `select posts.*,users.nickname,categories.name
               from posts
               join users ON posts.user_id = users.id
			   join categories ON posts.category_id = categories.id
			   where 1 = 1  `;
	if(obj.cate && obj.cate != 'all'){
		sql += ` and category_id = ${obj.cate}`
	};
	if(obj.status && obj.status != 'all'){
		sql += ` and posts.status = '${obj.status}'`
	};

	sql += ` order by id desc
	        limit ${(obj.pageNum-1)*obj.pageSize},${(obj.pageSize)}`;
	// 调用方法获取数据
	conn.query(sql,(err,results)=>{
		if(err){
			callback(err);
		}else{
			// 再创建sql语句进行总记录的查询
			sql = `select count(*) as cnt
			       from posts
			       join users on posts.user_id = users.id
				   join categories on posts.category_id  = categories.id`;
			conn.query(sql,(err2,res2)=>{
				if(err){
					callback(err2);
				}else{
					// 没有错误，不仅仅要返回之前的查询数据，而且还要返回当前查询的总记录数
					callback(null,{ data: results,total: res2[0].cnt });
				}
			});	   
		}
	});
}