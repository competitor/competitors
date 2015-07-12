competitorsApp.controller('register',['$scope','$http','$timeout',function($scope,$http,$timeout){
            console.log($scope.formss);
            $scope.register_agreement = false;
            {% for field in form %}
                var {{field.name}}_timer;
                var timer;
                // console.log({{field.name}}_timer);
                $scope.$watch('signupform.{{field.name}}.$viewValue',
                    function(newVal){
                        $timeout.cancel({{field.name}}_timer);
                        {{field.name}}_timer = $timeout(function() {
                            var input = $scope.signupform.{{field.name}};
                            console.log(newVal);
                            if (newVal){
                                $scope.register_{{field.name}}_init = true;
                            }else if (newVal == undefined && $scope.register_{{field.name}}_init == undefined){
                                $scope.register_{{field.name}}_init = false;
                            }else if ($scope.register_{{field.name}}_init == false){
                                $scope.register_{{field.name}}_init = true;
                                // console.log("{{field.name}}")
                            }
                            $scope.register_{{field.name}}_has_error = input.$invalid;
                            if (input.$invalid && $scope.register_{{field.name}}_init){
                                if (input.$error.required){
                                    $scope.register_{{field.name}}_error = "This field is required";
                                }else if (input.$error.pattern){
                                    $scope.register_{{field.name}}_error = "Can only contain letters and/or numbers";
                                }else if (input.$error.minlength){
                                    $scope.register_{{field.name}}_error = "At least " + $('form[name=signupform] input[name={{field.name}}]').attr('ng-minlength') + " letters";
                                }else if (input.$error.maxlength){
                                    $scope.register_{{field.name}}_error = "At least " + $('form[name=signupform] input[name={{field.name}}]').attr('ng-maxlength') + " letters";
                                }else if (input.$error.email){
                                    $scope.register_{{field.name}}_error = "Email format incorrect";
                                }else if (input.$error.usernameTaken){
                                    $scope.register_{{field.name}}_error = "Username has been registered";
                                }else if (input.$error.emailTaken){
                                    $scope.register_{{field.name}}_error = "Email has been registered";
                                }else if (input.$error.pwNotMatch){
                                    $scope.register_password2_error = "Not match/incorrect";
                                }
                            }
                        },1000);
                    }
                );
            {% endfor %}
        }

    ]).directive('checkusername', ['$q','$http',function($q,$http) {
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
    }]).directive('checkemail', ['$q','$http',function($q,$http) {
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
                    });;
                    return def.promise;
                };

            }
        };
    }]).directive('pwMatch', function() {
        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, elm, attrs, ctrl, http) {
                var checker = function() {
                    var e1 = scope.$eval(attrs.ngModel);
                    var e2 = scope.$eval(attrs.pwMatch);
                    var  match = (e1==e2)
                    return e1 == e2;
                };
                scope.$watch(checker, function (n) {
                    ctrl.$setValidity("pwNotMatch", n);
                });

            }
        };
    });