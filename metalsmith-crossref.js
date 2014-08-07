'use strict';

module.exports = crossref;

function crossref() {
  return function(files, metalsmith, done){
    setImmediate(done);

    var crossref = {};
    Object.keys(files).forEach(function(filename){
      var file = files[filename];
      if (file.path === '') {
        crossref.index = '';
      } else {
        crossref[file.path] = filename;
      }
    });
    metalsmith.data.crossref = crossref;
  };
}
