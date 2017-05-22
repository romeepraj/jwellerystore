'use strict';
angular.module('myApp.service', [])
//product service data pulling from json

.service('productList', ['$http', '$filter',  function($http, $filter){
 /*var promise; 
 var getProducts = function() {
        if(!promise){
           promise =  $http.get('/json/products.json');
        }
        return promise;
      };


    return { getProducts: getProducts };*/

   this.getProducts = function(callback){
         $http.get('/json/products.json',{ cache: true }).then(function(response){
               
                 callback(response.data);
                }, function(error){ console.log('error')});
   }


   this.filterProducts = function(f, value, callback){
   
     this.getProducts(function(response){
  
        var products = $filter('filter')(response, function(pro){
          
        
           if(pro.hasOwnProperty(f) && pro[f] == value)
           {
              
               return pro;
              
           }
         });
        callback(products);
      });
   } 
      
}])
//category service data pulling from json and category functions


.factory('categoryTree', ['$http', '$filter',  function($http, $filter){
 /*var promise; 
 var getCategories = function() {
        if(!promise){
           promise =  $http.get('/json/categories.json');
        }
        return promise;
      };
 return { getCategories: getCategories };*/
   
    var categories = {};

    categories.getCategories = function(callback){
           
                $http.get('/json/categories.json', { cache: true }).then(function(response){
                 callback(response.data);
                }, function(error){ console.log('error')});
    }
    categories.getCatName = function(id, callback){
      
      categories.getCategories(function(response){
          var catname = $filter('filter')(response, { id: id })[0].name;
          callback(catname);
      });
    }
    return categories;    
}]);


/*.service('categoryTree', ['$http', function($http) {
   
     var catTree = {
          categories: null,
          //get all categories from json
          getCategories: function(){
            if(!promise){}
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
      
       
}]);*/

