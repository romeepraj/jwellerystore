'use strict';

angular.module('myApp.main', ['ngMessages'])



.controller('MainCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
 $scope.getClass = function (path) {
  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
}
 $scope.click = function(){
     alert('romee');
 }
}])
.controller('RecentCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('/json/products.json').then(function(response){
		$scope.products = response.data;

	});
}]);