var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('build', ['js', 'scss', 'html'])

gulp.task('js', function() {
  return gulp.src('src/js/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/js/'))
});

gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
});

// Watch for Changes
gulp.task('watch', function() {
  gulp.watch('src/js/app.js', ['js']);
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/index.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build'
  });
});

gulp.task('default', ['build', 'connect', 'watch']);


