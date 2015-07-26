competitorsApp.directive('checkemail', ['$q','$http',function($q,$http) {
    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl, http) {
            ctrl.$asyncValidators.emailTaken = function(modelValue, viewValue) {
                var def = $q.defer();
                var valid;
                $http({
                    method: 'POST',
                    url: "api/checkemail",
                    data: $.param({email:modelValue}),
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