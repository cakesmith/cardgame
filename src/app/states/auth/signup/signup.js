(function (signup) {

  signup.controller('SignupCtrl', ['$scope', '$timeout', '$firebaseSimpleLogin', 'errorService', 'FBURL', function ($scope, $timeout, $firebaseSimpleLogin, errorService, FBURL) {

    var dataRef = new Firebase(FBURL);
    var loginObj = $firebaseSimpleLogin(dataRef);


    $scope.loading = false;



 // TODO: refactor out authentication into a service

    $scope.signup = function () {

 //TODO: verify emails
      $scope.loading = true;

      function login(email, password) {
        loginObj.$login('password', {
          email   : email,
          password: password
        }).then(function (user) {
  // TODO: change console.log to $log
          console.log(user.email + ' [ ' + user.id + ' ] logged in');
  //TODO: here's the login point
        }, function (loginError) {
          var data = {
            email   : email,
            password: password,
            type    : 'login'
          };
          errorService.parseError(loginError, data, 4000);
        });
      }

      loginObj.$createUser($scope.email, $scope.password)

        .then(function (user) {

          console.log('Succesfully created user: ' + user.email);

          login($scope.email, $scope.password);

        }, function (accountCreationError) {
          var data = {
            email   : $scope.email,
            password: $scope.password,
            type: 'create'
          };
          errorService.parseError(accountCreationError, data, 4000);
        })

        .finally(function() {
          $scope.loading = false;
        });

    };

  }]);

}(angular.module('app.signup', [
  'firebase'
])));