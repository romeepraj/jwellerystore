'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.about',
  'myApp.products',
  'myApp.contact',
  'myApp.search',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/main'});
}]).
directive("searchResult", function(){
    return {
        templateUrl:'search/search.html',
        replace:true,
        scope:{
            resultObject : "=",
            hideMe: "&"
        }
        
    }
}).
controller('SrchCtrl', ['$scope', '$location','$http', '$filter', function($scope, $location, $http, $filter){
   $scope.showMe = false;
   $scope.search = function(){
       if ($scope.searchbox) {
           $scope.showMe = true;
            $http.get('/json/products.json').then(function(response){
                $scope.results = $filter('filter')(response.data, { name: $scope.searchbox});
           })
       }
    
   }
   $scope.hideMe = function(){
       $scope.showMe = false;
       $scope.searchbox = '';
   }
   
}]);

