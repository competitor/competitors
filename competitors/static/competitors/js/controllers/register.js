competitorsApp.controller('register',['$scope','$http','$timeout',function($scope,$http,$timeout){
    $scope.register_agreement = false;
    var list = ["first_name","last_name","username","email","password2","password1"];

    $scope.$watch("register", function(){
        for (field in $scope.register){
            $scope.$watch('signupform.'+field+'.$viewValue',
            function(newVal){
                var field = $(this)[0].exp.split('.')[1];
                console.log(field);
                $timeout.cancel($scope.register[field].timer);
                $scope.register[field].timer = $timeout(function() {
                    var input = $scope.signupform[field];
                    console.log(newVal);
                    if (newVal){
                        $scope.register[field].init = true;
                        console.log(field + $scope.register[field].init);
                    }else if (newVal == undefined && $scope.register[field].init == undefined){
                        $scope.register[field].init = false;
                        console.log(field + $scope.register[field].init);
                    }else if ($scope.register[field].init == false){
                        $scope.register[field].init = true;
                        console.log(field + $scope.register[field].init);
                    }
                    $scope.register[field].has_error = input.$invalid;
                    if (input.$invalid && $scope.register[field].init){
                        if (input.$error.required){
                            $scope.register[field].error = "This field is required";
                        }else if (input.$error.pattern){
                            $scope.register[field].error = "Can only contain letters and/or numbers";
                        }else if (input.$error.minlength){
                            $scope.register[field].error = "At least " + $('form[name=signupform] input[name={{field.name}}]').attr('ng-minlength') + " letters";
                        }else if (input.$error.maxlength){
                            $scope.register[field].error = "At least " + $('form[name=signupform] input[name={{field.name}}]').attr('ng-maxlength') + " letters";
                        }else if (input.$error.email){
                            $scope.register[field].error = "Email format incorrect";
                        }else if (input.$error.usernameTaken){
                            $scope.register[field].error = "Username has been registered";
                        }else if (input.$error.emailTaken){
                            $scope.register[field].error = "Email has been registered";
                        }else if (input.$error.pwNotMatch){
                            $scope.register[field].error = "Not match/incorrect";
                        }
                    }
                },1000);
            });

        }
    })           
}])