'use strict';

angular.module('FormApp', [])
  .controller('FormController', ['$scope', function($scope) {
    $scope.master = {};
    $scope.errors = {};

    $scope.update = function(form) {
      $scope.master = angular.copy(form);
      _($scope.form)
        .filter(function(value, key) {return key[0] !== '$'})
        .each(function(item) {
          $scope.errors[item.$name] = item.$invalid;
        });
    };

    $scope.updateItem = function (item){
      $scope.errors[item.$name] = item.$invalid;
    };
  }]);
