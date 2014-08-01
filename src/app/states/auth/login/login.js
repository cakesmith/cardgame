(function(login) {

  login.controller('LoginCtrl', ['$scope', '$timeout', '$firebaseSimpleLogin', 'FBURL', function($scope, $timeout, $firebaseSimpleLogin, FBURL) {

    var dataRef = new Firebase(FBURL);
    var loginObj = $firebaseSimpleLogin(dataRef);

    $scope.loading = false;



  }]);

}(angular.module('app.login', [

])));