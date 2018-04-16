const changed = require('gulp-changed');
const gulp = require('gulp');

const config = require('../config');

gulp.task('copy', ['copy:scripts', 'copy:fonts', 'copy:favicon']);

gulp.task('copy:scripts', () => {
	return gulp.src(config.scripts.libsSrc)
		.pipe(changed(config.scripts.libsDest))
		.pipe(gulp.dest(config.scripts.libsDest));
});

gulp.task('copy:fonts', ['fonts'], () => {
	return gulp.src(config.fonts.src)
		.pipe(changed(config.fonts.dest))
		.pipe(gulp.dest(config.fonts.dest));
});

gulp.task('copy:favicon', () => {
	return gulp.src(config.favicon.src)
		.pipe(changed(config.favicon.dest))
		.pipe(gulp.dest(config.favicon.dest));
});
