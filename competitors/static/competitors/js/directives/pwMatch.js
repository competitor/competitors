competitorsApp.directive('pwMatch', function() {
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