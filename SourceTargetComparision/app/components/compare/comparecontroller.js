(function () {
    'use strict';
    var app = angular.module('compare', ['compareService']);
    app.controller('compareController',
                    ['compareservicefactory', '$scope', compareCtrlFunction]);
    function compareCtrlFunction(compareservicefactory, $scope) {
        $scope.source = [];
        $scope.target = [];
        $scope.sourceFileName = '';
        $scope.sourceDelimeter = '';
        $scope.targetDelimeter = '';
        $scope.targetFileName = '';
        $scope.loadFiles = function () {
            loadsource();
            loadtarget();
        };

        function loadsource() {
            compareservicefactory.getsource()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.sourceFileName = data.FileName;
                        $scope.sourceDelimeter = data.FileDelimiter;
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.source.push({ name: key.Name, type: key.DataType });
                        }
                    }
                }, function (data) {


                });
        }

        function loadtarget() {
            compareservicefactory.gettarget()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.targetFileName = data.FileName;
                        $scope.targetDelimeter = data.FileDelimiter;
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.target.push({ name: key.Name, type: key.DataType });
                        }
                    }
                }, function (data) {


                });
        }
        $scope.loadFiles();
        $scope.$watch('target', function (newVal, oldVal) {
            if (newVal) {
                console.log(newVal);
            }
        });
    }

}());