'use strict';

var path = require('path');
var moment = require('moment');

module.exports = autodate;

function autodate(options) {
  options = normalize(options);

  return function(files, metalsmith, done){
    setImmediate(done);

    Object.keys(files).forEach(function(filepath){
      var file = files[filepath];
      var filename = path.basename(filepath);

      if (filename.length > options.format.length) {
        var test = filename.substr(0, options.format.length);
        var m = moment(test, options.format);
        if (m.isValid()) {
          if (file.date && stringify(file.date, options.format) !== stringify(m, options.format)) {
            throw new Error("Date-named file '" + filepath + "' has a non-matching date attribute: " + stringify(file.date, options.format));
          }

          file.date = file.date || m.toDate();
        }
      }
    });
  };
}


function normalize(options){
  if ('string' === typeof options) {
    options = { date: options };
  }
  options = options || {};
  options.format = options.format || 'YYYY-MM-DD';
  return options;
}


function stringify(date, format) {
  return moment(date).utc().format(format);
}
