var resourceGroup = ['$stateParams', 'DOWNLOAD_URL_PRE', function ($stateParams, downloadUrlPre) {
  return {
    restrict: 'EA',
    scope: {
      group: '=',
      areaDataset: '='
    },
    templateUrl: 'partials/resourceGroup.html',
    link: function($scope) {
      $scope.downloadUrlPre = downloadUrlPre;

      //EventAction strings for GA event tracking
      switch ($scope.areaDataset.area) {
        case 'statewide':
          $scope.eventAction = 'STATE_Texas';
          break;
        case 'county':
          $scope.eventAction = 'COUNTY_' + $stateParams.name;
          break;
        case 'quad':
          $scope.eventAction = 'QUAD_' + $stateParams.name;
          break;
        case 'doqq':
          $scope.eventAction = 'QQUAD_' + $stateParams.name;
          break;
      }
    }
  };
}];
