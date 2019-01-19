
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const mode = process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = {
	mode: mode,
	entry: "./src/api.js",
	module: {
		rules: [
			{ test: /\.js$/ },
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ManifestPlugin()
	],
	performance: { hints: false },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "api.js"
	},
}

