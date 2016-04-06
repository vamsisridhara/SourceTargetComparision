(function () {
    'use strict';
    var routerApp = angular.module('sourcetargetroute', []);
    routerApp.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
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