(function (app) {
  'use strict';

  app.config(function($urlRouterProvider, $stateProvider) {

    $stateProvider

      .state('background', {
        templateUrl: '/cardgame/states/background.html',
        controller: 'BgCtrl'
      })

      .state('landing', {
        url: '/',
        templateUrl: '/cardgame/states/landing/landing.html',
        parent: 'background'
      })

      .state('login', {
        url: '/login',
        templateUrl: '/cardgame/states/auth/login/login.html',
        parent: 'background'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: '/cardgame/states/auth/signup/signup.html',
        parent: 'background'
      })

      .state('panic', {
        url: '/panic',
        templateUrl: '/cardgame/states/auth/panic/panic.html',
        parent: 'background'
      })

    ;

    $urlRouterProvider.otherwise('/');

  });



}(angular.module('cardgame', [
  'app.game',
  'ngAnimate',
  'ui.router',
  'cardgame-templates'
])));
