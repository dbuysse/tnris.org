'use strict';

angular.module('FormApp', ['ngAnimate'])
  .controller('FormController', ['$scope', '$http', function($scope, $http) {
    var contact_app_url = 'http://localhost:8001/';

    $scope.master = {};
    $scope.errors = {};
    $scope.status = 'not submitted';

    $scope.submit = function(form) {
      $scope.master = angular.copy(form);

      _($scope.form)
        .filter(function(value, key) {return key[0] !== '$'})
        .each(function(item) {
          $scope.errors[item.$name] = item.$invalid;
        });

      if (!$scope.form.$invalid) {
        $scope.status = 'submitting';

        $http.post(contact_app_url, $scope.master)
          .error(function(data, status, headers, config) {
            $scope.status = 'error';
          })
          .success(function(data, status, headers, config) {
            $scope.status = 'success';
          });
      }
    };

    $scope.updateItem = function (item){
      $scope.errors[item.$name] = item.$invalid;
    };
  }]);
