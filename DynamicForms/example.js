(function () {
    'use strict';
    var app = angular.module('ui.bootstrap.demo', ['ngAnimate',
                                                    'ngSanitize', 'ui.bootstrap',
                                                    'newrecords', 'newrecordsService',
                                                    'ui.grid']);
    app.controller('ModalDemoCtrl', ['$uibModal', '$log', '$document', 'newrecordsservicefactory', ModalDemoCtrlFunction]);
    function ModalDemoCtrlFunction($uibModal, $log, $document, newrecordsservicefactory) {
        var $ctrl = this;
        $ctrl.items = ['item1', 'item2', 'item3'];
        $ctrl.tables = [];
        $ctrl.selectedTableId = '';
        $ctrl.tableColumns = [];
        $ctrl.animationsEnabled = true;

        $ctrl.finalData = [];
        $ctrl.getTables = function () {
            newrecordsservicefactory.getTables().then(function (data) {
                if (data) {
                    $ctrl.tables = data.data;
                    // console.log($ctrl.tables.data);
                }
            }, function (error) {
                console.log(error);
            });
        };
        $ctrl.getTableColumns = function () {
            $ctrl.tableColumns = newrecordsservicefactory.getTableColumns($ctrl.selectedTableId);
            //newrecordsservicefactory.getTableColumns($ctrl.selectedTableId).then(function (data) {
            //    if (data) {
            //        $ctrl.tableColumns = data;
            //        console.log(JSON.stringify(data));
            //    }
            //}, function (error) {
            //    console.log(error);
            //});
        };
        $ctrl.getTables();
        $ctrl.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $ctrl.items;
                    }, tableColumns: function () {
                        $ctrl.tableColumns = newrecordsservicefactory.getTableColumns($ctrl.selectedTableId);
                        return $ctrl.tableColumns;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                for (var count = 0; count < selectedItem.length; count++) {
                    var val = selectedItem[count];
                    
                }
                console.log($ctrl.finalData);
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $ctrl.toggleAnimation = function () {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    }

    // Please note that $uibModalInstance represents a modal window (instance) dependency.
    // It is not the same as the $uibModal service used above.

    app.controller('ModalInstanceCtrl', function ($uibModalInstance, items, tableColumns) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.selected = {
            item: $ctrl.items[0]
        };
        $ctrl.tableColumns = tableColumns;
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.tableColumns);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

    // Please note that the close and dismiss bindings are from $uibModalInstance.

    app.component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function () {
            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.items = $ctrl.resolve.items;
                $ctrl.selected = {
                    item: $ctrl.items[0]
                };
            };

            $ctrl.ok = function () {
                $ctrl.close({ $value: $ctrl.selected.item });
            };

            $ctrl.cancel = function () {
                $ctrl.dismiss({ $value: 'cancel' });
            };
        }
    });

})();