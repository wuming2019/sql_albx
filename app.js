// 引入express模块
const express = require('express');
// 搭建服务器
const app = express();
// 引入路由管理
const router = require('./router.js');
// 引入body-parser模块
const bodyParser = require('body-parser');
// req.body;post
// req.query;get
// 引入session模块
const session = require('express-session');
// 引入querystring模块
const querystring = require('querystring');
// 监听
app.listen(8080,()=>{
	console.log('http://127.0.0.1:8080');
})
// 托管静态资源
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

// 配置模板引擎
app.set('view engine', 'ejs');
// res.render('index',{arr})
app.set('views', __dirname + '/views');

// 配置body-parser配置
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// 使用session中间件进行状态保持
app.use(session({
	secret: 'my_albx_35',
	resave: false,
	saveUninitialized: false,
}))

// 导航守卫
app.use(function (req, res, next) {
	// 三种场合不用登陆
	// 1.登陆页
	// 2.前面三个页面不用登陆
	// 3.有登陆状态
	if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('admin') == -1) {
		next();
	} else{
		res.redirect('/admin/login');
	}
});

// 让app使用router进行路由管理
// 中间件放最后
app.use(router);