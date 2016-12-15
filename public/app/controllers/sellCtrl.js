
angular.module('sellController',['listingServices'])


.controller('sellctrl',function($scope,$http, $location,$timeout,Sell, Auth){
	var item=this;
	var response =this;
	
	$scope.listController={};

			var poster;

			Auth.getUser().then(function(d){
				console.log("the following");
				poster=d.data.email;
				console.log(poster);

			});
	
		this.sellItem=function(sellData){
			
			// console.log(sellData);
			//console.log(sellData.email);
			
			
			//console.log(Auth.g());
			
			Sell.create(item.sellData).then(function(data ){
				if(data.data.success){
					item.successMsg=data.data.message;
						$timeout(function() {
					$location.path('/dashboard');
				},
				 1000);

				}
				else{
					item.errorsMsg=data.data.message;

				}

			});
		}


		this.deleteItem= function(deletedata){

			$http.put('api/delete',deletedata ).then(function(d){

				if (d.data.submitting) {
					console.log("success");
				}
				console.log(d);
			})
			
		}



		this.submit=function(sellItem){
			var uploadUrl = 'api/upload';
			//console.log($scope.listController.file);
			var data=$scope.listController.file;
			console.log(data);
			var fd= new FormData();

			for(var key in data){
				//console.log(key);
				//console.log(data[key	]);

			
			fd.append(key, data[key]);
		

	
		}
			console.log(fd);
				$http.post(uploadUrl,fd,{
				transformRequest: angular.identity,
				
				headers:{
					'Content-Type':undefined }
			}).then(function(d){
				console.log("the following is resoonse");
			console.log(d);
		})
			
		
			//console.log("you are submitting something");
		}

	



});















	