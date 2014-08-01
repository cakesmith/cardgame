(function (loader) {

  loader.directive('appLoader', function () {
    return {
      templateUrl: '/cardgame/services/loader/loader.html',
      restrict: 'E'
    }
  });

}(angular.module('app.loader', [])));


