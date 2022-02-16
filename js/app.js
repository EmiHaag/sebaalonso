var playing = true;
var audio;
angular
.module('myApp', [
  'ngRoute',
  'myApp.bio',
  'myApp.disco_spotify',
  'myApp.discografia',
  'myApp.video'

])

.config(['$routeProvider', '$locationProvider', function( $routeProvider,$locationProvider) {
 $locationProvider.html5Mode(true);
 $locationProvider.hashPrefix('!');


   $routeProvider
   .when('/', {
   	templateUrl: 'secciones/intro/intro.html'
    })
   .when('/bio', {
    templateUrl: 'secciones/bio/bio.html',
    controller:'bioCtrl'
    })   
   .when('/discografia', {
   	templateUrl: 'secciones/disco/disco_spotify.html',
    controller:'disco_spotifyCtrl'
    })
    .when('/colaboraciones', {
   	templateUrl: 'secciones/discografia/discografia.html',
    controller:'discografiaCtrl'
    
    })  
    .when('/video', {
   	templateUrl: 'secciones/video/video.html',
    controller:'videoCtrl'
    
    })
    .when('/contacto', {
    templateUrl: 'secciones/contacto/contacto.html'
    
    })  
    ;

  $routeProvider.otherwise({redirectTo: '/'});





}])
.controller('MainController', function($scope){




  $scope.light_box = false;
  $('.button-collapse').sideNav({
    
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  $('.collapsible').collapsible();

////////////  player colaboraciones //////////////////////
/*///////////////////// PLAYER FUNCTIONS *////////////////
$scope.play_pause_icon = "play_arrow";
$scope.pl = [];
$scope.playing_track = 0;
var audio = null;
$scope.playing_song_name="";
$scope.currentPorcentaje = 0;
$scope.currentTime = "0";
$scope.songLength = 0;
$scope.time=null;
  function convertToTime(num){
    var min, sec;
    if(num < 10){
      min = "00";
      sec = "0"+num.toFixed(0);
    }else{
      if(num < 60){
        min = "00" ;
        sec = num.toFixed(0);
      }else{
        min = "0"+(num / 60).toFixed(0);
        sec = (num%60).toFixed(0);
        if(sec < 10){sec = "0"+sec;}
      }
    } 
    return min + ":" + sec;
  }
  function startProgressBar(){
    $scope.currentPorcentaje = 0;
    audio.addEventListener("timeupdate", function(){
    $scope.currentTime =audio.currentTime;
    document.getElementById("range").value = audio.currentTime;
    $scope.time = convertToTime($scope.currentTime);
    $scope.$apply();
     
   });    
  }
      function playNext(pl){
        audio = new Audio(pl[$scope.playing_track].url);
        $scope.playing_song_name = pl[$scope.playing_track].nombre;
        audio.play();
        startProgressBar();
      }


      $scope.playSelectedTrack = function(pl, st){
        if(audio != null){
          if (!audio.paused){audio.pause();}
        }
        //set new playlist
        $scope.pl = pl;
       
          audio = document.createElement("AUDIO");
          audio.setAttribute("id", "reproductor"); 
          audio.setAttribute("preload","metadata");
          
          $scope.playing_track = st;
          if (typeof $scope.lista[$scope.playing_track] != "undefined") {
            //playNext($scope.lista[$scope.playing_track]);
            if(typeof $scope.lista[$scope.playing_track].url != "undefined"){
              audio = new Audio($scope.lista[$scope.playing_track].url);
              //audio.innerHTML = '<audio id="reproductor" ng-show="false" src="{{lista[playing_track].url}}" type="audio/mpeg">';
              $scope.songLength =0;
              audio.onloadedmetadata = function(){
                $scope.songLength =audio.duration;
                //console.log(audio.duration)
              } 
              
              $scope.playing_song_name = $scope.lista[$scope.playing_track].nombre;
              audio.play();

              $scope.play_pause_icon = "pause";
              
              
            }
          }
            startProgressBar();

      }




      var timeout = setInterval(function(){
        if(audio != null){

          //aumenta track value
          audio.onended = function(){
            $scope.playing_track ++;
           
            if (typeof $scope.pl[$scope.playing_track] != "undefined") {
              playNext($scope.pl);
            }
            $scope.$apply();
          }


          //actualiza progress bar player
          
        }
      }, 3000);

/*/////////////*/

//seconds 0 - getSongLength
$scope.input_range_song = 0 ; 
$scope.changeSongTime = function(){
 var newVal = document.getElementById("range").value;
 audio.currentTime = newVal;
}
/*////////////*/
      $scope.pause = function(){
        if(audio != null){
          if(!audio.paused){
          audio.pause();
           $scope.play_pause_icon ="play_arrow";
        }else{
          audio.play();
          $scope.play_pause_icon ="pause";
        }
        }
      }


       $scope.prev_song = function(){
        if(audio != null){
          if (!audio.paused){
            audio.pause();
            $scope.playing_track --;
            if (typeof $scope.pl[$scope.playing_track] != "undefined") {
                   playNext($scope.pl);
                 }
          }
        }
               
      }
      $scope.next_song = function(){
        if(audio != null){
          if (!audio.paused){
            audio.pause();
            $scope.playing_track ++;
            if (typeof $scope.pl[$scope.playing_track] != "undefined") {
                   playNext($scope.pl);
                 }
          }
        }
               
      }
      $scope.exitPlayer = function(item){
        elem.animate({
          display: "none",
          width:"0"
        }); 
      }
////////////////////////  END PLAYER FUNCTIONS/////////////////

//Muestra item seleccionado en carrousel
$scope.callPlayer = function(item){
  if(typeof item != "undefined"){
    $scope.item_seleccionado = item;
    $scope.lista = item.tracks;
    $scope.portada_player = "";
    $scope.descripcion_player = "";
    //  $scope.playing_track = -1;
    //$scope.playing_song_name = "";
    $scope.fuente_disco = "";
    $scope.portada_player = $scope.item_seleccionado.img_src;
    $scope.fuente_disco = $scope.item_seleccionado.fuente;
    //$scope.play_pause_icon = "play_arrow";
    $scope.autor= $scope.item_seleccionado.autor;
    $scope.descripcion_player = $scope.item_seleccionado.descripcion;
    $scope.minimized= false;
    $scope.expand_icon = "expand_less";
    $scope.showPlayer();
  }
}


})
.directive('player',function(){
  return{
    restrict: 'AE',
    link:function(scope, elem, attr){
      scope.showPlayer = function(){
        elem.animate({
          display: "block",
          width:"420px"
        });
        if(elem.hasClass("minimize_player"))
        {
         elem.toggleClass("minimize_player");
         scope.minimized= false;
         scope.expand_icon = "expand_less";
       }
    }
      scope.minimizePlayer = function(){

        elem.toggleClass("minimize_player");
        if(elem.hasClass("minimize_player")){
           scope.minimized= true;
           scope.expand_icon = "expand_more";

        }else{
          scope.minimized= false;
          scope.expand_icon = "expand_less";
        }
      }
     
    },
    templateUrl:'secciones/discografia/player.html'

  }
})////////////  END player colaboraciones //////////////////////

.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            
            'background-repeat' : 'no-repeat'            
        });
    };
})
.directive('message',function(){
  return{
    restrict:'EA',
    templateUrl:'secciones/contacto/modalMessage.html',
    scope:{message:'='},
    link:function(scope,elem,attr){

         

    },
    controller:function($scope, $http,$location){
      $scope.msg = {};
      $scope.resp = null;
      $scope.sendingResp = false;
      function sendMessage(datos){
        var loc = $location.protocol() + "://" + $location.host() +'/secciones/contacto/phpMailer/test.php';
       
        $http({
          method: 'POST',
          url: loc,
          data: datos
                
        }).then(function success (response) {
          console.log(response.data);
          $scope.sendingResp = false;
          $scope.resp = response.data;
        }, function error(err){
          console.log("error: " + err);
        });
      }

      $scope.sendMessage = function(){
        if($scope.msg.message != null && $scope.msg.email != null){
          $scope.sendingResp = true;
          var data = JSON.stringify({
            nombre:$scope.msg.nombre,
            msg: $scope.msg.message,
            email:$scope.msg.email
          });
         sendMessage(data);
        }
      }
      
    }

  }
})
.directive('iframeOnload', [function(){
return {
    scope: {
        callBack: '&iframeOnload'
    },
    link: function(scope, element, attrs){
        element.on('load', function(){  
            return scope.callBack();
        })
    }
}}])

.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);

;
