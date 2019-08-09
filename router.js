const express = require('express');
// 封装路由模块
var router = express.Router();
// 引入页面返回控制器
const pagesController = require('./controllers/pagesController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const cateController = require('./controllers/cateController');
const uploadController = require('./controllers/uploadController');


// 配置路由
// 后台页面
router.get('/admin/index', pagesController.getAdminIndexPage);

router.get('/admin/categories', pagesController.getAdminCategoriesPage);

router.get('/admin', pagesController.getAdminIndexPage);

router.get('/admin/comments', pagesController.getAdminCommentsPage);

router.get('/admin/login', pagesController.getAdminLoginPage);

router.get('/admin/nav-menus', pagesController.getAdminNavmenusPage);

router.get('/admin/password-reset', pagesController.getAdminPasswordPage);

router.get('/admin/post-add', pagesController.getAdminPostAddPage);

router.get('/admin/posts', pagesController.getAdminPostsPage);

router.get('/admin/profile', pagesController.getAdminProfilePage);

router.get('/admin/slides', pagesController.getAdminSlidesPage);

router.get('/admin/users', pagesController.getAdminUsersPage);

router.get('/admin/settings', pagesController.getAdminSettingsPage);

// 前台页面
router.get('/index', pagesController.getIndexPage);

router.get('/detail', pagesController.getDetailPage);

router.get('/list', pagesController.getListPage);

// 业务处理部分
router.get('/',pagesController.getIndexPage);


// 业务处理路由
// 用户登陆验证
router.post('/login',userController.login);
router.get('/getAllPost',postController.getAllPost);
router.get('/getAllCate',cateController.getAllCate);

// 实现文件的上传
router.post('/uploadFile',uploadController.uploadFile);
// 实现文章的上传
router.post('/addPost',postController.addPost);

module.exports = router;