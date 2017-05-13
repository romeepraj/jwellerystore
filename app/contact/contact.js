'use strict';

angular.module('myApp.contact', ['ui.router', 'uiGmapgoogle-maps'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
     
      $stateProvider  
     .state('app.contact', {
        url: 'contact',
        views: {
            'content@': {
                templateUrl: 'contact/contact.html',
                controller: 'ContactCtrl'
                
            }
          }
        })
 
}])

.controller('ContactCtrl', ['$scope','$http', function($scope, $http) {


$scope.map = {
      center:  {
                  latitude: 39.470361,
                  longitude: -76.620593
               },
               zoom: 13
   };
   $scope.marker = {
                     id: 0,
                     coords: {
                          latitude: 39.470361,
                         longitude: -76.620593
                     },
                     options: {
                         draggable: true
                     },
                     events: {
                                 dragend: function(marker, eventName, args) {
                                 var lat = marker.getPosition().lat();
                                 var lon = marker.getPosition().lng();
                                 //console.log(lat);
                                 //console.log(lon);

                                 $scope.marker.options = {
                                    draggable: true,
                                    labelContent: "",
                                    labelAnchor: "100 0",
                                    labelClass: "marker-labels"
                                 };
                         }
                     }
        };
}]);