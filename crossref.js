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

function based() {
  return function(files, metalsmith, done){
    setImmediate(done);

    Object.keys(files).forEach(function(filename){
      var file = files[filename];
      var split = filename.split('/');
      if(split[split.length-1] === 'index.html') {
        split = split.slice(0, -1);
      }

      var base = '';
      split.forEach(function() {
        base += '../';
      });
      file.base = base;
    });
  };
}
