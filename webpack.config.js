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

			/* svg inline loader - svg */
			{
				test: /\.svg$/,
				loader: "svg-inline-loader"
			},

			/* json loader - .json */
			{
				test: /\.json$/,
				loader: "json-loader"
			},

			/* json5 loader - .json5 */
			{
				test: /\.json5$/,
				loader: "json5-loader"
			},

			/* raw text */
			{
				test: /\.(txt|raw)$/,
				loader: "raw-loader",					
			},

			/* fonts loader */
			{
				test: /\.(ttf|woff2?|otf|fnt|eot)$/,
				loader: "file-loader",
				options: {
					name: "[hash].[ext]",
					outputPath: "assets/fonts",
				}
			},

			/* images loader */
			{
				test: /\.(bmp|gif|ico|jpe?g|png|tiff?|webp)$/,
				loader: "file-loader",
				options: {
					name: "[hash].[ext]",
					outputPath: "assets/images/",
				}
			},

			/* audio loader */
			{
				test: /\.(wav|mp3|ogg|flac|acc)$/,
				loader: "file-loader",
				options: {
					name: "[hash].[ext]",
					outputPath: "assets/audios/",
				}
			},

			/* video loader */
			{
				test: /\.(mp4|webm|ogv|wmv)$/,
				loader: "file-loader",
				options: {
					name: "[hash].[ext]",
					outputPath: "assets/videos/",
				}
			},

			/* file loader */
			{
				test: /\.(7z|arj|deb|pkg|rar|rpm|gz|z|zip|bin|dmg|iso|toast|vcd|apk|bat|bin|cgi|pl|com|exe|gadget|jar|py|wsf|docx?|odt|pdf|rtf|tex|odp|pp[st]|pptx)$/,
				loader: "file-loader",
				options: {
					name: "[hash].[ext]",
					outputPath: "assets/files/",
				}
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