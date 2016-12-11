angular.module('userApp',['appRoutes','userControllers','mainController','sellController','authServices','Cfmcontroller'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});

