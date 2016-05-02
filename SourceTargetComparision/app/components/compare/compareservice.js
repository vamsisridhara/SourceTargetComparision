(function () {
    'use strict';
    var app = angular.module('compareService', []);
    app.factory('compareservicefactory', ['$http', '$q', comparesvcfn]);
    function comparesvcfn($http, $q) {
        var service = {
            getsourceFile1: getsourceFile1,
            gettargetFile1: gettargetFile1,
            getsourceFile2: getsourceFile2,
            gettargetFile2: gettargetFile2,
        };
        return service;
        function getsourceFile1() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/compare/test_s_md_1.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading source json');
                });
            return defer.promise;
        }
        function gettargetFile1() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/compare/test_t_md_1.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading target json');
                });
            return defer.promise;
        }
        function getsourceFile2() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/compare/test_s_md_2.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading source json');
                });
            return defer.promise;
        }
        function gettargetFile2() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/compare/test_t_md_2.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading target json');
                });
            return defer.promise;
        }
    }

}());