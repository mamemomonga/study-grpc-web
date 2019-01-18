const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = {
	mode: mode,
	entry: "./src/grpc.js",
	output: {
		path: path.resolve(__dirname, "../dist/static"),
		filename: "grpc.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
			}
		]
	},
	performance: { hints: false }
}

