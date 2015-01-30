var MapService = ['$collection', '$http', 'MAP_IMAGE_URL_PRE', 'CartoService', function ($collection, $http, mapImageUrlPre, CartoService)  {
  'use strict';

  MapService = {};

  MapService.find = function (type, name) {
    var baseUrl = mapImageUrlPre + type + '/' + name.toUpperCase();

    var src = baseUrl + '.JPG';
    var imageMapUrl = baseUrl + '.MAP';

    return {
      imageMap: imageMapUrl,
      src: src
    };
  };

  MapService.findByName = function (type, name) {
    var table = CartoService.tableName(type);
    var nameField = CartoService.nameField(type);

    var query = 'SELECT ' + nameField + ', ST_AsGeoJSON(the_geom) from ' + table + ' WHERE ' + nameField + " = '" + name + "'";

    return CartoService.sql(query);
  };

  MapService.findByLatLong = function (type, latitude, longitude) {
    var table = CartoService.tableName(type);
    var nameField = CartoService.nameField(type);

    var query = 'SELECT ' + nameField + ', ST_AsGeojson(the_geom) as geojson from ' + table +
      ' WHERE ST_Intersects(the_geom, ST_SetSRID(POINT(' + longitude + ', ' + latitude + ')::geometry, 4326))';

    return CartoService.sql(query)
      .then(function (data) {
        if (data.rows.length === 0) {
          return {};
        }
        if (data.rows.length > 1) {
          console.log("WARNING: More than 1 result returned for : " + type + '(' + latitude + ', ' + longitude + ')');
          return {};
        }
        var obj = data.rows[0];
        obj.name = obj[nameField];
        return obj;
      });
  };


  return MapService;
}];
