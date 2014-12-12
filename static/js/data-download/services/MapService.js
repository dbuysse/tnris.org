var MapService = ['$collection', '$http', 'MAP_IMAGE_URL_PRE', function ($collection, $http, mapImageUrlPre)  {
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

  return MapService;
}];
