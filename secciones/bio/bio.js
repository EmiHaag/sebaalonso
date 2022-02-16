'use strict';

angular.module('myApp.bio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bio', {
    templateUrl: 'secciones/bio/bio.html',    

    controller: 'bioCtrl'
  });
}])
.controller('bioCtrl', function() {


})
;


