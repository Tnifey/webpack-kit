const webpack = require('webpack');
const path = require('path');

const HWP = require('html-webpack-plugin');
const BSWP = require('browser-sync-webpack-plugin');
const NIWP = require('npm-install-webpack-plugin');

module.exports = {
	/* entry point */
	entry: "./src/app.js", // default: ./src/app.js
	/* output options */
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	/* target */
	target: "web",

	/* modules */
	module: {
		/* loaders */
		rules: [
			/* babel-loader */
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				options: {
					presets: ["env"],
				}
			},

			/* html loader */
			{
				test: /\.html?$/,
				loader: "html-loader",
				options: {
					minimize: true,
					removeComments: true,
					removeCommentsFromCDATA: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					removeScriptTypeAttributes: true,
					removeStyleTypeAttributes: true,
				}
			},

			/* css loader / style loader */
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							minimize: true,
							sourceMap: true,
						}
					},
				]
			},

			/* sass loader | scss loader */
			{
				test: /\.(sass|scss)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							minimize: true,
							sourceMap: true,
						}
					},
					"sass-loader"
				]
			},
		]
	},

	/* Plugins */
	plugins: [
		/* create index.html */
		new HWP(),

		/* browser sync */
		new BSWP({
			host: 'localhost',
			port: 3000,
			cache: false,
			server: {
				baseDir: "dist"
			},
			notify: false, // without notification bubble
		}),

		/* automatically installing & saving dependencies - npm install plugin */
		new NIWP({
			dev: false,
			quiet: true,
			peerDependencies: true,
		}),


	]
}