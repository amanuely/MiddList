

angular.module('userControllers',['userServices'])

.controller('regctrl',function($http, $location,$timeout, User){

	var app=this;
	this.regUser=function(regData){
		
		app.errorsMsg=false;

		User.create(app.regData).then(function(data){
			
			if (data.data.success) {
				app.successMsg=data.data.message;
				$timeout(function() {
					$location.path('/');
				},
				 1000);


			}
			else{
				app.errorsMsg=data.data.message;

			}

		});
		

	};
});
