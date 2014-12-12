var resourceGroup = ['DOWNLOAD_URL_PRE', function (downloadUrlPre) {
  return {
    restrict: 'EA',
    scope: {
      group: '='
    },
    template: [
      '<div class="resourceGroup">',
        '<h3>{{ group.name }}</h3>',
        '<ul>',
          '<li ng-repeat="resource in group.resources">',
            '<a href="{{ downloadUrlPre }}{{ resource.url }}">',
              '<span class="glyphicon glyphicon-download-alt download-icon"></span>',
              '<span class="download-text">{{ resource.name }}</span>',
            '</a>',
          '</li>',
        '</ul>',
      '</div>'
    ].join(''),
    link: function($scope) {
      $scope.downloadUrlPre = downloadUrlPre;
    }
  };
}];
