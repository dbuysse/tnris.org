var includeMap = function ($compile, $http) {
  return {
    restrict: 'EA',
    template: '<div></div>',
    link: function ($scope, $element, $attrs) {
      var url = $scope.$eval($attrs.includeMap);

      $http.get(url)
        .then(function(result) {
          var mapElement = $(result.data);

          mapElement
            .children()
            .each(function () {
              var areaElement = $(this);
              var name = areaElement.attr('alt');
              areaElement.removeAttr('href');
              areaElement.attr('ui-sref', 'quad({name: "' + name + '"})');
            });
          var compiled = $compile(mapElement)($scope);

          $element.append(compiled);
        });
    }
  };
};
