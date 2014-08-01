(function (landing) {

  landing.controller('LandingCtrl', ['$scope', '$modal', 'motd', function ($scope, $modal, motd) {


    $scope.blur = false;


    $scope.login = function () {


      popup({
        templateUrl: '/cardgame/states/auth/login/login.html',
        controller: 'LoginCtrl'
      }, 'lobby');

    };

    $scope.signup = function() {

      popup({
        templateUrl: '/cardgame/states/auth/signup/signup.html',
        controller: 'SignupCtrl'
      }, 'lobby');
    };

    $scope.panic = function() {
      popup({
        templateUrl: '/cardgame/states/auth/panic/panic.html',
        controller: 'PanicCtrl'
      }, 'landing');
    };

    function popup(opts, transition) {
      $scope.blur = true;
      $modal.open(opts).result.then(function (result) {
          $scope.blur = false;
          if (result) {
            return $state.transitionTo(transition);
          }
        }, function(reject) {
          $scope.blur = false;
        });
    }



    }]);


}(angular.module('app.landing', [
  'ui.bootstrap',
  'app.motd'
])));