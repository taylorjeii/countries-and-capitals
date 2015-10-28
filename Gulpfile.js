var gulp = require('gulp');

var usemin = require('gulp-usemin');
var connect = require('gulp-connect');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

gulp.task('connect', function() {
  connect.server();
});


gulp.task('copy-html-files', function() {
  gulp.src(['./app/**/*.html', './app/owm-cities.json', '!./app/index.html'], {base: './app'})
  .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy-html-files', 'usemin']);