'use strict';

angular.module('myApp.products', ['ngRoute', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/products', {
	    templateUrl: 'products/products.html',
	    controller: 'ProductsCtrl'
	  }).
	  when('/products/:productId', {
	    templateUrl: 'products/products-detail.html',
	    controller: 'ProductsDetailCtrl'
	  })
}])

.controller('ProductsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/json/products.json').then(function(response){
		$scope.products = response.data;
    })
}])
.controller('ProductsDetailCtrl', ['$scope', '$http', '$routeParams', '$filter', '$log', function($scope, $http, $routeParams, $filter, $log) {
	var productId = $routeParams.productId;
    $http.get('/json/products.json').then(function(response){
		
		 $scope.items = $filter('filter')(response.data, { id: productId });
		 $scope.mainImage = $scope.items[0].images[0]['name'];
		 $scope.changeImage = function(image){
             $scope.mainImage = image.name;
	    }
    })
}]);