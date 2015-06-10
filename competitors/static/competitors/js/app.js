
/* App Module */

var competitorsApp = angular.module('competitorsApp',[]);

competitorsApp.config(function($interpolateProvider,$httpProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
 });