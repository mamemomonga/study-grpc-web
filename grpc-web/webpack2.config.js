const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = {
	mode: mode,
	entry: "./tmp/grpc.js",
	output: {
		path: path.resolve(__dirname, "../var/dist/public/static"),
		filename: "grpc.js",
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[ '@babel/preset-env',{ targets: { node: '0.12.18' }}]
					]
				}
			}
		}]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						drop_console: true
					}
				}
      		}),
    	],
	},
	performance: { hints: false }
}

