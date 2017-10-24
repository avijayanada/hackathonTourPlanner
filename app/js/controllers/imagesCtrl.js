(function(){
    'use strict';
    angular.module('hackTravel')
        .controller('ImagesController',['$scope', '$state', '$interval', '$timeout', '$rootScope',
            function ($scope, $state, $interval, $timeout, $rootScope) {

                var ctrl = this;
                ctrl.goTo = goTo;
                ctrl.$onInit = init;

                function  init() {
                    console.log("images component loaded", ctrl.imageData);
                    console.log("whole data for a point is: ", ctrl.latLongData);
                }

                function goTo(state){
                    $state.go(state);
                }

            }]);

})();
