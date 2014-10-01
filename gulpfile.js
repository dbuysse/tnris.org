'use strict';

var _ = require('lodash');
var extend = require('extend');
var gulp = require('gulp');
var gulp_front_matter = require('gulp-front-matter');
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');
var path = require('path');
var each = require('metalsmith-each');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var replace = require('metalsmith-replace');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-ruby-sass');
var scapegoat = require('scapegoat');
var swig = require('swig');
var webserver = require('gulp-webserver');

var autodate = require('./metalsmith-autodate');
var based = require('./metalsmith-based');
var collector = require('./metalsmith-collector');
var crossref = require('./metalsmith-crossref');
var csv = require('./metalsmith-csv');
var metadata = require('metalsmith-metadata');

// turn off caching swig templates - so changes will propagate if re-run by a
// watch task
swig.setDefaults({ cache: false });

// patch swig groupBy filter so it doesn't mutate lists - this is a temporary
// workaround until patch makes it's way into a swig release. 
// See: https://github.com/paularmstrong/swig/pull/524
swig.setFilter('groupBy', function (input, key) {
  if (!_.isArray(input)) {
    return input;
  }
  var out = {};

  _.each(input, function (value) {
    if (!value.hasOwnProperty(key)) {
      return;
    }

    var keyname = value[key],
      newValue = _.cloneDeep(value);
    delete newValue[key];

    if (!out[keyname]) {
      out[keyname] = [];
    }

    out[keyname].push(newValue);
  });

  return out;
});

swig.setFilter('sortBy', function (input, key) {
  return _.sortBy(input, key);
});

swig.setFilter('urlize', function(input) {
  return urlize(input);
});

function urlize(str) {
  return str.toLowerCase().replace(/[\(\)]/g, '').replace(/\W/g, '-');
}

var dirs = {
  dist: './.dist',
  content: './content',
  scss: './scss',
  static: 'static',
  templates: './templates'
};

dirs.markdown = dirs.content + '/markdown';

var paths = {
  catalog: dirs.content + '/data-catalog.csv',
  content: dirs.content + '/**/*',
  markdown: dirs.markdown + '/**/*.md',
  scss: dirs.scss + '/**/*.scss',
  static: dirs.static + '/**/*',
  templates: dirs.templates + '/**/*',
  variables: dirs.content + '/variables.yaml'
};

gulp.task('default', ['dist', 'watch', 'webserver']);

gulp.task('watch', function () {
  gulp.watch(paths.content, ['dist-metal']);
  gulp.watch(paths.templates, ['dist-metal']);
  gulp.watch(paths.scss, ['dist-scss']);
  gulp.watch(paths.static, ['dist-static']);
});

gulp.task('webserver', ['dist'],  function() {
  gulp.src(dirs.dist)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('dist', ['dist-metal', 'dist-scss', 'dist-static']);

gulp.task('dist-metal', function () {
  gulp.src([
    paths.markdown,
    paths.variables
  ])
    .pipe(gulp_front_matter()).on("data", function(file) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      })
    .pipe(
      gulpsmith()
        .use(csv(paths.catalog, function parser (data, files, metalsmith) {
          metalsmith.data.catalog = metalsmith.data.catalog || [];
          var catalog = metalsmith.data.catalog;

          if (data.keywords) {
            data.keywords = data.keywords
              .split(',')
              .map(function (s) {
                return s.trim();
              });
          }

          data.cleanName = urlize(data.name);
          data.cleanCategory = urlize(data.category);
          data.filename = 'data-catalog/' + data.cleanCategory + '/'  + data.cleanName + '.md';

          var file = files[data.filename];
          if (file) {
            file = extend(file, data);
          } else {
            file = extend(data, {
              template: 'data_catalog_entry.html',
              contents: new Buffer('')
            });
          }

          files[data.filename] = file;

          catalog.push(file);
        }))
        .use(metadata({
          variables: 'variables.yaml'
        }))
        .use(each(function(file, filename) {
          file.preserved = filename.slice(0, -1 * path.extname(filename).length);
        }))
        .use(collector('*.md'))
        .use(autodate('YYYY-MM-DD'))
        .use(markdown({
          smartypants: false
        }))
        .use(each(function(file, filename) {
          file.urlEnd = file.withoutDate || file.preserved;
        }))
        .use(permalinks({
          pattern: ':collection/:date/:urlEnd',
          date: 'YYYY-MM-DD'
        }))
        .use(crossref())
        .use(based())
        .use(replace({
          contents: function(contents) {
            var str = contents.toString()
              .replace(/{{.+?}}/, scapegoat.unescape);

            return new Buffer(str);
          }
        }))
        .use(templates({
          engine: 'swig',
          inPlace: true
        }))
        .use(templates({
          engine: 'swig',
          directory: dirs.templates
        }))
      )
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('dist-scss', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('dist-static', function () {
  return gulp.src(paths.static)
    .pipe(gulp.dest(dirs.dist));
});


gulp.task('clean', ['clean-dist']);

gulp.task('clean-dist', function() {
  return gulp.src(dirs.dist)
    .pipe(rimraf());
});
