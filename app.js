// 引入express模块
const express = require('express');
// 搭建服务器
const app = express();
// 引入路由管理
const router = require('./router.js');
// 监听
app.listen(8080, () => {
	console.log('http://127.0.0.1:8080');
});

// 托管静态资源
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));

// 配置模板引擎
app.set('view engine', 'ejs');
// res.render('index',{arr})
app.set('views', __dirname + '/views');

// 让app使用router进行路由管理
// 中间件放最后
app.use(router);