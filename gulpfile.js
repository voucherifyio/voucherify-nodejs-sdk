'use strict'

/**
 *  Gulpfile must be compliant with node-v0.10 so tests on CI not fail
 */

var gulp = require('gulp')
var babel = require('gulp-babel')

gulp.task('release', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('default', ['release'])
