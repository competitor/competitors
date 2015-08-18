competitorsApp.controller('profile',['$scope','$http', function($scope,$http){
    var queries = window.location.hash.substring(1).split('#');
    $scope.username = window.location.href.split('/').pop().split('#')[0];
    console.log($scope.username);
    for (var i in queries){
        console.log(queries[i]);
        if (queries[i]=="personal" || queries[i]=="favorite" || queries[i] == "friends"){
            $scope.currentTab=queries[i];
        }
        if (queries[i]=="players" || queries[i]=="teams" ){
            $scope.currentFavoriteTab=queries[i];
        }
    }
    if ($scope.currentTab!="personal" && $scope.currentTab!="favorite" && $scope.currentTab!="friends"){
        $scope.currentTab = "personal";
    }
    if ($scope.currentFavoriteTab != "players" && $scope.currentFavoriteTab!="teams"){
        $scope.currentFavoriteTab = "teams";
    }
    $scope.editPrimary = false;
    $scope.editSocial = false;

    var getUserProfile = function(){
        $http({
            method: 'GET',
            url: "/api/getuserprofile",
            params: {username:$scope.username},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config){
            console.log(data);
            $scope.social = data.social;
            $scope.username = data.username;
            $scope.birthday = data.birthday;
            $scope.first_name = data.first_name;
            $scope.last_name = data.last_name;
        }).error(function(data, status, headers, config){
                def.reject();
        });
    }

    var getFavoriteTeams = function(){
        $http({
            method: 'GET',
            url: "/api/getfavoriteteams",
            params: {username:$scope.username},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config){
            $scope.favoriteteams = data;
            console.log($scope.favoriteteams)
        }).error(function(data, status, headers, config){
                def.reject();
        });
    }
    var getFavoritePlayers = function(){
        $http({
            method: 'GET',
            url: "/api/getfavoriteplayers",
            params: {username:$scope.username},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config){
            $scope.favoriteplayers = data;
            console.log($scope.favoriteplayers);
        }).error(function(data, status, headers, config){
                def.reject();
        });
    }

    if ($scope.currentTab == "personal"){
        getUserProfile();
    }else if ($scope.currentTab == "favorite"){
        if ($scope.currentFavoriteTab == "players"){
            getFavoritePlayers(); 
        }else{
            getFavoriteTeams(); 
        }
    }

    $scope.getUserProfile = getUserProfile;
    $scope.getFavorite = function(){
        if ($scope.currentFavoriteTab == "players"){
            getFavoritePlayers(); 
        }else{
            getFavoriteTeams(); 
        }
    }
    $scope.change = function($event){

    }
}])
