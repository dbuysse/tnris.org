'use strict';

angular.module('FormApp', ['ngAnimate', 'grecaptcha'])
  .config(function(grecaptchaProvider) {
    grecaptchaProvider.setParameters({
      sitekey: '6Lf8GP8SAAAAAFx2H53RtfDO18x7S1q_0pGNdmbd',
      theme: 'light'
    });
  })
  .controller('FormController', ['$scope', '$http', function($scope, $http) {
    var contact_app_url = 'http://localhost:8001/';

    $scope.master = {};
    $scope.errors = {};
    $scope.status = 'not submitted';
    $scope.recaptcha = '';

    $scope.submit = function(form) {
      $scope.master = angular.copy(form) || {};

      _($scope.form)
        .filter(function(value, key) {return key[0] !== '$';})
        .each(function(item) {
          $scope.errors[item.$name] = item.$invalid;
        });

      $scope.master.recaptcha = $scope.recaptcha;
      $scope.errors['recaptcha'] = !$scope.recaptcha;

      if (_.any($scope.errors)) {
        $scope.status = 'invalid';
      } else {
        $scope.status = 'submitting';

        $http.post(contact_app_url, $scope.master)
          .error(function(data, status, headers, config) {
            $scope.status = 'error';
            if (data && data.message) {
              $scope.serverError = data.message ;
            } else {
              $scope.serverError = 'There was a server error. Please wait a moment and try again.';
            }
          })
          .success(function(data, status, headers, config) {
            $scope.status = 'success';
          });
      }
    };

    $scope.updateItem = function (item) {
      $scope.errors[item.$name] = item.$invalid;
    };

    $scope.$watch('form.$invalid', function (value) {
      if (!value && $scope.status === 'invalid') {
        $scope.status = 'not submitted';
      }
    });

    $scope.$watch('recaptcha', function (value) {
      if (value && $scope.status === 'invalid') {
        $scope.status = 'not submitted';
        $scope.errors['recaptcha'] = !$scope.recaptcha;
      }
    });
  }]);
