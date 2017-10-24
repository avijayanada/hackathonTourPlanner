(function(){
    'use strict';
    angular.module('hackTravel').component('imageComponent', {
        templateUrl: "partials/components/images.html",
        bindings: {
            imageData: '=?',
            latLongData: '=?'
        },
        controller: 'ImagesController',
        controllerAs: 'ctrl'
    });

})();
