(function(){
    'use strict';
    angular.module('hackTravel')
        .controller('FooterController',['$scope', '$state', '$interval', '$timeout', '$rootScope',
            function ($scope, $state, $interval, $timeout, $rootScope) {

                var ctrl = this;
                ctrl.goTo = goTo;

                function goTo(state){
                    $state.go(state);
                }

            }]);

})();
