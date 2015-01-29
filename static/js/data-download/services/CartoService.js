var CartoService = ['$http', 'CARTODB_CONFIG', function ($http, config)  {
  'use strict';

  CartoService = {};

  var baseURL = window.location.protocol + '//' + config.account + '.cartodb.com/api/v2/';

  CartoService.vizURL = function (type) {
    var viz_id = config[type].viz_id;

    return baseURL + 'viz/' + viz_id + '/viz.json';
  };

  CartoService.sql = function (query) {
    var url = baseURL + 'sql';

    return $http.get(url, {
      params: {
        q: query,
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  CartoService.tableName = function (type) {
    return config[type].table;
  };

  CartoService.nameField = function (type) {
    return config[type].nameField;
  };

  return CartoService;
}];
