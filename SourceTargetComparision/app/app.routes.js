(function () {
    'use strict';
    var routerApp = angular.module('sourcetargetroute', []);
    routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('').html5Mode({
            enabled: true,
            requireBase: false
        });
        $urlRouterProvider.otherwise('/home');
        //$locationProvider.html5Mode(true);
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './home.html'
        }).state('compare', {
            url: '/compare',
            templateUrl: './app/components/compare/compare.html',
            controller: 'compareController'
        });
    });
}());