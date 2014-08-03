(function (errors) {

  errors.factory('errorService', ['FBURL', 'alertService', '$timeout', function (FBURL, alertService, $timeout) {

    var service = {

      data : {},
      error: {},
      humanize: {},
      delay: 4000,

      humanizer: function(data) {
        service.humanize = {
          EMAIL_TAKEN            : 'The email address [ ' + data.email + ' ] is already taken, please try another.',
            INVALID_PASSWORD       : '[ ' + data.password + ' ] is not a valid password.',
          INVALID_FIREBASE       : 'Invalid firebase specified: ' + FBURL,
          AUTHENTICATION_DISABLED: 'The specified authentication type is not enabled for this Firebase.',
          INVALID_ORIGIN         : 'Unauthorized request origin.',
          INVALID_USER           : 'The specified user does not exist.',
          UNKNOWN_ERROR          : 'An unknown error occurred. Please contact support@firebase.com.',
          USER_DENIED            : 'User denied authentication request.'
        };
      },

      parseError: function (error, data, delay) {

  // TODO verify function parameters

        service.humanizer(data);
        service.data = data;
        service.error = error;
        service.delay = delay || service.delay;


  // TODO change all console.logs to $log

        if (error.code === 'INVALID_EMAIL' && !angular.isDefined(service.data.email)) {
          service.humanize.INVALID_EMAIL = 'Please specify an email address.';
        } else {
          service.humanize.INVALID_EMAIL = 'The email address [ ' + service.data.email + ' ] is invalid.';
        }

        angular.forEach(service.humanize, function (value, key) {
          if (error.code === key) {
            var humanized = service.humanize[error.code];

            if (error.type === 'login') {
              console.error('Error logging in:');
            } else if (error.type === 'create') {
              console.error('Error creating user: ' + error.email);
            }
            console.error(error.code);
            console.error(humanized);

            var alert = alertService.add({type: 'danger', msg: humanized});

            if (service.delay && service.delay !== 0) {
              $timeout(function () {
                alertService.delete(alert);
              }, service.delay);
            }

          }
        });
      }
    };

    return service;
  }]);

}(angular.module('app.errors', [])));