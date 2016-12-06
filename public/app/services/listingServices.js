angular.module('listingServices',['listingServices'])
.factory('Sell', function ($http) {

	sellFactory={};
	//user.create(regData);
	sellFactory.create=function(sellData){
		
	
		return $http.post('api/sells',sellData);
	}
	return sellFactory;
	// body...
});
