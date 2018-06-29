(function () {
    'use strict';
    var app = angular.module('sourcetargetapp',
                                ['ui.router', 'ngAnimate','ui.bootstrap',
                                 'sourcetargetroute', 'compare', 'dndLists', 'newrecords']);
    app.config(function ($httpProvider) {


    });
    app.run(function ($rootScope, $location, $http) {


    });
}());