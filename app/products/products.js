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

.controller('ProductsCtrl', ['$scope', '$http', 'productList', 'categoryTree', '$filter', '$timeout', function($scope, $http, productList, categoryTree, $filter, $timeout) {
     //defaults
    $scope.selectedCategory = '';
    $scope.sort = 'new';
    //get cattree from service
    $scope.categories = categoryTree.categories;
    //get categories from category tree service 

    productList.getProducts().then(function(response){
        $scope.products = response.data;
        $scope.max =  $scope.products.map(function(product){return product.price;}).reduce(function(a,b){return Math.max(a,b)});
        $scope.min =  $scope.products.map(function(product){return product.price;}).reduce(function(a,b){return Math.min(a,b)});
       
    })
    //function to close the category filter selection
    $scope.closeFilter = function(){
        $scope.selectedCategory = '';
        productList.getProducts().then(function(response){
            $scope.products = response.data;
        });
        $scope.catName = null;
     }
  
    //sort by function
    $scope.sortProduct = function(sort){
        if(sort == 'low'){
               $scope.products = $filter('orderBy')($scope.products, 'price');  
        } else if(sort == 'high'){
               $scope.products = $filter('orderBy')($scope.products, '-price');   
        }else if(sort == 'new'){
               $scope.products = $filter('orderBy')($scope.products, '-id');  
        }
    }
    
    //price filter function
    $scope.sortPriceFilter = function(value){
        //if category filter is selected
        if($scope.selectedCategory) {
            productList.getProducts().then(function(response){
                  $scope.products = $filter('filter')(response.data.filter(function(product){
                        if(product.catid == $scope.selectedCategory && product.price >= $scope.min && product.price <= value){
                            return product;
                        }
                  }));
            });
        } else {
           productList.getProducts().then(function(response){
              $scope.products = $filter('filter')(response.data.filter(function(product){
                    if(product.price >= $scope.min && product.price <= value){
                        
                        return product;  
                    }
              }))
           
            });  
        }
        
    }

    //filter by category function
    $scope.sortProductCat = function(sort){

        $scope.selectedCategory = sort;
        $scope.catName =  categoryTree.getCatName($scope.selectedCategory)[0].name;
        productList.getProducts().then(function(response){
            $scope.products = $filter('filter')(response.data, { catid: sort });
        });
    }
}])
.controller('ProductsDetailCtrl', ['$scope', '$http', '$routeParams', '$filter', 'productList', function($scope, $http, $routeParams, $filter, $productList) {
   
	var productId = $routeParams.productId;
    productList.getProducts().then(function(response){
		$scope.items = $filter('filter')(response.data, { id: productId });
		 $scope.mainImage = $scope.items[0].images[0]['name'];
		 $scope.changeImage = function(image){
             $scope.mainImage = image.name;
	    }
    })
}]);