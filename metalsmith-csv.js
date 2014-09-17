'use strict';

var csv = require('csv');

module.exports = plugin;

function plugin(csv_path) {
  return function(files, metalsmith, done){
    setImmediate(done);
  };
}

