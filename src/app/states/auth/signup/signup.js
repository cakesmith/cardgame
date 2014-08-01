(function (signup) {

  signup.controller('SignupCtrl', ['$scope', '$timeout', '$firebaseSimpleLogin', 'FBURL', function ($scope, $timeout, $firebaseSimpleLogin, FBURL) {

    var dataRef = new Firebase(FBURL);
    var loginObj = $firebaseSimpleLogin(dataRef);


    $scope.loading = false;
    $scope.alerts = {};

    $scope.$watchCollection('alerts', function (newValue) {
      $scope.numAlerts = Object.keys(newValue).length;
    });


    $scope.addAlert = function (alert) {
      var timestamp = new Date().getUTCMilliseconds();
      $scope.alerts[timestamp] = alert;
      return timestamp;

    };
    $scope.closeAlert = function (key) {
      delete $scope.alerts[key];
    };

    // TODO: refactor out authentication into a service

    $scope.signup = function () {

      //TODO: verify emails
      $scope.loading = true;

      function login(email, password) {
        loginObj.$login('password', {
          email   : email,
          password: password
        }).then(function (user) {
          console.log(user.email + ' [ ' + user.id + ' ] logged in');
          //TODO: here's the login point
        }, function (loginError) {
          var data = {
            email   : email,
            password: password,
            type    : 'login'
          };
          parseError(loginError, data);
        });
      }

      loginObj.$createUser($scope.email, $scope.password)

        .then(function (user) {

          console.log('Succesfully created user: ' + user.email);

          login($scope.email, $scope.password);

        }, function (createError) {
          var data = {
            email   : $scope.email,
            password: $scope.password,
            type: 'create'
          };
          parseError(createError, data);
        })

        .finally(function() {
          $scope.loading = false;
        });

    };

  }]);

}(angular.module('app.signup', [
  'firebase'
])));