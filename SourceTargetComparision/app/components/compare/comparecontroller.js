(function () {
    'use strict';
    var app = angular.module('compare', ['compareService', 'ngTouch']);
    app.controller('compareController',
                    ['compareservicefactory', '$scope', compareCtrlFunction]);
    function compareCtrlFunction(compareservicefactory, $scope) {
        $scope.steps = ['stepone', 'steptwo', 'stepthree', 'stepfour'];
        $scope.step = 0;

        $scope.isFirstStep = function () {
            return $scope.step === 0;
        };

        $scope.isLastStep = function () {
            return $scope.step === ($scope.steps.length - 1);
        };

        $scope.isCurrentStep = function (step) {
            return $scope.step === step;
        };

        $scope.setCurrentStep = function (step) {
            $scope.step = step;
        };

        $scope.getCurrentStep = function () {
            return $scope.steps[$scope.step];
        };

        $scope.getNextLabel = function () {
            return ($scope.isLastStep()) ? 'Submit JSON' : 'Next';
        };

        $scope.handlePrevious = function () {
            $scope.step -= ($scope.isFirstStep()) ? 0 : 1;
        };

        $scope.handleNext = function () {
            if ($scope.isLastStep()) {
                showJSON();
                //$$scopeInstance.close($scope.wizard);
            } else {
                $scope.step += 1;
            }
        };


        function init() {
            $scope.joins = [{ name: 'Inner' }, { name: 'Outer' }];
            $scope.sourceSelectedJoinColumn = '';
            $scope.targetSelectedJoinColumn = '';
            $scope.typeofJoin = '';
            $scope.sourceRelation = $scope.targetRelation = '';

            $scope.sourceSelectedJoinColumn1 = '';
            $scope.targetSelectedJoinColumn1 = '';
            $scope.typeofJoin1 = '';
            $scope.sourceRelation1 = $scope.targetRelation1 = '';

            $scope.sourceFile1 = [];
            $scope.targetFile1 = [];
            $scope.sourceFile2 = [];
            $scope.targetFile2 = [];

            $scope.finalSource = [];
            $scope.finalTarget = [];

            $scope.sourceFileName1 = '';
            $scope.sourceDelimeter1 = '';
            $scope.sourceFileName2 = '';
            $scope.sourceDelimeter2 = '';

            $scope.targetDelimeter1 = '';
            $scope.targetFileName1 = '';
            $scope.targetDelimeter2 = '';
            $scope.targetFileName2 = '';

            $scope.relationSource = [];
            $scope.relationTarget = [];
            $scope.relationsData = [];
            $scope.relationsData1 = [];
            $scope.validData = false;
        }

        $scope.validate = function () {
            if ($scope.sourceRelation.length <= 0 ||
                $scope.targetRelation.length <= 0 ||
                $scope.typeofJoin == '') {
                $scope.validData = true;
            } else {
                $scope.validData = false;
            }
        };


        $scope.addRelation = function () {
            $scope.errors = [];
            if ($('#sourceRelation option:selected').val().trim() == '-1' &&
                   $('#sourceRelation option:selected').val().trim() != undefined) {
                $scope.errors.push({ error: 'Please select Source' });
            }

            if ($('#targetRelation option:selected').val().trim() == '-1' &&
                    $('#targetRelation option:selected').val().trim() != undefined) {
                $scope.errors.push({ error: 'Please select Target' });
            }

            if ($('#typeofJoin option:selected').val().trim() == '-1' &&
                    $('#typeofJoin option:selected').val().trim() != undefined) {
                $scope.errors.push({ error: 'Please select Type of Join' });
            }

            if ($scope.errors.length > 0) { return false;}
            $scope.sourceRelation = $('#sourceRelation option:selected').text().trim();
            $scope.targetRelation = $('#targetRelation option:selected').text().trim();
            $scope.relationsData.push({
                index: $scope.relationsData.length,
                source: $scope.sourceFileName1,
                sourceJoinColumns: $('#sourceRelation option:selected').text().trim(),
                target: $scope.targetFileName1,
                targetJoinColumns: $('#targetRelation option:selected').text().trim(),
                typeofJoin: $('#typeofJoin option:selected').text().trim()
            });
            var arr = $scope.targetFileRelationColumns;
            $scope.targetFileRelationColumns = _.without(arr, _.findWhere(arr, { name: $scope.targetRelation }));

            var arr1 = $scope.sourceFileRelationColumns;
            $scope.sourceFileRelationColumns = _.without(arr1, _.findWhere(arr1, { name: $scope.sourceRelation }));

            $scope.sourceRelation = '';
            $scope.targetRelation = '';
            $scope.typeofJoin = '';
            $('select#typeofJoin').prop('selectedIndex', 0);
        };

        $scope.removeRelation = function (index) {
            var arr = $scope.relationsData;
            var obj = _.findWhere(arr, { index: index });
            $scope.sourceFileRelationColumns.push({ name: obj.sourceJoinColumns });
            $scope.targetFileRelationColumns.push({ name: obj.targetJoinColumns });
            $scope.relationsData = _.without(arr, _.findWhere(arr, { index: index }));
        };


        $scope.addRelation1 = function () {
            $scope.errors1 = [];
            if ($('#sourceRelation1 option:selected').val().trim() == '-1' &&
                   $('#sourceRelation1 option:selected').val().trim() != undefined) {
                $scope.errors1.push({ error: 'Please select Source' });
            }

            if ($('#targetRelation1 option:selected').val().trim() == '-1' &&
                    $('#targetRelation1 option:selected').val().trim() != undefined) {
                $scope.errors1.push({ error: 'Please select Target' });
            }

            if ($('#typeofJoin1 option:selected').val().trim() == '-1' &&
                    $('#typeofJoin1 option:selected').val().trim() != undefined) {
                $scope.errors1.push({ error: 'Please select Type of Join' });
            }

            if ($scope.errors1.length > 0) { return false; }

            $scope.sourceRelation1 = $('#sourceRelation1 option:selected').text().trim();
            $scope.targetRelation1 = $('#targetRelation1 option:selected').text().trim();
            $scope.relationsData1.push({
                index: $scope.relationsData1.length,
                source: $scope.sourceFileName2,
                sourceJoinColumns: $('#sourceRelation1 option:selected').text().trim(),
                target: $scope.targetFileName2,
                targetJoinColumns: $('#targetRelation1 option:selected').text().trim(),
                typeofJoin: $('#typeofJoin1 option:selected').text().trim()
            });
            var arr = $scope.targetFileRelationColumns1;
            $scope.targetFileRelationColumns1 = _.without(arr, _.findWhere(arr, { name: $scope.targetRelation1 }));

            var arr1 = $scope.sourceFileRelationColumns1;
            $scope.sourceFileRelationColumns1 = _.without(arr1, _.findWhere(arr1, { name: $scope.sourceRelation1 }));

            $scope.sourceRelation1 = '';
            $scope.targetRelation1 = '';
            $scope.typeofJoin1 = '';
            $('select#typeofJoin1').prop('selectedIndex', 0);
        };

        $scope.removeRelation1 = function (index) {
            var arr = $scope.relationsData1;
            var obj = _.findWhere(arr, { index: index });
            $scope.sourceFileRelationColumns1.push({ name: obj.sourceJoinColumns });
            $scope.targetFileRelationColumns1.push({ name: obj.targetJoinColumns });
            $scope.relationsData1 = _.without(arr, _.findWhere(arr, { index: index }));
        };

        $scope.loadFiles = function () {
            loadsourceFile1();
            loadtargetFile1();
            loadsourceFile2();
            loadtargetFile2();
        };

        function loadsourceFile1() {
            compareservicefactory.getsourceFile1()
                .then(function (data) {
                    if (data != null && data.AttributeCount > 0) {
                        $scope.sourceFileName1 = data.FileName;
                        $scope.relationSource.push({ source: data.FileName });
                        $scope.sourceDelimeter1 = data.FileDelimiter;
                        $scope.sourceFileRelationColumns = [];
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.sourceFile1.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S1',
                                fileName: $scope.sourceFileName1,
                                filePosition: count
                            });
                            $scope.sourceFileRelationColumns.push(
                            {
                                id: key.Name,
                                name: key.Name
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
                        $scope.sourceFileRelationColumns1 = [];
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.sourceFile2.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S3',
                                fileName: $scope.sourceFileName2,
                                filePosition: count
                            });
                            $scope.sourceFileRelationColumns1.push(
                            {
                                id: key.Name,
                                name: key.Name
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
                        $scope.targetFileRelationColumns = [];
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.targetFile1.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S2',
                                fileName: $scope.targetFileName1,
                                filePosition: count
                            });
                            $scope.targetFileRelationColumns.push(
                            {
                                id: key.Name,
                                name: key.Name
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
                        $scope.targetFileRelationColumns1 = [];
                        for (var count = 0; count < data.Attributes.length; count++) {
                            var key = data.Attributes[count];
                            $scope.targetFile2.push({
                                name: key.Name,
                                type: key.DataType,
                                RefNo: 'S4',
                                fileName: $scope.targetFileName2,
                                filePosition: count
                            });

                            $scope.targetFileRelationColumns1.push(
                            {
                                id: key.Name,
                                name: key.Name
                            });
                        }
                    }
                }, function (data) {


                });
        }

        init();
        $scope.loadFiles();

        function showJSON() {
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
        }

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
                'Left': 'S1',
                'RightExist': 'Yes',
                'Join': {
                    'Right': 'S2',
                    'Type': '',
                    'RightExist': 'No',
                    'Condition': []
                }
            };

            for (var count = 0; count < $scope.relationsData.length; count++) {
                var relationData = $scope.relationsData[count];
                var join = source.Join;
                join.Type = relationData.typeofJoin;
                join.Condition.push({
                    'Left': 'S1:' + relationData.sourceJoinColumns,
                    'Right': 'S2:' + relationData.targetJoinColumns
                });
            }

            var target = {
                'Left': '',
                'RightExist': '',
                'Join': {
                    'Right': '',
                    'Type': '',
                    'RightExist': 'No',
                    'Condition': []
                }
            };
            var relation = { 'Source': source, 'Target': target }
            return relation;
        }


    }
}());