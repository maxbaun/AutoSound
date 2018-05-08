var webpack = require('webpack');
var config = require('./webpack.config.js');
var Compress = require('compression-webpack-plugin');

// config.plugins.push(
// 	new webpack.LoaderOptionsPlugin({
// 		minimize: true,
// 		debug: false
// 	}),
// 	new webpack.DefinePlugin({
// 		'process.env': {
// 			NODE_ENV: JSON.stringify('production')
// 		}
// 	}),
// 	new webpack.optimize.AggressiveMergingPlugin(),
// 	new Compress({
// 		asset: '[path].gz[query]',
// 		algorithm: 'gzip',
// 		test: /\.js$|\.css$/,
// 		threshold: 10240,
// 		minRatio: 0.8
// 	})
// );
//
// config.optimization.minimize = true;

module.exports = config;
