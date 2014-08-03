(function (loader) {

  // TODO: update loader module and include SCSS

  loader.directive('appLoader', function () {
    return {
      templateUrl: '/cardgame/services/loader/loader.html',
      restrict: 'E'
    }
  });

}(angular.module('app.loader', [])));


