competitorsApp.directive('checkusername', ['$q','$http',function($q,$http) {
    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl, http) {
            ctrl.$asyncValidators.usernameTaken = function(modelValue, viewValue) {
                var def = $q.defer();
                var valid;
                $http({
                    method: 'POST',
                    url: "api/checkusername",
                    data: $.param({username:modelValue}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .success(function(data, status, headers, config){
                    if (data == ""){
                        def.resolve();
                    }else{
                        def.reject();
                    }
                }).error(function(data, status, headers, config){
                        def.reject();
                });
                return def.promise;
            };

        }
    };
}])