const path = require('path');

module.exports = {
	mode: "none",
	entry: "./src/grpc.js",
	output: {
		path: path.resolve(__dirname, "tmp"),
		filename: "grpc.js",
	},
	module: {
		rules: [{ test: /\.js$/ }]
	},
	optimization: {
		minimize: false
	},
	performance: { hints: false }
}

