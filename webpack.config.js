const webpack = require('webpack');
const path = require('path');

const HWP = require('html-webpack-plugin');
const BSWP = require('browser-sync-webpack-plugin');

module.exports = {
	/* entry point */
	entry: "./src/app.js", // default: ./src/app.js
	/* output options */
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},

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
					}
				]
			}
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
			}
		}),


	]
}