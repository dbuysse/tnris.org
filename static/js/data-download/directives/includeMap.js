var includeMap = function ($compile, $http) {
  return {
    restrict: 'EA',
    template: '<div id="map"></div>',
    link: {
      post: function ($scope, $element) {
        // create a map in the "map" div, set the view to a given place and zoom
        var map = L.map($element[0]).setView([51.505, -0.09], 13);

        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
      }
    }
  };
};
