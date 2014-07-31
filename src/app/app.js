(function (app) {
  'use strict';

  app.config(function($urlRouterProvider, $stateProvider) {

    $stateProvider

      .state('landing', {
        url: '/',
        templateUrl: '/cardgame/states/landing/landing.html'
      })

    ;

    $urlRouterProvider.otherwise('/');

  });



}(angular.module('cardgame', [
  'app.landing',
  'app.game',
  'app.login',
  'ui.bootstrap',
  'ngAnimate',
  'ui.router',
  'picardy.fontawesome',
  'cardgame-templates'
])));
