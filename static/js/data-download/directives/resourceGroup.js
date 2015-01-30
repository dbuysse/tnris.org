var resourceGroup = ['DOWNLOAD_URL_PRE', function (downloadUrlPre) {
  return {
    restrict: 'EA',
    scope: {
      group: '='
    },
    templateUrl: 'partials/resourceGroup.html',
    link: function($scope) {
      $scope.downloadUrlPre = downloadUrlPre;
    }
  };
}];
