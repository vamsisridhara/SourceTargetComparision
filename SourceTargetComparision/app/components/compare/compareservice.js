(function () {
    'use strict';
    var app = angular.module('compareService', []);
    app.factory('compareservicefactory', ['$http', '$q', comparesvcfn]);
    function comparesvcfn($http, $q) {
        var service = {
            getsource: getsource,
            gettarget: gettarget
        };
        return service;
        function getsource() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/compare/test_s_md.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading source json');
                });
            return defer.promise;
        }
        function gettarget() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/compare/test_t_md.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading target json');
                });
            return defer.promise;
        }
    }

}());