/* eslint no-sync: "off" */

const browserSync = require('browser-sync');
const gulp = require('gulp');

const config = require('../config.js').browserSync;

gulp.task('browserSync', ['dev'], () => {
    browserSync(config);
});

gulp.task('browserSync:dist', ['build'], () => {
    browserSync(config);
});
