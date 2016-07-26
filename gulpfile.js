const pkg = require('./package.json');

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('default', function () {
  return gulp.src('./src/*.js').pipe(babel({
    presets: ['es2015', 'es2016']
  })).pipe(gulp.dest('./dist')).pipe(rename({
    suffix: '.min'
  })).pipe(uglify({
    compress: true,
    preserveComments: 'some'
  })).pipe(gulp.dest('./dist'));
});
