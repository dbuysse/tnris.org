'use strict';

var collections = require('metalsmith-collections');
var extend = require('extend');
var Matcher = require('minimatch').Minimatch;
var path = require('path');

module.exports = collector;

function collector(opts) {
  opts = "string" === typeof opts ? {pattern: opts} : opts || {};
  opts.pattern = opts.pattern || '*';
  opts.default = {
    sortBy: 'date',
    reverse: true
  };

  return function(files, metalsmith, done){
    var collectionsObj = {};

    var matcher = new Matcher(opts.pattern);

    Object.keys(files).forEach(function(filename){
      var d = dirSplit(filename);
      var dir = d[0];
      var subpath = d[1];

      if (matcher.match(subpath)) {
        var pattern = dir === 'root' ? opts.pattern : dir + '/' + opts.pattern;
        collectionsObj[dir] = extend({'pattern': pattern}, opts.default);
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
