var CartoService = ['CARTODB_CONFIG', function (config)  {
  'use strict';

  CartoService = {};

  CartoService.vizURL = function (type) {
    var protocol = window.location.protocol;
    var viz_id = config[type].viz_id;

    return protocol + '//' + config.account + '.cartodb.com/api/v2/viz/' + viz_id + '/viz.json';
  };

  CartoService.tableName = function (type) {
    return config[type].table;
  };

  CartoService.nameField = function (type) {
    return config[type].nameField;
  };

  return CartoService;
}];
