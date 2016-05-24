(function () {
    'use strict';
    var app = angular.module('compare', ['compareService']);
    app.controller('compareController',
                    ['compareservicefactory', '$scope', compareCtrlFunction]);
    function compareCtrlFunction(compareservicefactory, $scope) {
        function init() {
            $scope.sourceFile1 = [];
            $scope.targetFile1 = [];
            //$scope.sourceFile2 = [];
            //$scope.targetFile2 = [];

            $scope.finalSource = [];
            $scope.finalTarget = [];

            $scope.sourceFileName1 = '';
            $scope.sourceDelimeter1 = '';
            //$scope.sourceFileName2 = '';
            //$scope.sourceDelimeter2 = '';

            $scope.targetDelimeter1 = '';
            $scope.targetFileName1 = '';
            //$scope.targetDelimeter2 = '';
            //$scope.targetFileName2 = '';

            $scope.relationSource = [];
            $scope.relationTarget = [];
            $scope.relationsData = [];
            var count = 0;
            if ($scope.relationsData) {
                $scope.relationsData.push({
                    index: count,
                    source: $scope.relationSource,
                    sourceJoinColumns: $scope.joinSource,
                    target: $scope.relationTarget,
                    targetJoinColumns: $scope.joinTarget,
                });
            } else {
                count = $scope.relationsData.length;
                $scope.relationsData.push({
                    index: count,
                    source: $scope.relationSource,
                    sourceJoinColumns: $scope.joinSource,
                    target: $scope.relationTarget,
                    targetJoinColumns: $scope.joinTarget,
                });
            }
        }
        $scope.addRelation = function () {
            $scope.relationsData.push({
                index: $scope.relationsData.length + 1,
                source: $scope.relationSource,
                sourceJoinColumns: $scope.joinSource,
                target: $scope.relationTarget,
                targetJoinColumns: $scope.joinTarget,
            });

        };
        $scope.removeRelation = function (index) {

            alert(index);

        };
        $scope.loadFiles = function () {
            loadsourceFile1();
            loadtargetFile1();
            //loadsourceFile2();
            //loadtargetFile2();
        };

        function loadsourceFile1() {
            compareservicefactory.getsourceFile1()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.sourceFileName1 = data.FileName;
                        $scope.relationSource.push({ source: data.FileName });
                        $scope.sourceDelimeter1 = data.FileDelimiter;
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.sourceFile1.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S1',
                                fileName: $scope.sourceFileName1,
                                filePosition: count
                            });
                        }
                    }
                }, function (data) {


                });
        }
        function loadsourceFile2() {
            compareservicefactory.getsourceFile2()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.sourceFileName2 = data.FileName;
                        $scope.sourceDelimeter2 = data.FileDelimiter;
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.sourceFile2.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S3',
                                fileName: $scope.sourceFileName2,
                                filePosition: count
                            });
                        }
                    }
                }, function (data) {


                });
        }

        function loadtargetFile1() {
            compareservicefactory.gettargetFile1()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.targetFileName1 = data.FileName;
                        $scope.relationTarget.push({ source: data.FileName });
                        $scope.targetDelimeter1 = data.FileDelimiter;
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.targetFile1.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S2',
                                fileName: $scope.targetFileName1,
                                filePosition: count
                            });
                        }
                    }
                }, function (data) {


                });
        }
        function loadtargetFile2() {
            compareservicefactory.gettargetFile2()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.targetFileName2 = data.FileName;
                        $scope.targetDelimeter2 = data.FileDelimiter;
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.targetFile2.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S4',
                                fileName: $scope.targetFileName2,
                                filePosition: count
                            });
                        }
                    }
                }, function (data) {


                });
        }

        init();
        $scope.loadFiles();

        $scope.showJSON = function () {
            if ($scope.finalSource != null &&
                $scope.finalSource.length > 0 &&
                $scope.finalTarget != null &&
                $scope.finalTarget.length > 0) {

                $scope.compareJSON = [];
                $scope.compareJSON = $scope.finalSource.concat($scope.finalTarget);
                var files = { 'Files': [] };
                var list = getList();
                var relation = getRelationShip();

                files.Files.push({ 'List': list, 'Relationship': relation });
                console.log(files);
                $scope.txtFinal = angular.toJson(files);
            }
        };

        function getList() {
            var list = [];
            var s1 = _.where($scope.compareJSON, { RefNo: 'S1' });
            var s2 = _.where($scope.compareJSON, { RefNo: 'S2' });
            var s3 = _.where($scope.compareJSON, { RefNo: 'S3' });
            var s4 = _.where($scope.compareJSON, { RefNo: 'S4' });
            var globalRddCount = 0;

            if (s1.length > 0) {
                var templist = { 'Name': s1[0].fileName, 'RefNo': s1[0].RefNo, 'Columns': [] }
                for (var count = 0; count < s1.length; count++) {
                    var columns = {
                        'FilePosition': s1[count].filePosition,
                        'RddPosition': globalRddCount,
                        'RefNo': s1[count].RefNo + ':' + s1[count].name
                    };
                    globalRddCount++;
                    templist.Columns.push(columns);
                }
                list.push(templist);
            }
            if (s2.length > 0) {
                var templist = { 'Name': s2[0].fileName, 'RefNo': s2[0].RefNo, 'Columns': [] }
                for (var count = 0; count < s2.length; count++) {
                    var columns = {
                        'FilePosition': s2[count].filePosition,
                        'RddPosition': globalRddCount,
                        'RefNo': s2[count].RefNo + ':' + s2[count].name
                    };
                    globalRddCount++;
                    templist.Columns.push(columns);
                }
                list.push(templist);
            }
            if (s3.length > 0) {
                var templist = { 'Name': s3[0].fileName, 'RefNo': s3[0].RefNo, 'Columns': [] }
                var rddPosition = s2.length;
                for (var count = 0; count < s3.length; count++) {
                    var columns = {
                        'FilePosition': s3[count].filePosition,
                        'RddPosition': globalRddCount,
                        'RefNo': s3[count].RefNo + ':' + s3[count].name
                    };
                    globalRddCount++;
                    templist.Columns.push(columns);
                }
                list.push(templist);
            }
            if (s4.length > 0) {
                var templist = { 'Name': s4[0].fileName, 'RefNo': s4[0].RefNo, 'Columns': [] }
                var rddPosition = s3.length;
                for (var count = 0; count < s4.length; count++) {
                    var columns = {
                        'FilePosition': s4[count].filePosition,
                        'RddPosition': globalRddCount,
                        'RefNo': s4[count].RefNo + ':' + s4[count].name
                    };
                    globalRddCount++;
                    templist.Columns.push(columns);
                }
                list.push(templist);
            }
            return list;
        }
        function getRelationShip() {
            var source = {



            };
            var target = {



            };




        }


    }
}());