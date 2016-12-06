

angular.module('userControllers',['userServices'])

.controller('regctrl',function($http, $location,$timeout, User){

	var app=this;
	this.regUser=function(regData){
		//console.log("forme");
		//console.log(regData);
		app.errorsMsg=false;

		
		//console.log(this.regData);
		User.create(app.regData).then(function(data){
				//console.log(data);
			
			if (data.data.success) {
				app.successMsg=data.data.message;
				

				$timeout(function() {
					$location.path('/');
				},
				 2000);


			}
			else{
				app.errorsMsg=data.data.message;

			}

		});

	};
});

// config(function () {
// 	console.log("testing user controller");
// });