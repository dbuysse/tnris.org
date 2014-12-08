'use strict';

angular.module('FormApp', ['ngAnimate'])
  .controller('FormController', ['$scope', function($scope) {
    $scope.master = {};
    $scope.errors = {};

    $scope.submit = function(form) {
      $scope.master = angular.copy(form);
      _($scope.form)
        .filter(function(value, key) {return key[0] !== '$'})
        .each(function(item) {
          $scope.errors[item.$name] = item.$invalid;
        });

      if (!$scope.form.$invalid) {
        alert('submit');
      }
    };

    $scope.updateItem = function (item){
      $scope.errors[item.$name] = item.$invalid;
    };
  }]);
