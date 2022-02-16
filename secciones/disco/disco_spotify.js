'use strict';

angular.module('myApp.disco_spotify', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

}])
.controller('disco_spotifyCtrl', function($scope) {

window.uploadDone=function(){
  document.getElementById('loading').style.display="none";
  document.getElementById('frame').style.visibility="visible";
  
}
	
});

