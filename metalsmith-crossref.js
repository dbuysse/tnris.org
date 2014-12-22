'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('lodash');

module.exports = crossref;

function crossref(options) {
  return function(files, metalsmith, done){
    options = normalize(options);

    var crossref = _.clone(options.include);

    Object.keys(files).forEach(function(filename){
      var file = files[filename];
      var key = file.preserved;
      var value = file.path;
      if (key === 'index') {
        value = './' + value;
      }
      crossref[urlPath(key)] = urlPath(value);
    });
    metalsmith.data.crossref = crossref;

    if (options.outfile) {
      if (options.outfile.split(path.sep).length > 1) {
        mkdirp(path.dirname(options.outfile), function (err) {
          if (err) {
            console.error(err);
          }
          else {
            fs.writeFile(options.outfile, JSON.stringify(crossref), done);
          }
        });
      } else {
        fs.writeFile(options.outfile, JSON.stringify(crossref), done);
      }
    } else {
      done();
    }
  };
}

function normalize(options) {
  var normalized = _.cloneDeep(options);
  normalized.include = normalized.include || {};
  return normalized;
}

function urlPath(str) {
  return str.replace(path.sep, '/');
}
