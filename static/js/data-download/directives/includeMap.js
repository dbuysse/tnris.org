var includeMap = function ($compile, $http) {
  return {
    restrict: 'EA',
    template: '<img data-ng-src="{{ map.src }}" usemap="#IMap" alt="Map of {{ name }} {{ category }}">',
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

          $element.prepend(compiled);
        });
    }
  };
};
