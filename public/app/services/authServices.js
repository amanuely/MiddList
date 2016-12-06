angular.module('authServices',[])
.factory('Auth', function ($http, AuthToken) {
	var authFactory={};
	//user.create(regData);
	authFactory.login=function(loginData){
	
		return $http.post('api/authenticate',loginData).then(function(data){
			 AuthToken.setToken(data.data.token);
			
			return data;
		});
	};

	authFactory.isLoggedIn=function(){
		if (AuthToken.getToken()) {
			return true;
		}
		else{
			return false;
		}

	};

	authFactory.getUser=function(){
		if (AuthToken.getToken) {
			return $http.post('/api/profile');
		}else{
			$q.reject({message:'user has no token'});
		}

	};
	authFactory.getListing=function(){
		if (AuthToken.getToken) {
			return $http.get('/api/sells');
		}else{
			$q.reject({message:'user has no token'});
		}

	};

	authFactory.logout=function(){
		AuthToken.setToken();

	};
	return authFactory;
	// body...
})
.factory('AuthToken', function($window){
	var authTokenFactory={};

	//AuthToken.setToken(token);

	 authTokenFactory.setToken=function(token){
	 	if(token){
	 		$window.localStorage.setItem('token',token);

	 	}
	 	else{
	 		$window.localStorage.removeItem('token');

	 	}

	 };
	 authTokenFactory.getToken=function(){
	 	 return $window.localStorage.getItem('token');

	 };


	return  authTokenFactory;

})
.factory('AuthInterceptors', function(AuthToken){
	var AuthInterceptorsFactory={};
	AuthInterceptorsFactory.request=function(config){
		var token= AuthToken.getToken();
		if (token) {
			config.headers['x-access-token']=token;
		}
		return config;

	};
	return AuthInterceptorsFactory;

});


