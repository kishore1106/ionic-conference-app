(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
  /* @ngInject */
  function ModalInstanceCtrl($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  }
})();
