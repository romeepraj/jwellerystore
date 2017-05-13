'use strict';

angular.module('myApp.products', ['ui.router', 'ngMessages'])

/*.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      /*$routeProvider.when('/products', {
        //templateUrl: 'products/products.html',
        controller: 'ProductsCtrl'
        action:"products.grid"
      }).
      when('/products/:productId', {
        templateUrl: 'products/products-detail.html',
        controller: 'ProductsDetailCtrl'
      })*/



   // $urlRouterProvider.otherwise('/products');
  /*  $stateProvider
        .state('products', {
            url:'/products',
            views:{
               'list':{
                  templateUrl: 'products/products.html',
                  controller: 'ProductsCtrl'
                } 
            }
           
        })
        
 
   
}])*/

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/products', '/products/grid');
    $stateProvider
    .state('app.products', {
        url: 'products',
        
        views: {
            'content@': {
                templateUrl: 'products/products.html',
                 controller:'ProductsCtrl'
                
            }
          }
    })  
    .state('app.products.list', {
        url: '/list',
       
        views: {
            'layout@app.products': {
                templateUrl: 'products/list.html',
                controller:'ProductsCtrl'
                      
            }
        }
 
    })
    .state('app.products.grid', {
        url: '/grid',
       
        views: {
            'layout@app.products': {
                templateUrl: 'products/grid.html',
                controller:'ProductsCtrl'
                      
            }
        }
 
    })
     .state('app.products.detail', {
        url: '/:productId',
      
       views: {
            'content@': {
                templateUrl: 'products/products-detail.html',
                controller:'ProductsDetailCtrl'
                      
            }
        }
 
    });

    
     
 
}])

.controller('ProductsCtrl', ['$scope', 'productList', 'categoryTree', '$filter',  function($scope, productList, categoryTree, $filter) {
  //defaults
  $scope.selectedCategory = '';
  $scope.sort = 'new';
  //get cattree from service we have to pass callback function to make the request ashynchronous
  categoryTree.getCategories(function(response){
      $scope.categories = response;
  })

  
  productList.getProducts(function(response){
    $scope.products = response;
    $scope.max =  $scope.products.map(function(product){return product.price;}).reduce(function(a,b){return Math.max(a,b)});
    $scope.min =  $scope.products.map(function(product){return product.price;}).reduce(function(a,b){return Math.min(a,b)});
   
  })
   
    //function to close the category filter selection
    $scope.closeFilter = function(){
        $scope.selectedCategory = '';
        productList.getProducts(function(response){
            $scope.products = response;
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
            productList.getProducts(function(response){
                  $scope.products = $filter('filter')(response.filter(function(product){
                        if(product.catid == $scope.selectedCategory && product.price >= $scope.min && product.price <= value){
                            return product;
                        }
                  }));
            });
        } else {
           productList.getProducts(function(response){
              $scope.products = $filter('filter')(response.filter(function(product){
                    if(product.price >= $scope.min && product.price <= value){
                        return product;  
                    }
              }));
           
            });  
        }
        
    }

    //filter by category function
    $scope.sortProductCat = function(sort){

        $scope.selectedCategory = sort;
        categoryTree.getCatName($scope.selectedCategory, function(response){
            $scope.catName =response;
        });
        productList.filterProducts('catid', sort, function(response){
          $scope.products = response;
        });
       
    }
}])
.controller('ProductsDetailCtrl', ['$scope', '$stateParams', '$filter', 'productList', function($scope, $stateParams, $filter, productList) {
   
	var productId = $stateParams.productId;
    productList.filterProducts('id', productId, function(response){
        $scope.items = response;
        $scope.mainImage = $scope.items[0].images[0]['name'];
		    $scope.changeImage = function(image){
             $scope.mainImage = image.name;
	      }
    });
}]);