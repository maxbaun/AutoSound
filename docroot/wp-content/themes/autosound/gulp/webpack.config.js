const path = require('path');
const webpack = require('webpack');

const config = require('./config').scripts;

module.exports = isDev => {
	return {
		cache: true,
		context: path.resolve('app'),
		entry: {
			app: './scripts/app',
			fontloader: './scripts/fontloader'
		},
		output: {
			path: config.dest,
			publicPath: '/scripts/',
			filename: '[name].built.js',
			chunkFilename: '[name].bundle.js',
			libraryTarget: 'umd'
		},
		module: {
			preLoaders: [
				{
					test: /\.js$/,
					exclude: [/plugins/, /node_modules/],
					loader: 'eslint-loader'
				}
			],
			loaders: [
				{
					test: /\.js$|\.jsx$/,
					exclude: [/plugins/, /node_modules/],
					loader: 'babel-loader'
				},
				{
					test: /\.twig$/,
					loader: 'twig-loader'
				}
			]
		},
		plugins: [
			// Use this if you want to chunk shared libraries
			// new webpack.optimize.CommonsChunkPlugin('shared.js'),
			new webpack.ProvidePlugin({
				jQuery: 'jquery',
				$: 'jquery'
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production')
				},
				API_URL: JSON.stringify((isDev ? 'http://autosound.docksal/wp-json/wp/v2/' : 'http://autosound.com/wp-json/wp/v2/')),
				COOKIE_DOMAIN: JSON.stringify((isDev ? null : '.autosound.com'))
			})
		],

		// Replace modules by other modules or paths.
		// https://webpack.github.io/docs/configuration.html#resolve
		resolve: {
			extensions: ['', '.js', '.es6']
		}
	};
};
