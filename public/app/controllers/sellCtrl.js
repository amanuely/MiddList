
angular.module('sellController',['listingServices'])

.controller('sellctrl',function($http, $location,$timeout,Sell, Auth){
	var item=this;
	
		this.sellItem=function(sellData){
			
			console.log(this.Auth);
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
	

});
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