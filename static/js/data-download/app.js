var dataDownloadApp = function () {
  'use strict';

  var dataDownloadApp = angular.module('dataDownloadApp', [
    'angulartics',
    'angulartics.google.analytics',
    'ngCollection',
    'ngSanitize',
    'ui.router',
    'ui.select'
  ])
    .factory('DataService', DataService)
    .factory('MapService', MapService)
    .directive('includeMap', includeMap)
    .directive('resourceGroup',  resourceGroup)
    .constant('CARTODB_API_URL', 'http://tnris.cartodb.com/api/v2/')
    .constant('CARTODB_COUNTY_VIZ_ID', 'da36f3e8-9a69-11e4-8554-0e4fddd5de28')
    .constant('CARTODB_QUAD_VIZ_ID', 'd35a1478-a668-11e4-9d7d-0e018d66dc29')
    .constant('MAP_IMAGE_URL_PRE', '//s3.amazonaws.com/tnris-datadownload/')
    .constant('DOWNLOAD_URL_PRE', '//tg-twdb-gemss.s3.amazonaws.com')
    .constant('DOWNLOAD_API_PRE', '//tnris.org/data-download/api/v1')
    .controller('dataDownloadCtrl', dataDownloadCtrl)
    .config(function ($analyticsProvider) {
      $analyticsProvider.withAutoBase(true);
    })
    .config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads
        'self',
        // Allow loading from our s3 bucket
        '//s3.amazonaws.com/tnris-datadownload/**'
      ]);

      // For any unmatched url, redirect to /statewide
      $urlRouterProvider.otherwise("/statewide");

      $stateProvider
        .state('statewide', {
          url: "/statewide",
          templateUrl: "partials/results.html",
          controller: function($scope) {
            $scope.category = 'Statewide';

            $scope.map = null;

            DataService.getAreaDatasets('state', 'texas')
              .then(function (resourceGroups) {

                // for splitting statewide resource groups into columns
                var groupedGroups = _(resourceGroups)
                  .groupBy(function(g, index) {
                    return Math.floor(index / 4);
                  })
                  .values()
                  .value();

                $scope.areaDatasets = [
                  {
                    'area': 'statewide',
                    'groups': groupedGroups
                  }
                ];
              });
          }
        })
        .state('county', {
          url: "/county/:name",
          templateUrl: "partials/results.html",
          controller: function($scope, $stateParams, MapService) {
            $scope.category = 'County';
            $scope.name = _.clone($stateParams.name);

            $scope.map = MapService.find('counties', $scope.name);

            DataService.getAreaDatasets('county', $scope.name)
              .then(function (resourceGroups) {
                $scope.areaDatasets = [
                  {
                    'area': 'county',
                    'groups': resourceGroups
                  }
                ];
              });
          }
        })
        .state('quad', {
          url: "/quad/:name",
          templateUrl: "partials/results.html",
          controller: function($scope, $stateParams, $collection, MapService) {
            $scope.category = 'Quad';
            $scope.name = $stateParams.name;

            $scope.map = MapService.find('quads', $scope.name);

            $scope.areaDatasets = [{
                'area': 'quad',
                'groups': []
              }, {
                'area': 'doqq',
                'groups': [0, 1, 2, 3]
              }
            ];

            DataService.getAreaDatasets('quad', $scope.name)
              .then(function (resourceGroups) {
                $scope.areaDatasets[0].groups = resourceGroups;
              });

            ['NW','NE','SW','SE'].map(function(corner, index) {
              DataService.getAreaDatasets('qquad', $scope.name + '|' + corner)
                .then(function (resourceGroups) {
                  $scope.areaDatasets[1].groups[index] = resourceGroups[0];
                });
            });

          }
        });
    });

  return dataDownloadApp;
}();
