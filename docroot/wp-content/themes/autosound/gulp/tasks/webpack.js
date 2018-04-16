const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const config = require('../config').scripts;

gulp.task('webpack', []);

// PRODUCTION
gulp.task('webpack:build', function (callback) {
	// Modify some webpack config options
	const myConfig = Object.create(webpackConfig(false));
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(config.uglifyOptions)
	);

	webpack(myConfig, (err, stats) => {
		if (err) {
			throw new gutil.PluginError('webpack:build', err);
		}
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

// DEVELOPMENT
// modify some webpack config options
let myDevConfig = Object.create(webpackConfig(true));
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// Create a single instance of the compiler to allow caching
let devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', callback => {
	// Run webpack
	devCompiler.run((err, stats) => {
		if (err) {
			throw new gutil.PluginError('webpack:build-dev', err);
		}
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));
		callback();
	});
});
