competitorsApp.controller('tpbase',['$scope', function($scope){
	$scope.currentTab = window.location.hash.substr(1);
	if ($scope.currentTab == "")
		$scope.currentTab = "news";
	console.log($scope.currentTab);
}])