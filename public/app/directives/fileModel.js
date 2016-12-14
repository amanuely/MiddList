app.directive('fileModel', ['$parse', function($parse){
	console.log("checking if sell sellController");
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				console.log("checking if sell sellController");
				scope.$apply(function(){
					console.log(element[0].files[0]);
					modelSetter(scope, element[0].files[0]);
				})
			})
		}
	}
}])





