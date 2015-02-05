'use strict';

angular.module('FormApp', ['ngAnimate', 'vcRecaptcha'])
  .controller('FormController', ['$scope', '$http', 'vcRecaptchaService', function($scope, $http, vcRecaptchaService) {
    var contact_app_url = 'https://tnris.org/contact-submit/';

    $scope.master = {};
    $scope.errors = {};
    $scope.status = 'not submitted';
    $scope.widgetId = null;
    $scope.recaptchaModel = {
        key: '6Lf8GP8SAAAAAFx2H53RtfDO18x7S1q_0pGNdmbd'
    };

    $scope.recaptchaSetResponse = function (response) {
        console.info('Response available');

        $scope.recaptcharesponse = response;
    };

    $scope.recaptchaSetWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);

        $scope.recaptchawidgetId = widgetId;
    };

    $scope.submit = function(form) {
      $scope.master = angular.copy(form) || {};

      _($scope.form)
        .filter(function(value, key) {return key[0] !== '$';})
        .each(function(item) {
          $scope.errors[item.$name] = item.$invalid;
        });

      $scope.master.recaptcha = $scope.recaptcha;
      $scope.errors.recaptcha = !$scope.recaptcha;

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

    $scope.recaptchaSuccess = function (response) {
      $scope.recaptcha = response;
    };

    $scope.$watch('recaptcha', function (value) {
      if (value && $scope.status === 'invalid') {
        $scope.status = 'not submitted';
        $scope.errors.recaptcha = !$scope.recaptcha;
      }
    });
  }]);
