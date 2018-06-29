(function () {
    'use strict';
    var app = angular.module('newrecordsService', []);
    app.factory('newrecordsservicefactory', ['$http', '$q', newrecordssvcfn]);
    function comparenewrecordssvcfnsvcfn($http, $q) {
        var service = {
            getTables: getTables,
            getTableColumns: getTableColumns
        };
        return service;
        function getTables() {
            var defer = $q.defer();
            $http.get('/SourceTargetComparision/app/components/uigrid/tables.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject('error in loading source json');
                });
            return defer.promise;
        }
        function getTableColumns(tableName) {
            switch (tableName) {
                case 'categories':
                    return [
                        {
                            'fieldName': 'categoryid',
                            'type': 'text'
                        }, {
                            'fieldName': 'categoryname',
                            'type': 'text'
                        }, {
                            'fieldName': 'description',
                            'type': 'text'
                        }
                    ];
                    break;
                case 'products':
                    return [
                        {
                            'fieldName': 'productId',
                            'type': 'text'
                        }, {
                            'fieldName': 'productName',
                            'type': 'text'
                        }, {
                            'fieldName': 'productDescription',
                            'type': 'text'
                        }
                    ];
                    break;
                default:
                    break;
            }
        }
    }
}());