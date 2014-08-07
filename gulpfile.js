'use strict';

var _ = require('lodash');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gulp_front_matter = require('gulp-front-matter');
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var replace = require('metalsmith-replace');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-ruby-sass');
var scapegoat = require('scapegoat');
var swig = require('swig');

var autodate = require('./metalsmith-autodate');
var based = require('./metalsmith-based');
var collector = require('./metalsmith-collector');
var crossref = require('./metalsmith-crossref');

// turn off caching swig templates - so changes will propagate if re-run by a
// watch task
swig.setDefaults({ cache: false });

var dirs = {
  dist: './.dist',
  content: './content',
  scss: './scss',
  static: 'static',
  templates: './templates'
};

var paths = {
  content: dirs.content + '/**/*.md',
  scss: dirs.scss + '/**/*.scss',
  static: dirs.static + '/**/*',
  templates: dirs.templates + '/**/*'
};

gulp.task('default', ['dist', 'watch', 'connect']);

gulp.task('watch', function () {
  gulp.watch(paths.content, ['dist-metal']);
  gulp.watch(paths.templates, ['dist-metal']);
  gulp.watch(paths.scss, ['dist-scss']);
  gulp.watch(paths.static, ['dist-static']);
});

gulp.task('connect', function() {
  connect.server({
    root: dirs.dist
  });
});

gulp.task('dist', ['dist-metal', 'dist-scss', 'dist-static']);

gulp.task('dist-metal', function () {
  gulp.src([
    paths.content
  ])
    .pipe(gulp_front_matter()).on("data", function(file) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      })
    .pipe(
      gulpsmith()
        .use(collector('*.md'))
        .use(autodate('YYYY-MM-DD'))
        .use(markdown({
          smartypants: false
        }))
        .use(permalinks(':collection/:title'))
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
