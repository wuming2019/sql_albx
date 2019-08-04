const express = require('express');
// 引入页面返回控制器
const pagesController = require('./controllers/pagesController');
const userController = require('./controllers/userController');
var router = express.Router();

// 配置路由
router.get('/admin/index', pagesController.getAdminIndexPage);

router.get('/admin/categories', pagesController.getAdminCategoriesPage);

router.get('/', pagesController.getAdminIndexPage);

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

router.get('/index', pagesController.getIndexPage);

router.get('/detail', pagesController.getDetailPage);

router.get('/list', pagesController.getListPage);

module.exports = router;