'use strict';

describe('alerts spec test', function () {

  var alerts, alertObj;

  beforeEach(module('app.alerts'));

  describe('Alert Service', function () {

    beforeEach(inject(function (alertService) {

      alerts = alertService;

      alertObj = [

        {
          type: 'danger',
          msg : 'an error'
        },

        {
          type: 'info',
          msg : 'some info'
        },

        {
          type: 'warning',
          msg : 'llama'
        }
      ];

    }));

    it('should add alerts', inject(function () {


      expect(alerts.alerts).toEqual({});
      expect(alerts.length()).toBe(0);

      angular.forEach(alertObj, function (value, key) {
        alerts.add(value);
        expect(alerts.length()).toBe(key + 1);
      });

      angular.forEach(alerts.alerts, function (value) {
        expect(value).toEqual(alertObj[value.id]);
      })

    }));

    it('should pop alerts off the stack', inject(function () {

      expect(alerts.alerts).toEqual({});
      expect(alerts.length()).toBe(0);

      angular.forEach(alertObj, function (value, key) {
        alerts.add(value);
        expect(alerts.length()).toBe(key + 1);
      });


      expect(alerts.pop()).toEqual(alertObj[2]);
      expect(alerts.length()).toBe(2);
      expect(alerts.pop()).toEqual(alertObj[1]);
      expect(alerts.length()).toBe(1);
      expect(alerts.pop()).toEqual(alertObj[0]);
      expect(alerts.length()).toBe(0);
      expect(alerts.pop()).toBeUndefined();
      expect(alerts.length()).toBe(0);


    }));

    it('should close alerts by unique id', inject(function () {

      var id = [];

      expect(alerts.length()).toBe(0);

      angular.forEach(alertObj, function (value, key) {
        id.push(alerts.add(value));
        expect(alerts.length()).toBe(key + 1);
      });

      expect(alerts.close(id[1])).toEqual(alertObj[1]);

      expect(alerts.length()).toBe(2);

      expect(alerts.pop()).toEqual(alertObj[2]);

      expect(alerts.length()).toBe(1);

      expect(alerts.close(id[1])).toBeUndefined();
      expect(alerts.close(id[0])).toEqual(alertObj[0]);

      expect(alerts.length()).toBe(0);


    }));

    it('should not create an undefined type of alert', inject(function() {

      var badAlert = {
        type: 'llama',
        msg: 'fizz'
      };

    try {
      alerts.add(badAlert);
    } catch(e) {
      expect(e).toEqual(new Error('Unknown alert type [ llama ]! Must be one of [ success, info, warning, danger ].'));
    }

      try {
        alerts.add({})
      } catch (e) {
        expect(e).toEqual(new Error('Alert must have a type.'));
      }


    }));



  });


});