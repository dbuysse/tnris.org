'use strict';

var csv = require('csv-streamify');
var es = require('event-stream');
var fs = require('fs');

module.exports = plugin;

function plugin(csvPath, parser) {
  return function(files, metalsmith, done){
    fs.createReadStream(csvPath)
      .pipe(csv({objectMode: true, columns: true}))
      .pipe(es.map(function (data, callback) {
        data = parser(data, files, metalsmith);

        callback(null, data);
      }))
      .on('end', done);
  };
}
