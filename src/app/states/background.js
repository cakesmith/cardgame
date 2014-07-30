(function (bg) {
  bg.controller('BgCtrl', ['$scope', '$state', function ($scope, $state) {


    $scope.$on('$stateChangeSuccess', function () {
      $scope.isLanding = $state.is('landing');
    });


  }]);
}(angular.module('cardgame')));