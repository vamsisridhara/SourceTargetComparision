(function () {
    'use strict';
    var app = angular.module('newrecords', ['newrecordsService', 'ngTouch']);
    app.controller('newrecordsController',
                    ['newrecordsservicefactory', '$scope','$uibModal', newrecordsCtrlFunction]);
    function newrecordsCtrlFunction(newrecordsservicefactory, $scope, $uibModal) {
        function init() {
            $scope.tables = [];
            $scope.selectedTableId = '';
            $scope.tableColumns = [];
        }
        $scope.getTables = function () {
            newrecordsservicefactory.getTables().then(function (data) {
                if (data) {
                    $scope.tables = data;
                    console.log(JSON.stringify(data));
                }
            }, function (error) {
                console.log(error);
            });
        };
        $scope.getTableColumns = function () {
            newrecordsservicefactory.getTableColumns($scope.selectedTableId).then(function (data) {
                if (data) {
                    $scope.tableColumns = data;
                    console.log(JSON.stringify(data));
                }
            }, function (error) {
                console.log(error);
            });
        };
        init();
        $scope.getTables();
    }
}());