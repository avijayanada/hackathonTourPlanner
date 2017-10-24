(function(){
    'use strict';

    var app = angular.module('hackTravel', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'blockUI', 'ghiscoding.validation', 'pascalprecht.translate', 'toastr']);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller:'HomeController',
                controllerAs: 'ctrl'
            });


    }).config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'js/extraDependencies/angular-validation-ghiscoding/locales/validation/',
            suffix: '.json'
        });

        // define translation maps you want to use on startup
        $translateProvider.preferredLanguage('en');
    });




})();
