angular.module('listingServices',['listingServices'])
.factory('Sell', function ($http) {

	sellFactory={};
	//user.create(regData);
	sellFactory.create=function(sellData){
		
	
		return $http.post('api/sells',sellData);
	}
	sellFactory.delete=function(deleteData){
		
	
		return $http.delete('api/sells',deleteData);
	}

	sellFactory.upload=function(uploadUrl, data){
		//console.log(uploadUrl);
		//console.log(data);
		
		var fd= new FormData();
		for(var key in data){
			
			fd.append(key, data[key]);

			$http.post(uploadUrl,fd,{
				transformRequest: angular.identity,
				
				headers:{
					'Content-Type':undefined }
			})
		}

	}
	return sellFactory;
	// body...
});
