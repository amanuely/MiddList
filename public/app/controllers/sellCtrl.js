
angular.module('sellController',['listingServices'])


.controller('sellctrl',function($scope,$http, $location,$timeout,Sell, Auth){
	var item=this;
	var response =this;
	
	$scope.listController={};
	
		this.sellItem=function(sellData){
			
			//console.log(this.Auth);
			Sell.create(item.sellData).then(function(data){
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






	// sellFactory.upload=function(uploadUrl, data){
	// 	//console.log(uploadUrl);
	// 	//console.log(data);
		
	// 	var fd= new FormData();
	

	// }


// .directive('filemodel', function() {
//   return {
//   	restrict:'A',
//     controller:function($scope){
//     	$scope.doUpload=function(){
//     		console.log("uploading the picture");
//     	}
//     },
//     link:function(scope, element, attrs){
//     		attrs.$observe('filemodel', function(){
//     			scope.doUpload('test');
//     		})
//     	}
//   };
// });












// .directive('filemodel',['$parse','multipartForm', function($parse){
// 	console.log("parsing");

// 	return {
// 		restrict:'A',
// 		controller:function($scope){
//     	$scope.doUpload=function(){
//     		console.log("uploading the picture");
//     	}
//     },

// 		link:function(scope,element, attrs){
// 			var model=$parse(attrs.fileModel);
// 			var modelSetter= model.assign;
// 			element.bind('change', function(){
// 				$scope.apply(function(){
// 					modelSetter(scope, element[0].file[0]);
// 				})

// 			})

// 		}
// 	}

// }]);


// `






 // .config(function () {
	// console.log("testing sell controller");
 // });

// .controller('sellctrl',function($http, $location,$timeout, Sell){

// 	var item=this;
// 	this.sellItem=function(sellData){
		

		
// 		console.log("here");
// 		Sell.create(item.sellData).then(function(data){
// 				console.log(data);
			
// 			// if (data.data.success) {
// 			// 	//app.successMsg=data.data.message;
				

// 			// 	$timeout(function() {
// 			// 		$location.path('/');
// 			// 	},
// 			// 	 2000);


// 			// }
// 			// else{
// 			// 	//app.errorsMsg=data.data.message;

// 			// }

// 		});

// 	};
// });