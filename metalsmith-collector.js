'use strict';

var collections = require('metalsmith-collections');
var extend = require('extend');
var Matcher = require('minimatch').Minimatch;
var path = require('path');

module.exports = collector;

function collector(options) {
  options = normalize(options);

  return function(files, metalsmith, done){
    var collectionsObj = {};

    var matcher = new Matcher(options.pattern);

    Object.keys(files).forEach(function(filename){
      var d = dirSplit(filename);
      var dir = d[0];
      var subpath = d[1];

      if (matcher.match(subpath)) {
        var pattern = dir === 'root' ? options.pattern : dir + '/' + options.pattern;
        collectionsObj[dir] = extend({'pattern': pattern}, options.default);
      }
    });

    return collections(collectionsObj)(files, metalsmith, done);
  };
}


function dirSplit(filename) {
  var filepath = path.normalize(filename);
  var split = filename.split(path.sep);

  if (split.length === 1) {
    return ['root', split[0]];
  }

  return [split[0], split.slice(1).join(path.sep)];
}


function normalize(options) {
  options = "string" === typeof options ? {pattern: options} : options || {};
  options.pattern = options.pattern || '*';
  options.default = {
    sortBy: 'date',
    reverse: true
  };

  return options;
}