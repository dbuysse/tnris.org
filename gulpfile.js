'use strict';

var _ = require('lodash');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-ruby-sass');
var gulp_front_matter = require('gulp-front-matter');

var dirs = {
  dist: './.dist',
  content: './content',
  scss: './scss',
  static: 'static',
  templates: './templates'
};

var paths = {
    scss: dirs.scss + '/**/*.scss',
    static: dirs.static + '/**/*'
};

gulp.task('default', ['dist', 'watch', 'connect']);


gulp.task('watch', function () {
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
    dirs.content + '/**/*'
  ])
    .pipe(gulp_front_matter()).on("data", function(file) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      })
    .pipe(
       gulpsmith()
         .use(markdown())
         .use(templates({
           engine: 'swig',
           directory: dirs.templates
         }))
         .use(permalinks('posts/:title'))
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
