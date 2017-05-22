'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.main',
  'myApp.about',
  'myApp.products',
  'myApp.contact',
  //'myApp.search',
  'myApp.service',
  'myApp.version'
]).
/*config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/main'});
}]).*/
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.otherwise('/');
      $stateProvider
      .state('app',{
        url: '/',
        views:{
          'content':{
            templateUrl: 'main/main.html'
          },
          'header':
          {
            templateUrl:'main/header.html',
             controller:'SrchCtrl'
          },
           'footer':
          {
            templateUrl:'main/footer.html'
          }
        }
        })
}])

.directive("searchResult", function(){
    return {
        templateUrl:'search/search.html',
        replace:true,
        scope:{
            resultObject : "="
           
        },
        scope:true,
        controller: function($scope, $element, $attrs){

         // console.log($scope.products);
        }
        
    }
})
.filter('words', function () {
  return function (input, words) {
    if (isNaN(words)) {
      return input;
    }
    if (words <= 0) {
      return '';
    }
    if (input) {
      var inputWords = input.split(/\s+/);
      if (inputWords.length > words) {
        input = inputWords.slice(0, words).join(' ') + '\u2026';
      }
    }
    return input;
  };
})
.controller('SrchCtrl', ['$scope', '$filter', 'productList', function($scope, $filter, productList){
   $scope.showMe = false;
   $scope.search = function(){
 
       if ($scope.searchbox) {
           $scope.showMe = true;
            productList.getProducts(function(response){
                $scope.products = $filter('filter')(response, { name: $scope.searchbox});
               
            })
       }
    
   }
   $scope.hideMe = function(){
               $scope.showMe = false;
               $scope.searchbox = '';
  }

}]);
//ra-5823acf016c589db angular.element($0).scope()
