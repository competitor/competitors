competitorsApp.directive('imgUpload', function() {
	return {
		restrict: 'E',
		scope: false,
		replace: true, // Replace with the template below
		transclude: true, // we want to insert custom content inside the directive
		link: function(scope, element, attrs) {
			scope.dialogStyle = {};
			if (attrs.width)
    			scope.dialogStyle.width = attrs.width;
			if (attrs.height)
    			scope.dialogStyle.height = attrs.height;
			scope.hideModal = function() {
    			scope.show = true;
			};
		}		,
	templateUrl:"/foo/imgUpload.html" 
	}
});  