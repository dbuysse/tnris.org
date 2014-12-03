'use strict';

angular.module('ContactApp', [])
  .controller('ContactController', ['$scope', function($scope) {
    $scope.master = {};
    $scope.errors = {};

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
      alert($scope.master);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

    var validateList = [
      'subject',
      'name',
      'email',
      'phone',
      'address',
      'industry'
    ];

    function updateErrorState(itemName) {
      return function () {
        $scope.errors[itemName] = $scope.form[itemName].$dirty && $scope.form[itemName].$invalid;
      };
    }

    for (var i = 0, len = validateList.length; i < len; i++) {
      var item = validateList[i];

      $scope.$watch('form.' + item + '.$dirty && form.' + item + '.$invalid', updateErrorState(item));
    }
  }]);
