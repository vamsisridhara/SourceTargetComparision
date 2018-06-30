(function () {
    'use strict';
    var app = angular.module('newrecordsService', []);
    app.factory('newrecordsservicefactory', ['$http', '$q', newrecordssvcfn]);
    function newrecordssvcfn($http, $q) {
        var service = {
            getTables: getTables,
            getTableColumns: getTableColumns
        };
        return service;
        function getTables() {
            var defer = $q.defer();
            $http.get('/DynamicForms/tables.json')
                .then(function (data) {
                    defer.resolve(data);
                }, function () {
                    defer.reject('error in loading source json');
                });
            return defer.promise;
        }
        function getTableColumns(tableName) {
            switch (tableName) {
                case 'categories':
                    return [
                        {
                            'fieldName': 'Category ID',
                            'type': 'text',
                            'columnValue':''
                        }, {
                            'fieldName': 'Category Name',
                            'type': 'text',
                            'columnValue': ''
                        }, {
                            'fieldName': 'Description',
                            'type': 'text',
                            'columnValue': ''
                        }
                    ];
                    break;
                case 'products':
                    return [
                        {
                            'fieldName': 'Product Id',
                            'type': 'text',
                            'columnValue': ''
                        }, {
                            'fieldName': 'Product Name',
                            'type': 'text',
                            'columnValue': ''
                        }, {
                            'fieldName': 'Description',
                            'type': 'text',
                            'columnValue': ''
                        }
                    ];
                    break;
                default:
                    break;
            }
        }
    }
}());