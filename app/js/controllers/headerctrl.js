(function(){
    'use strict';
    angular.module('hackTravel')
        .controller('HeaderController',['$scope', '$state',
            function ($scope, $state) {

                var ctrl = this;
                ctrl.goTo = goTo;
                ctrl.$onInit = init;

                function init() {
                    console.log("component inited");
                }

                function goTo(state){
                    $state.go(state);
                }

            }]);

})();
