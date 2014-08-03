(function (alerts) {

  alerts.factory('alertService', function ($rootScope) {

    var service = {

      alerts: {},

      types: [
        'success',
        'info',
        'warning',
        'danger'
      ],

      add: function (alert) {

        if (!alert.type) {
          throw new Error('Alert must have a type.');
        } else if (service.types.indexOf(alert.type) === -1) {
          throw new Error('Unknown alert type [ ' + alert.type + ' ]! Must be one of [ ' + service.types.join(', ') + ' ].');

        }

        // The crazy way of adding unique ids to these are to avoid conflicts when setting timeouts to destroy alerts.

        var d = new Date();

        var timestamp = parseInt(d.getUTCSeconds().toString() + d.getUTCMilliseconds().toString()) * (Math.random() * 1000 >> 1);

        alert.id = service.length();

        service.alerts[timestamp] = alert;

        $rootScope.$broadcast('alertAdded', timestamp);

        return timestamp;
      },

      delete: function (key) {
        var ret = service.alerts[key];
        delete service.alerts[key];

        $rootScope.$broadcast('alertDeleted', ret);
        return ret;
      },

      pop: function () {

        if (service.length() > 0) {

          var ids = {};
          var map = [];

          angular.forEach(service.alerts, function (value, key) {
            ids[value.id] = key;
            map.push(value.id);
          });

          var max = Math.max.apply(null, map);
          return service.delete(ids[max]);

        }
      },

      length: function () {
        return Object.keys(service.alerts).length;
      }

    };

    return service;

  });

  alerts.controller('alertCtrl', ['$scope', 'alertService', function ($scope, alertService) {

    $scope.alerts = alertService.alerts;

    $scope.$on('alertAdded', function (event, alert) {
      $scope.alerts = alertService.alerts;
    });

    $scope.$on('alertDeleted', function(event, alert) {
      $scope.alerts = alertService.alerts;
    })


  }]);

  alerts.directive('nlAlert', function() {

    return {
      restrict  : 'E',
      template  : '<alert ng-repeat="(key, alert) in alerts track by key" type="{{alert.type}}" close="delete(key)">{{alert.msg}}</alert>',
      controller: 'alertCtrl'
    };
  });

}(angular.module('app.alerts', [])));