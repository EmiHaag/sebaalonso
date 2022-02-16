'use strict';

angular.module('myApp.discografia', ['ngRoute', 'ngSanitize'])

    .config(['$routeProvider', function($routeProvider) {

    }])

    .controller('discografiaCtrl', function($scope, $http) {

        $http.get("secciones/discografia/discografia.json")
            .then(function(response) {
                $scope.discografia = response.data;
            });
        $scope.hoverIn = function() {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function() {
            this.hoverEdit = false;
        };


        $scope.left_car = 0;

        //establece distintos anchos al carrousel de acuerdo al ancho del dispositivo
        var w_width = window.innerWidth;
        switch (true) {
            case (w_width > 1800):
                $scope.maxWidth = -7500;
                break;
            case ((w_width > 1300) && (w_width < 1800)):
                $scope.maxWidth = -7500;
                break;
            case ((w_width > 900) && (w_width < 1300)):
                $scope.maxWidth = -7500;
                break;
            case ((w_width > 600) && (w_width < 900)):
                $scope.maxWidth = -7500;
                break;
            case ((w_width > 300) && (w_width < 600)):
                $scope.maxWidth = -7600;
                break;
            default:
                $scope.maxWidth = -5000;
                break;
        }

        // en css #carousel se establece el maximo para el contenedor, $scope.maxWidth establece hasta donde se corre el carousel
        var move = 250;
        $scope.next = function() {
            if ($scope.left_car > $scope.maxWidth)
                $scope.left_car -= move;
        }

        $scope.left = function() {
            if ($scope.left_car < 0)
                $scope.left_car += move;
        }
        $scope.item_seleccionado = null;
        //$scope.audio = null;


        $scope.callPlayer = function(item) {
            $scope.$parent.callPlayer(item);
        }


    })
    .filter('orderObjectBy', function() {
        return function(input, attribute) {
            if (!angular.isObject(input)) return input;

            var array1 = [];
            for (var i = input.length - 1; i > -1; i--) {
                array1.push(input[i]);
            }

            return array1;
        }
    })
    .directive('grid', function() {
        return {
            restrict: 'E',
            templateUrl: 'secciones/discografia/grid.html',
            link: function(scope, elem, attr) {
                console.log("lfmef");
            }
        }
    })


    .directive('carrousel', function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attr) {
                function isEventSupported(eventName) {
                    var el = document.createElement('div');
                    eventName = 'on' + eventName;
                    var isSupported = (eventName in el);
                    if (!isSupported) {
                        el.setAttribute(eventName, 'return;');
                        isSupported = typeof el[eventName] == 'function';
                    }
                    el = null;
                    return isSupported;
                }



                ///// HANDLE EVENTS ON CARROUSEL ////
                $(document).ready(function() {
                    // console.log($("#carouselRow").width());
                    // Check which wheel event is supported. Don't use both as it would fire each event 
                    // in browsers where both events are supported.
                    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
                    //window.onwheel = preventDefault;


                    // Now bind the event to the desired element
                    $("#carousel").on(wheelEvent, function(e) {
                        e.preventDefault();
                        var oEvent = e.originalEvent,
                            delta = oEvent.deltaY || oEvent.wheelDelta;

                        // deltaY for wheel event
                        // wheelData for mousewheel event

                        if (delta > 0) {
                            scope.next();

                        } else {
                            // Scrolled down
                            scope.left();
                        }
                        scope.$apply();
                    });
                });
                ///// END HANDLE EVENTS ON CARROUSEL ////
                /// SCROLL EVENTS PREVENT //// 
                var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

                function preventDefault(e) {
                    e = e || window.event;
                    if (e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                }

                function preventDefaultForScrollKeys(e) {
                    if (keys[e.keyCode]) {
                        preventDefault(e);
                        return false;
                    }
                }
                /*
                function disableScroll() {
                  if (window.addEventListener) // older FF
                      window.addEventListener('DOMMouseScroll', preventDefault, false);
                  window.onwheel = preventDefault; // modern standard
                  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
                  window.ontouchmove  = preventDefault; // mobile
                  document.onkeydown  = preventDefaultForScrollKeys;
                }

                function enableScroll() {
                    if (window.removeEventListener)
                        window.removeEventListener('DOMMouseScroll', preventDefault, false);
                    window.onmousewheel = document.onmousewheel = null; 
                    window.onwheel = null; 
                    window.ontouchmove = null;  
                    document.onkeydown = null;  
                }*/
                /// END SCROLL EVENTS PREVENT //// 
            },

            templateUrl: 'secciones/discografia/carrousel.html'
        }
    });