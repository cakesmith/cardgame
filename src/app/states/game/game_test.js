'use strict';

describe('game spec test', function() {

  var scope, createController;

  beforeEach(module('app.game'));

  beforeEach(inject(function($rootScope, $controller) {


    scope = $rootScope.$new();

    createController = function() {
      return $controller('GameCtrl', {
        $scope: scope
      });
    }
  }));

  it('should have a dummy test', inject(function() {



  }));

});