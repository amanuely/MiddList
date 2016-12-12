

angular.module('Cfmcontroller',[])


.controller('cfmctrl',function($http,$window,$location,$timeout){
	var message=this;
	var myurl=$window.location.href ;
	var url1=myurl.slice(21);
	var urll='/api'.concat(url1);+
	 console.log(urll);

	this.finish=function(){
		 return $http.get(urll).then(function(data){
	  	console.log("here");
	  	console.log(data);
	  
	  	if (data.data.success) {
	  	message.successMsg=data.data;

	  		$timeout(function() {
					$location.path('/login');
				},
				 2000);




	  	}
	  	else{
	  		message.errorsMsg=data.data;


	  		$timeout(function() {
					$location.path('/register');
				},
				 2000);
	  	}

	  });
	}


});

