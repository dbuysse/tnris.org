var DataService = ['$collection', '$http', 'DOWNLOAD_API_PRE', function ($collection, $http, downloadAPIPre)  {
  'use strict';

  var apiPre = downloadAPIPre + 'api/v1/';

  DataService = {};

  DataService.getAreas = function (type, name) {
    var filter = "type = '" + type + "'";

    if (!_.isUndefined(name)) {
      // case insensitive pattern match in name
      filter += " AND name LIKE '%" + name + "%'";
    }

    var promise = $http.get(apiPre + '/areas', {
      params: {
        filter: filter,
        limit: 300
      }
    })
    .then(function (resp) {
      return resp.data.areas;
    });

    return promise;
  };

  DataService.getAreaDatasets = function (type, name) {
    var promise = DataService.getAreas(type, name)
      .then(function (areas) {
        return areas[0].id;
      })
      .then(function(areaID) {
        var filter = "area_id = '" + areaID + "'";
        return $http.get(apiPre + '/resources', {
          params: {
            filter: filter,
            include: "Dataset"
          }
        });
      })
      .then(function (resp) {
        var resources = resp.data.resources;
        var group = _(resources).groupBy(function(resource) {
            return resource.dataset.displayName;
          })
          .pairs()
          .map(function(pair) {
            return {
              name: pair[0],
              resources: _.sortBy(pair[1], 'name')
            };
          })
          .sortBy('name')
          .value();
        return group;
      });

    return promise;
  };


  return DataService;
}];
