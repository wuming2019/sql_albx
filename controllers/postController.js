// 这个控制器完成所有与文章相关的业务处理
const postModel = require('../models/postModel.js');
const moment = require('moment');

// 获取所有文章列表数据
exports.getAllPost = (req, res) => {
	// 获取用户参数
	var obj = req.query;
	postModel.getAllPost(obj, (err, data) => {
		if (err) {
			res.json({
				code: 400,
				msg: '数据查询失败'
			});
		} else {
			// for(var i = 0; i < data.length; i++){
			//     data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss');
			// }
			res.json({
				code: 200,
				msg: '数据查询成功',
				data: data
			})
		}
	});
}
// 文章新增
exports.addPost = (req, res) => {
	// 接收参数
	var obj = req.body;
	// 添加数据库所需要的三个字段的数据
	obj.id = null;
	obj.views = 0;
	obj.likes = 0;
	obj.user_id = req.session.currentUser.id;
	// 调用数据模块中的方法
	postModel.addPost(obj, (err) => {
		if (err) {
			console.log(err);
			res.json({
				code: 400,
				msg: '数据新增失败'
			});
		} else {
			res.json({
				code: 200,
				msg: '数据新增成功'
			});
		}
	});
}
// 根据id获取文章详细数据
exports.getPostById = (req, res) => {
	// 接收参数
	var id = req.query.id;
	// 调用数据模块中的方法获取文章详细数据
	postModel.getPostById(id, (err, data) => {
		if (err) {
			res.json({
				code: 400,
				msg: '数据查询失败'
			});
		} else {
			// 将日期数据格式化
			data.created = moment(data.created).format('YYYY-MM-DDTHH:mm');
			res.json({
				code: 200,
				msg: '数据查询成功',
				data: data
			});
		}
	});
}

// 根据文章id实现文章的编辑
exports.editPostById = (req, res) => {
	// 接收参数
	var obj = req.body;
	// 调用数据模块实现文章编辑
	postModel.editPostById(obj, (err) => {
		if (err) {
			res.json({
				code: 400,
				msg: '文章编辑失败'
			})
		} else {
			res.json({
				code: 200,
				msg: '文章编辑成功'
			});
		}
	});
}

// 根据文章id删除指定的文章
exports.delPostById = (req, res) => {
	// 接收参数
	var id = req.body.id;
	// 调用数据模块实现文章删除
	postModel.editPostById(id, (err) => {
		if (err) {
			res.json({
				code: 400,
				msg: '文章删除失败'
			})
		} else {
			res.json({
				code: 200,
				msg: '文章删除成功'
			});
		}
	});
}
