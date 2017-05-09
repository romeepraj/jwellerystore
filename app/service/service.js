'use strict';
angular.module('myApp.service', [])
.service('categoryTree', ['$http', function($http) {
   
      var catTree = {
          categories: null,
          //get all categories from database
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
      }
      catTree.getCategories();
      return catTree;
       
}]);