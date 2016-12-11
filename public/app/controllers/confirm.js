

angular.module('Cfmcontroller',[])


.controller('cfmctrl',function($http,$window){
	var message=this;
	var myurl=$window.location.href ;
	var url1=myurl.slice(21);
	var urll='/api'.concat(url1);+
	 console.log(urll);

	this.finish=function(){
		 return $http.get(urll).then(function(data){
	  	console.log("here");
	  	console.log(data);
	  	message.errorsMsg=data.data;
	  	message.successMsg=data.data.message;
	  });
	}


});

