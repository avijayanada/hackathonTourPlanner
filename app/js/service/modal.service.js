
(function () {

    angular.module('hackTravel').factory('modalService', ['$uibModal',
        function ($uibModal) {
            var serviceObject = {};

            var modalDefaults = {

            };

            var modalOptions = {
            };

            var showModal = function (customModalDefaults, customModalOptions) {
                if (!customModalDefaults) {
                    customModalDefaults = {};
                }

                customModalDefaults.backdrop = 'static';
                return show(customModalDefaults, customModalOptions);
            };


            function show(customModalDefaults, customModalOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map modal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = ['$scope', '$uibModalInstance', function ($scope, $modalInstance) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            angular.extend(customModalOptions, tempModalOptions);
                            $modalInstance.close('ok');
                        };

                        $scope.modalOptions.close = function (result) {
                            angular.extend(customModalOptions, tempModalOptions);
                            $modalInstance.close('cancel');
                        };

                        $scope.modalOptions.other = function (result) {
                            angular.extend(customModalOptions, tempModalOptions);
                            $modalInstance.close(result);
                        };

                        $scope.modalOptions.reject = function (result) {
                            angular.extend(customModalOptions, tempModalOptions);
                            $modalInstance.close('reject');
                        };

                        $scope.modalOptions.refresh = function (result) {
                            angular.extend(customModalOptions, tempModalOptions);
                            $modalInstance.close('refresh');
                        };

                        $scope.modalOptions.onFileSelect = function (result) {
                            $scope.modalOptions.imageToUpload = result;
                            angular.extend(customModalOptions, tempModalOptions);
                        };
                    }];
                }

                return $uibModal.open(tempModalDefaults).result;
            }

            // Always return a host Object instead of the revealing module pattern.
            // This is due to the way Object references are bound and updated.
            // Primitive values cannot update alone using the revealing module pattern.
            return {
                show: show,
                showModal: showModal
            };
        }
    ]);


})();
