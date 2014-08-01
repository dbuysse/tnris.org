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
  templates: './templates'
};

gulp.task('default', ['scss', 'watch', 'connect']);

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['scss']);
});


gulp.task('connect', function() {
  connect.server();
});

gulp.task('scss', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});


gulp.task('metal', function () {
  gulp.src([
    dirs.content + '/**/*'
  ])
  .pipe(gulp_front_matter()).on("data", function(file) {
      _.assign(file, file.frontMatter); 
      delete file.frontMatter;
    })
  .pipe(
     gulpsmith()
       .metadata({
         "title": "My Bloggggg",
         "description": "My second, super-cool blog."
       })
       .use(markdown())
       .use(templates({
         engine: 'swig',
         directory: dirs.templates
       }))
       .use(permalinks('posts/:title'))
    )
    .pipe(gulp.dest(dirs.dist));
});


gulp.task('clean', ['clean-dist']);

gulp.task('clean-dist', function() {
  return gulp.src(dirs.dist)
    .pipe(rimraf());
});
