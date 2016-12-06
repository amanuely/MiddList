angular.module('mainController',['authServices'])
.controller('mainCtrl', function(Auth,$timeout, $location,$rootScope){
	var app=this;
	app.loadme=false;



	
	$rootScope.$on('$routeChangeStart', function(){

			if(Auth.isLoggedIn()){
			app.isLoggedIn=true;

		Auth.getUser().then(function(data){
			//console.log(data.data);
			app.email=data.data.email;
			app.name=data.data.name;
			app.loadme=true;
		});
		Auth.getListing().then(function(result){
			//console.log("returning data");
			//console.log(result);
			app.listing=result.data;
			console.log(app.listing);
			//app.email=data.data.email;
			//app.name=data.data.name;
			app.loadme=true;
		});

	}
	else{
		app.isLoggedIn=false;
		app.email='';
		app.loadme=true;
		//console.log(" not logged in ");


	}

	});








	this.doLogin=function(loginData){
		
		app.errorsMsg=false;

		
		//console.log(this.regData);
		Auth.login(app.loginData).then(function(data){
				//console.log(data);
			
			if (data.data.success) {
				app.successMsg=data.data.message;
				

				$timeout(function() {
					$location.path('/dashboard');
					app.loginData='';
					app.successMsg=false;
				},
				 2000);


			}
			else{
				app.errorsMsg=data.data.message;

			}

		});



	};
	this.logout=function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},1000);
	};
});




