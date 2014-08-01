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

  app.value('FBURL', 'https://against.firebaseio.com');

}(angular.module('cardgame', [
  'app.landing',
  'app.auth',
  'app.lobby',
  'app.game',
  'app.services',
  'firebase',
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'picardy.fontawesome',
  'cardgame-templates'
])));
