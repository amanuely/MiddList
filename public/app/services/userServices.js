angular.module('userServices',[])
.factory('User', function ($http) {
	userFactory={};
	//user.create(regData);
	userFactory.create=function(regData){
		
	
		return $http.post('api/users',regData);
	}
	userFactory.confirm= function(){
		return $http.post('api/verify/:id');
	}
	return userFactory;
	// body...
});


