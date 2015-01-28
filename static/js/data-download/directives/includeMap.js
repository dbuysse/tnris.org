var includeMap = function ($compile, $http, CARTODB_API_URL, CARTODB_COUNTY_VIZ_ID, CARTODB_QUAD_VIZ_ID) {
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

        var cartodb_layer_url = CARTODB_API_URL  + 'viz/' + CARTODB_QUAD_VIZ_ID + '/viz.json';

        cartodb.createLayer(map, cartodb_layer_url)
          .addTo(map)
          .on('done', function(layer) {
            layer.setInteraction(true);
            layer.on('featureOver', function(e, pos, latlng, data) {
              cartodb.log.log(e, pos, latlng, data);
            });
            layer.on('error', function(err) {
              cartodb.log.log('error: ' + err);
            });
          }).on('error', function(a,b,c) {
            cartodb.log.log("some error occurred");
          });
      }
    }
  };
};
