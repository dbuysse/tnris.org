'use strict';

var fs = require('fs');
var glob = require('glob');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('lodash');

module.exports = crossref;

function crossref(options) {
  return function(files, metalsmith, done){
    options = normalize(options);

    var crossref = _.clone(options.include);

    if (options.includeDirs) {
      _.forOwn(options.includeDirs, function (path, dir) {
        var filenames = glob.sync(dir + "/**/*", {nodir: true});
        var re = new RegExp("^" + dir);
        var keys = filenames.map(function (filename) {
          return filename.replace(re, path);
        });
        _.extend(crossref, _.zipObject(filenames, keys));
      });
    }


    Object.keys(files).forEach(function(filename){
      var file = files[filename];

      var key = file.preserved;
      var value = file.path;
      if (key === 'index') {
        value = './' + value;
      }

      //Handle paginated pages specially
      //This has the effect of only creating the crossref for
      // first file in paginated collection (it returns early otherwise)
      if (file.pagination && file.pagination.prev) { 
        return;
      }

      var urlKey = urlPath(key);
      if (crossref[urlKey]) {
        console.log('Warning: ', 'crossref already exists for "' + urlKey + '"');
      }

      crossref[urlKey] = urlPath(value);
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
  normalized.includeDirs = normalized.includeDirs || [];
  return normalized;
}

function urlPath(str) {
  return str.replace(path.sep, '/');
}
