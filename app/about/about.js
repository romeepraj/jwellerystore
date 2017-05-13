'use strict';

angular.module('myApp.about', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.about', {
        url: 'about',
        views: {
            'content@': {
                templateUrl: 'about/about.html',
                
            }
          }
        })
 
}]);