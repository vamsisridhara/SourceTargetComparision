(function () {
    'use strict';
    var routerApp = angular.module('sourcetargetroute', []);
    routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('').html5Mode({
            enabled: true,
            requireBase: false
        });
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './home.html'
        }).state('compare', {
            url: '/compare',
            templateUrl: './app/components/compare/compare.html',
            controller: 'compareController'
        }).state('uigrid', {
            url: '/uigrid',
            templateUrl: './app/components/uigrid/addnewrecords.html',
            controller: 'uigridController'
        });
    });
}());