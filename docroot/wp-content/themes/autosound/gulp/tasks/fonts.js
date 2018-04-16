const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const gutil = require('gulp-util');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');

const config = require('../config').fonts;

gulp.task('fonts', () => {
	return gulp.src(config.src)
	// Ignore unchanged files
		.pipe(changed(config.dest))
		.pipe(plumber({
			errorHandler: error => {
				gutil.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(ttf2woff())
		.pipe(ttf2woff2())
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.dest));
});
