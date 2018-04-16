const gulp = require('gulp');
const data = require('gulp-data');
const twig = require('gulp-twig');
const path = require('path');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');

const config = require('../config').twig;

// De-caching for Data files
function requireUncached($module) {
	delete require.cache[require.resolve($module)];
	return require($module);
}

gulp.task('twig', function () {
	return gulp.src(config.src)
		.pipe(plumber({
			errorHandler: error => {
				gutil.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(data(() => {
			return requireUncached(config.data + 'global.json');
		}))
		.pipe(data(file => {
			return requireUncached(config.data + path.basename(file.path, '.twig') + '.json');
		}))
		.pipe(twig({
			namespaces: {
				includes: config.includes
			}
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.dest));
});
