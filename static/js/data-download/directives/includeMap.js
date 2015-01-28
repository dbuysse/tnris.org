var includeMap = function ($compile, $http) {
  return {
    restrict: 'EA',
    template: '<div id="map"></div>',
    link: {
      post: function ($scope, $element) {
        // create a map in the "map" div, set the view to a given place and zoom
        var map = L.map($element[0]).setView([30, -97], 12);

        // add mapquest open aerial tile layer
        var baseLayer = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',{
          subdomains: '1234',
          attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
        });
        baseLayer.addTo(map);
      }
    }
  };
};
