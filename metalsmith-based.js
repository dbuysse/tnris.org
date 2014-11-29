'use strict';

var path = require('path');

module.exports = based;

function based() {
  return function(files, metalsmith, done){
    setImmediate(done);

    Object.keys(files).forEach(function(filename){
      var file = files[filename];
      var split = filename.split(path.sep);
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
