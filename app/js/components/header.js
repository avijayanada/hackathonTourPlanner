(function(){
    'use strict';
    angular.module('hackTravel').component('headerComponent', {
        templateUrl: "partials/components/header.html",
        bindings: {
            activeClass: '@?',
            isLoggedIn: '=?'
        },
        controller: 'HeaderController',
        controllerAs: 'ctrl'
    });

})();
