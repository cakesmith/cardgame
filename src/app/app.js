(function (app) {
  'use strict';

  app.config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: '/templates/landing/landing.html',
        css: '/css/templates/landing/landing.css'
      })

      .state('cards', {
        url: '/cards',
        templateUrl: '/modules/cards/cards.html',
        css: '/css/modules/cards/cards.css'
      })

    ;

    $urlRouterProvider.otherwise('/landing');

  });


}(angular.module('cardgamefrontend', [
  'game.cards',
  'game.chat',
  'game.user',
  'game.lobby',
  'game.server',
  'ui.router',
  'stateFiles',
  'ngDragDrop',
  'SignalR',
  'cardgamefrontend-templates'
])));
