angular.module('listingServices',['listingServices'])
.factory('Sell', function ($http) {

	sellFactory={};
	//user.create(regData);
	sellFactory.create=function(sellData){
		
		//sellData["email"]=email;
		//console.log(sellData);
		
	
		return $http.post('api/sells',sellData);
	}
	sellFactory.delete=function(deleteData){
		
	
		return $http.delete('api/sells',deleteData);
	}
	return sellFactory;
	
});
