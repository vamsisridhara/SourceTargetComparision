(function () {
    'use strict';
    var app = angular.module('Authentication', []);
    app.factory('authfactory', [authfunction]);
    function authfunction() {
        var service = {
            getauthdata: getauthdata
        };
        return service;

        function getauthdata() {


        }

    }

}());