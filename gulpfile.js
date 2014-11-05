var pkg = require('./package.json');

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  return gulp.src('./src/*.js').pipe(gulp.dest('./dist')).pipe(rename({
    suffix : '.min'
  })).pipe(uglify({
    compress : true,
    preserveComments : 'some'
  })).pipe(gulp.dest('./dist'));
});
