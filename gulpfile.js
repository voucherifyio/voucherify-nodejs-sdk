'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('release', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('default', ['release'])
