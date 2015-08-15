competitorsApp.controller('header',['$scope','$http','autocompleteService','loginService',function($scope,$http,autocompleteService,loginService){
	$scope.submit= function(){
		loginService.signin();
    }
}
])