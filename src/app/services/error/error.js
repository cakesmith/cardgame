(function (errorSvc) {

  errorSvc.factory('errorService', ['FBURL', 'alertService', function (FBURL, alertService) {

    var service = {

      data: {},
      error: {},
      time: 4000,

      errorService: function(data, error, time) {
        service.data = data;
        service.error = error;
        service.time = time;
      },

      humanize: {
        EMAIL_TAKEN            : 'The email address [ ' + service.data.email + ' ] is already taken, please try another.',
        INVALID_PASSWORD       : '[ ' + service.data.password + ' ] is not a valid password.',
        INVALID_FIREBASE       : 'Invalid firebase specified: ' + FBURL,
        AUTHENTICATION_DISABLED: 'The specified authentication type is not enabled for this Firebase.',
        INVALID_ORIGIN         : 'Unauthorized request origin.',
        INVALID_USER           : 'The specified user does not exist.',
        UNKNOWN_ERROR          : 'An unknown error occurred. Please contact support@firebase.com.',
        USER_DENIED            : 'User denied authentication request.'
      },

      parseError: function() {

        console.log(service.data.email);
        if (error.code === 'INVALID_EMAIL' && !angular.isDefined(service.data.email)) {
          humanize.INVALID_EMAIL = 'Please specify an email address.';
        } else {
          humanize.INVALID_EMAIL = 'The email address [ ' + service.data.email + ' ] is invalid.';
        }

        angular.forEach(humanize, function (value, key) {
          if (error.code === key) {
            var humanized = humanize[error.code];

            if (error.type === 'login') {
              console.error('Error logging in:');
            } else if (error.type === 'create') {
              console.error('Error creating user: ' + error.email);
            }
            console.error(error.code);
            console.error(humanized);

            var alert = alertService.addAlert({type: 'danger', msg: humanized});

            if (error.time && error.time !== 0) {
              $timeout(function () {
                alertService.closeAlert(alert);
              }, error.time);
            }

          }
        });
      }
    };

    return service;
  }]);

}(angular.module('app.error', [])));