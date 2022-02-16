'use strict';

angular.module('myApp.video', ['ngRoute', 'ngSanitize'])

    .config(['$routeProvider', function($routeProvider) {

    }])

    .controller('videoCtrl', ['$scope', function($scope) {


        $scope.videos = [{
                "src_video": "xErY564juEk",
                "src_thumb": "secciones/video/img/laDinastia3.jpg",
                "titulo": " Dulce Camaleón - Golden Session #3 - La Dinastía"
            },
            {
                "src_video": "VzTtudhyItI",
                "src_thumb": "secciones/video/img/laDinastia2.jpg",
                "titulo": "Ácido - Golden Session #2 - La Dinastía"
            },
            {
                "src_video": "wkz-RuAZ0bw",
                "src_thumb": "secciones/video/img/ladinastiahumodemiel.jpg",
                "titulo": " Humo De Miel - Golden Session #1 - La Dinastía"
            },
            {
                "src_video": "baghub6wGT0",
                "src_thumb": "secciones/video/img/pueblaAntigua.jpg",
                "titulo": "Antiguas - Puebla"
            },
            {
                "src_video": "NqykQoeKOSI",
                "src_thumb": "secciones/video/img/Infinito.jpg",
                "titulo": "Infinito - Alonsong #1 - Sebastián Alonso"
            },
            {
                "src_video": "lWqC-zmP6Fo",
                "src_thumb": "secciones/video/img/Repitiendome.jpg",
                "titulo": "Repitiéndome - Alonsong #2 - Sebastián Alonso"
            },
            {
                "src_video": "Uindi_IWlW4",
                "src_thumb": "secciones/video/img/tu_senal.jpg",
                "titulo": "Tu señal - Alonsong #3  - Sebastián Alonso"
            },
            {
                "src_video": "1upvyPC2F4k",
                "src_thumb": "secciones/video/img/emiliainclanlasciudades.jpg",
                "titulo": "Las Ciudades Venideras - Emilia Inclán"
            },
            {
                "src_video": "mA7ljVhziIk",
                "src_thumb": "secciones/video/img/emiliainclanaguayfuego.jpg",
                "titulo": "Agua y fuego - Emilia Inclán"
            },
            {
                "src_video": "DLJGdWp4BPc",
                "src_thumb": "secciones/video/img/emiliainclangolondrinas.jpg",
                "titulo": "Golondrinas - Emilia Inclán"
            },
            {
                "src_video": "LiU87usSMWs",
                "src_thumb": "secciones/video/img/emilia_viento.jpg",
                "titulo": "Viento más allá - Emilia Inclán"
            },
            {
                "src_video": "ngOp979J3FY",
                "src_thumb": "secciones/video/img/laveredachango.jpg",
                "titulo": "La vereda - Chango Enriquez "
            },
            {
                "src_video": "OIlKWskSBC8",
                "src_thumb": "secciones/video/img/changoconstitucion.jpg",
                "titulo": "Constitución - Chango Enriquez"
            },
            {
                "src_video": "5bAG3EyoGP0",
                "src_thumb": "https://img.youtube.com/vi/5bAG3EyoGP0/0.jpg",
                "titulo": "FUNK YOU EN OLAVARRIA"
            },
            {
                "src_video": "VlXrFZ6g6JI",
                "src_thumb": "secciones/video/img/totora.jpg",
                "titulo": "Propuesta indecente - Los totora"
            },
            {
                "src_video": "K86twWax1vM",
                "src_thumb": "secciones/video/img/mancomunados.jpg",
                "titulo": "Justo aquí - Mancomunados"
            }
        ];

        $scope.thinking = "";
        $scope.call_titulo = function(a) {

            $scope.thinking = a;
        }
        $scope.borra_titulo = function() {
            $scope.thinking = "";
        }

        $scope.src_actual_video = "";
        $scope.playing_name = "";

        $scope.playVideo = function(video) {
            $scope.yt.videoid = video.src_video;
            $scope.playing_name = video.titulo;
            $scope.$parent.light_box = true;
            $scope.ready = true;
        }

        $scope.yt = {
            width: '100%',
            height: '80%',
            videoid: "",
            ready: false
        };
        $scope.closeFrame = function() {
            $scope.yt.videoid = '';
            $scope.$parent.light_box = false;
        }



    }])
    .directive('youtube', function($window) {
        return {
            restrict: "E",

            scope: {
                height: "@",
                width: "@",
                videoid: "@",
                ready: "@"
            },

            template: '<div></div>',

            link: function(scope, element) {
                if (document.getElementById('iframe_api') === null) {
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    tag.id = "iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                } else
                    runPlayer();


                var player;

                function runPlayer() {
                    player = new YT.Player(element.children()[0], {
                        playerVars: {
                            autoplay: 0,
                            html5: 1,
                            theme: "light",
                            modesbranding: 0,
                            color: "white",
                            iv_load_policy: 3,
                            showinfo: 1,
                            controls: 0
                        },
                        playerVars: { rel: 0 },
                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid,
                        events: {

                            onStateChange: onPlayerStateChange
                        }
                    });
                }

                $window.onYouTubeIframeAPIReady = function() {
                    runPlayer();

                }


                function onPlayerStateChange(event) {
                    if (event.data === 0) {
                        scope.videoid = '';
                        scope.$parent.light_box = false;
                    }
                }

                scope.$watch('videoid', function(newValue, oldValue) {
                    if (newValue == oldValue) {
                        return;
                    } else if (newValue == '') {
                        player.stopVideo();
                    }

                    player.cueVideoById(scope.videoid);
                    player.playVideo();


                });

                scope.$watch('height + width', function(newValue, oldValue) {
                    if (newValue == oldValue) {
                        return;
                    }

                    player.setSize(scope.width, scope.height);

                });

            }
        };
    })
    .directive('onLoaded', function() {
        return {
            restrict: "A",
            scope: {
                loadHandler: '&onLoaded'
            },
            link: function(scope, element, attr) {
                element.on("load", scope.loadHandler);
            }
        }
    });;