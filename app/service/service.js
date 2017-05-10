'use strict';
angular.module('myApp.service', [])
//product service data pulling from json

.service('productList', ['$http', '$q',  function($http, $q){
 var promise; 
 var getProducts = function() {
        if(!promise){
           promise =  $http.get('/json/products.json');
        }
        return promise;
      };


    return { getProducts: getProducts };
      
}])
//category service data pulling from json and category functions
.service('categoryTree', ['$http', function($http) {
   
     var catTree = {
          categories: null,
          //get all categories from json
          getCategories: function(){
            return $http.get("/json/categories.json").then(function(response){
                  catTree.categories =  response.data;
              });
          },
          //get category value from ref id
          getCatName:function(id){
           
            var a = this.categories.filter(function(cat){
                        return (cat.id == id);
                      })

             return a ;
          }
      };
      catTree.getCategories();
      return catTree;
      
       
}]);

