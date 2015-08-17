competitorsApp.controller('profile',['$scope','$http', '$filter',function($scope,$http,$filter){
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
    console.log(angular.element("username"));
    $scope.editPrimary = false;
    $scope.editSocial = false;
    $scope.personalshow = true;
    $scope.favoriteshow =false;
    $scope.friendsshow =false;

    console.log($scope.theBirthday);
    console.log("dateForDatePicker" + $scope.dateForDatePicker);
    // $scope.social = {
    //     "facebook": $scope.userprofile.facebook,
    //     "google": $scope.userprofile.googleplus,
    //     "email": $scope.userprofile.user.email,
    //     "twitter": $scope.userprofile.twitter,
    //     "instagram": $scope.userprofile.instagram
    // };

    $scope.startUpdateUserProfile = function(){
        $scope.editPrimary=! $scope.editPrimary;
    };

    $scope.updateUserProfile = function(){
        $scope.editPrimary = !$scope.editPrimary;
        console.log($scope.username);
        console.log($scope.first_name);
        console.log($scope.last_name);
        console.log($scope.datePicker);
        var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
        $scope.birthday = $filter('date')($scope.datePicker, "yyyy-MM-dd");
        console.log($scope.birthday);
        angular.element.ajax({
                  type: "post",
                  url: "/update_profile",
                  data: {
                      'csrfmiddlewaretoken': token,
                      'userName': $scope.username,
                      'firstName':$scope.first_name,
                      'lastName': $scope.last_name,
                      'birthday': $scope.birthday,
                      },

                  enctype: 'multipart/form-data',

                  success: function() {
                      alert("success");
                      getUserProfile();
                      location.reload(true);
                  },
                  error: function(e) {
                    console.log(e);
                        },
              });
    };

    $scope.startUpdateSocialProfile = function(){
        $scope.editSocial=! $scope.editSocial;
    };

    $scope.updateSocialProfile = function(){
        $scope.editSocial = !$scope.editSocial;
        console.log($scope.social);
        console.log($scope.social.email);
        console.log($scope.social.facebook);
        console.log($scope.social.twitter);
        console.log($scope.social.googleplus);
        console.log($scope.social.instagram);
        var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
        angular.element.ajax({
                  type: "post",
                  url: "/update_social_profile",
                  data: {
                      'csrfmiddlewaretoken': token,
                      'userName': $scope.username,
                      'email': $scope.social.email,
                      'facebook':$scope.social.facebook,
                      'twitter': $scope.social.twitter,
                      'googleplus': $scope.social.googleplus,
                      'instagram': $scope.social.instagram,
                      },

                  enctype: 'multipart/form-data',

                  success: function() {
                      alert("success");
                      location.reload(true);
                  },
                  error: function(e) {
                    console.log(e);
                        },
              });
    };

    var getUserProfile = function(){
        $http({
            method: 'GET',
            url: "/api/getuserprofile",
            params: {username:$scope.username},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config){
            console.log(data.social);
            $scope.social = data.social;
            $scope.username = data.username;
            $scope.birthday = new Date(data.birthday);
            $scope.first_name = data.first_name;
            $scope.last_name = data.last_name;
            $scope.datePicker = $scope.birthday;
            $scope.birthday = $filter('date')($scope.birthday, "yyyy-MM-dd");
        }).error(function(data, status, headers, config){
                def.reject();
        });
    };

    var getFavoriteTeams = function(){
        $http({
            method: 'GET',
            url: "/api/getfavoriteteams",
            params: {username:$scope.username},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config){
            $scope.favoriteteams = data;
            console.log($scope.favoriteteams);
        }).error(function(data, status, headers, config){
                def.reject();
        });
    };

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
    };

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
    };


    $scope.change = function($event){

    };
}]);
