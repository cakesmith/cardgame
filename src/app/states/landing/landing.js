(function (landing) {

  landing.controller('LandingCtrl', ['$scope', '$modal', function ($scope, $modal) {


    $scope.blur = false;

    $scope.login = function () {
      $scope.blur = true;

      $modal.open({
        templateUrl: "/cardgame/states/auth/login/login.html",
        controller : 'LoginCtrl'
      }).result.then(function (result) {
          $scope.blur = false;
          if (result) {
            return $state.transitionTo('lobby');
          }
        }, function(reject) {
          $scope.blur = false;
        });
    };
  }]);


}(angular.module('app.landing', [
  'ui.bootstrap'
])));