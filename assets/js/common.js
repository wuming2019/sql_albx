var itcast = {
	// 获取路由的名称
	getRouterName: (str) => {
		// 获取当前路由名称
		var index = str.indexOf('?');
		var routerName = '';
		if (index == -1) {
			// 说明没有参数
			routerName = str.substring(str.lastIndexOf('/') + 1);
		} else {
			routerName = str.substring(str.lastIndexOf('/') + 1, str.indexOf('?'));
		}
		return routerName;
	}
}