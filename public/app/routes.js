var app=angular.module('appRoutes',['ngRoute'])

	.config(function ($routeProvider,$locationProvider) {
		$routeProvider

		.when('/about',{
				templateUrl:'app/views/pages/about.html',
				authenticated:true

			})
		.when('/home',{
				templateUrl:'app/views/pages/home.html',
				controller:'sellctrl',
				controllerAs:'listController',
				authenticated:true

			})

		.when('/',{


			templateUrl:'app/views/pages/home.html',
			authenticated:true

		})

		.when('/dashboard',{


			templateUrl:'app/views/pages/dashboard.html',
			authenticated:true

		})
		.when('/register',{


			templateUrl:'app/views/pages/users/register.html',
			controller:'regctrl',
			controllerAs:'register',
			authenticated:false

		})
		.when('/login',{


			templateUrl:'app/views/pages/users/login.html',
			authenticated:false

		})
		.when('/logout',{


			templateUrl:'app/views/pages/users/logout.html',
			authenticated:true

		})
			.when('/profile',{



			templateUrl:'app/views/pages/users/profile.html',
			authenticated:true

		})
			.otherwise({redirecto:'/dashboard'});

	$locationProvider.html5Mode({
		enabled:true,
		requireBase:false
	});

	
});

	app.run(['$rootScope','Auth','$location',function($rootScope, Auth,$location){
			$rootScope.$on('$routeChangeStart', function(even, next,current){
				//console.log(Auth.isLoggedIn());

				if (next.$$route.authenticated==true) {
					if(!Auth.isLoggedIn()){
						even.preventDefault();
						$location.path('/login');
					}

				}
				else if(!next.$$route.authenticated==false){
					if(!Auth.isLoggedIn()){
						even.preventDefault();
						//$location.path('/login');
					}
					console.log("does not need");

				}
				else{
					//console.log("no prroomlem");
				}

			});



	}]);


