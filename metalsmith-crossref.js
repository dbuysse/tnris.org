'use strict';

var _ = require('lodash');

module.exports = crossref;

function crossref(obj) {
  return function(files, metalsmith, done){
    setImmediate(done);

    var crossref = _.clone(obj) || {};
    Object.keys(files).forEach(function(filename){
      var file = files[filename];
      var key = file.preserved;
      var value = file.path;
      if (key === '') {
        key = 'index';
        value = '';
      }
      crossref[key] = value;
    });
    metalsmith.data.crossref = crossref;
  };
}
