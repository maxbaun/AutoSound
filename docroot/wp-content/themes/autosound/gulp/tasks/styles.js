const browserSync = require('browser-sync');
const gulp = require('gulp');
const gutil = require('gulp-util');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../config').styles;

const plugins = [
	cssnano({
		autoprefixer: {
			// CSSNano's implementation of Autoprefixer only removes unnecessary
			// prefixes by default.  `add: true` fixes that.
			// To define browser support, see package.json > browserslist.
			add: true,
			browsers: 'last 2 version, IE 9',
			remove: false
		},
		discardComments: {
			removeAll: true
		},
		zindex: false,
		options: {
			sourcemap: true
		},
		reduceIdents: false
	})
];

gulp.task('styles', () => {
	return gulp
		.src(config.src)
		.pipe(plumber({
			errorHandler: error => {
				gutil.log(error.message);
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({
			includePaths: ['./node_modules/']
		}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('.'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});
