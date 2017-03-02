'use strict';

angular.module('myApp.products', ['ngRoute'])

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
	$http.get('/json/products.json').success(function(data){
		//console.log(data);
		$scope.products = data;
		
	})
}])
.controller('ProductsDetailCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	var productId = $routeParams.productId;
	
	$http.get('/json/products.json').success(function(data){
		
		 $scope.items = $filter('filter')(data, { id: productId });
		
		 $scope.mainImage = $scope.items[0].images[0]['name'];
		 $scope.changeImage = function(image){
		 	$scope.mainImage = image.name;
		 }
	

		
			
		
	})
}]);