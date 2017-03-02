'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
  console.log($location);
 
$scope.getClass = function (path) {
  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
   }
 
	$http.get('/json/products.json').success(function(data){
		//console.log(data);
		$scope.products = data;

	});

}]);