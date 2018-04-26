const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const isDev = process.env.ENV !== 'production';

process.env.NODE_ENV = process.env.ENV;

const config = {
	mode: isDev ? 'development' : 'production',
	cache: true,
	context: path.resolve('app'),
	entry: {
		app: './scripts/app',
		fontloader: './scripts/fontloader',
		screen: './styles/screen.scss',
		vendor: [
			'babel-polyfill',
			'react',
			'react-dom',
			'redux',
			'redux-immutable',
			'redux-saga',
			'reselect',
			'react-router',
			'react-router-redux',
			'react-cookie',
			'react-motion',
			'lodash',
			'lodash-decorators',
			'Base64',
			'axios',
			'baguettebox.js',
			'html-react-parser',
			'isotope-layout',
			'swiper'
		]
	},
	output: {
		path: path.resolve('build'),
		publicPath: './',
		filename: isDev ? '[name].js' : '[name].[chunkhash].js',
		chunkFilename: '[name].bundle.js',
		libraryTarget: 'umd'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: './tools/postcss.config.js'
								}
							}
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [
									path.resolve('node_modules')
								]
							}
						}
					]
				})
			},
			{
				test: /\.(woff2?|ttf|otf|eot|svg)$/,
				loader: 'file-loader',
				options: {
					name: isDev ? '[name].[ext]?[hash:8]' : '[hash:8].[ext]',
					outputPath: './fonts'
				},
				exclude: [path.resolve('images')]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: './images'
				},
				exclude: [/node_modules/]
			},
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
		new WebpackAssetsManifest(),
		new ExtractTextPlugin({
			filename: isDev ? 'screen.css' : 'screen.[hash].css',
			allChunks: true,
			ignoreOrder: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production')
			},
			API_URL: JSON.stringify((isDev ? 'http://autosound.docksal/wp-json/wp/v2/' : 'http://autosound.com/wp-json/wp/v2/')),
			API_BASE: JSON.stringify((isDev ? 'http://autosound.docksal/wp-json/' : 'http://autosound.com/wp-json/')),
			COOKIE_DOMAIN: JSON.stringify((isDev ? null : '.autosound.com'))
		})
	]
};

module.exports = config;
