var dataDownloadCtrl = function ($scope, $state, DataService) {
  'use strict';

  $scope.counties = [];
  $scope.county = {};

  DataService.getAreas('county')
    .then(function (counties) {
      $scope.counties = _.map(counties, function(county) {
        return {
          value: county.name,
          text: county.name
        };
      });
    });

  $scope.$watch('county.selected', function (value) {
    if (!value) {
      return;
    }
    $state.go('county', {name: value.value});
    $scope.county.selected = undefined;
  });


  $scope.quads = [];
  $scope.quad = {};

  $scope.searchQuads = function(search) {
    DataService.getAreas('quad', search)
      .then(function (quads) {
        $scope.quads = _.map(quads, function(quad) {
          return {
            value: quad.name,
            text: quad.name
          };
        });
      });
  };

  $scope.$watch('quad.selected', function (value) {
    if (!value) {
      return;
    }
    $state.go('quad', {name: value.value});
    $scope.quad.selected = undefined;
  });
};
