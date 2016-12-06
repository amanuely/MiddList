angular.module('userApp',['appRoutes','userControllers','mainController','sellController','authServices'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});

