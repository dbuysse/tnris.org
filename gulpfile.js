'use strict';

var connect = require('gulp-connect');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');


gulp.task('default', ['watch', 'connect']);

gulp.task('watch', function () {
  gulp.watch('scss/', ['scss']);
});


gulp.task('connect', function() {
  connect.server();
});

gulp.task('scss', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass({sourcemap: true}))
    .pipe(gulp.dest('css'));
});
