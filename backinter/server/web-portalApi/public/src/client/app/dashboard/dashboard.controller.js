(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger', '$uibModal','$scope'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger, $uibModal,$scope ) {
    var vm = this;
    vm.news = {
      title: '',
      description: ''
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';
    vm.isCollapsed = true;
    vm.openModal=openModal;    
    // Method to calculate the row width based on no. of columns dynamically
	$scope.rowWidth = {
		"min-width" : ""+((8 * 170) + 10)+"px"
	}


    activate();

    function activate() {
      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }
      
    function openModal(size){
        var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      windowClass:'setting',
      size: size      
    });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      /*return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });*/
    }
  }
    
      angular.module('app.dashboard')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
  /* @ngInject */
  function ModalInstanceCtrl($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  }
    // Directive to sync the scrolls
angular.module('app.dashboard').directive('scrolltable', function(){
    return{
        restrict: 'A',
        link: function(scope, ele, attrs){
            var headerSn = document.getElementById(attrs.horzelem);
			var nextTable = document.getElementById(attrs.nexttable);
			ele.bind('scroll', function(){
				headerSn.scrollLeft = ele[0].scrollLeft;
				nextTable.scrollTop = ele[0].scrollTop;
			});
            
        }
    };
});

})();
