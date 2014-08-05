'use strict';

var _ = require('lodash');
var collections = require('metalsmith-collections');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gulp_front_matter = require('gulp-front-matter');
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-ruby-sass');
var swig = require('swig');

// turn off caching swig templates - so changes will propagate if re-run by a
// watch task
swig.setDefaults({ cache: false });

// this is what urls will be prefixed when using {{ url('css/example.css') }}
// in templates
var url_prefix = '/';

var dirs = {
  dist: './.dist',
  content: './content',
  scss: './scss',
  url: 'url',
  templates: './templates'
};

var paths = {
  content: dirs.content + '/**/*.md',
  scss: dirs.scss + '/**/*.scss',
  url: dirs.url + '/**/*',
  templates: dirs.templates + '/**/*'
};

gulp.task('default', ['dist', 'watch', 'connect']);

gulp.task('watch', function () {
  gulp.watch(paths.content, ['dist-metal']);
  gulp.watch(paths.templates, ['dist-metal']);
  gulp.watch(paths.scss, ['dist-scss']);
  gulp.watch(paths.url, ['dist-url']);
});

gulp.task('connect', function() {
  connect.server({
    root: dirs.dist
  });
});

gulp.task('dist', ['dist-metal', 'dist-scss', 'dist-url']);

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
         .use(collections({
           news: {
            pattern: 'news/*.md',
            sortBy: 'date',
            reverse: true
           },
           spotlights: {
            pattern: 'spotlights/*.md',
            sortBy: 'date',
            reverse: true
           }
         }))
         .use(markdown())
         .use(permalinks(':collection/:title'))
         .use(templates({
           engine: 'swig',
           directory: dirs.templates,
           url: function (url) {
             return url_prefix + url;
           }
         }))
      )
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('dist-scss', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('dist-url', function () {
  return gulp.src(paths.url)
    .pipe(gulp.dest(dirs.dist));
});


gulp.task('clean', ['clean-dist']);

gulp.task('clean-dist', function() {
  return gulp.src(dirs.dist)
    .pipe(rimraf());
});
