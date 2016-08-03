'use strict';
/**
* webFrontApp Module
*
* profileCtrl 个人中心控制器
*/
angular.module('webFrontApp')
.controller('profileCtrl', ['$scope', '$state', 'haouHttp', '$localStorage', '$sessionStorage', 'ngDialog', function($scope, $state, haouHttp, $localStorage, $sessionStorage, ngDialog) {
	// 控制器初始化函数
	function init() {
		S.footerStatus = 'profile';
		S.profile = {};
		S.profile.phone = '15113992194';
		S.ifProfile = true; // 个人中心导航标志
		S.profile.balances = '0.00'; // 默认余额为0
		S.isLogin = !!$localStorage.token; // 是否登陆
		S.isLogin = false;
		S.goState = goState; // 页面跳转
		S.ifbind = ifbind; // 解绑手机、绑定手机、修改密码
		S.defaultGravatar = 'http://localhost:9000/images/yeoman.png'; // 没有登录时候的默认头像
		delete $localStorage.name;
		getCredits();// 获取积分
	}
	// 按钮点击跳转
	function goState(state, params) {
		$state.go(state, params);// 第二个参数为URL传入的参数
	}
	// 获取积分API数据
	function getCredits() {
		haouHttp.get('api/v1/integral/getCredits.json').success(function(response) {
			S.profile.credits = response.data.credits;
			console.log(S.profile.credits);
		}).error(function(response) {
			alert(response.error);
		});
	}
	// 是否绑定手机
	function ifbind(option) {
		if (S.isLogin) {
			// 已经登陆，判断是修改密码还是解绑手机
			if (option) {
				// 修改密码,跳转到修改密码页面
				goState('changePassword');
			} else {
				// 非修改密码，即绑定手机或者解绑手机
				if (S.profile.phone) {
					// 存在手机号码即解绑
					S.profile.phone && goState('unbindPhone', {
						'phone': S.profile.phone
					})
				} else {
					// 不存在手机号码即绑定手机号码，跳转到绑定手机页面
					goState('bindPhone');
				}
			}
		} else {
			// 未登陆则跳转到登陆页面
			goState('login');
		}
	}
	// 控制器别名写法
	var S = this;
	$localStorage.name = '谢泽辉';
	// delete $localStorage;
	S.name = $localStorage.name;
	$sessionStorage.name = 'haou';
	console.log($localStorage);
	init(); // 初始化
	console.log($sessionStorage);
}]);