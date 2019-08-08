$(function () {
	// 获取元素
	let menuPosts = $('#menu-posts');
	let menuSettings = $('#menu-settings');
	// 获取当前路由名称
	let routerName = itcast.getRouterName(location.href);
	console.log(routerName);
	
	// 判断是否满足条件
	if (routerName == 'posts' || routerName == 'post-add' || routerName == 'categories') {
		// 实现展开
		menuPosts.addClass('in').attr('aria-expanded', true);
	}
	if (routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings') {
		// 实现展开
		menuSettings.addClass('in').attr('aria-expanded', true);
	}
	$('#' + routerName).addClass('active');
})