import HtmlWebpackPlugin from 'html-webpack-plugin'
const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false

module.exports = {
	mode: PRODUCTION ? 'production' : 'development',
	module: { rules: [
		{ test: /\.js$/, use: { loader: 'file-loader' }},
		{ test: /\.html$/, use: { loader: 'html-loader' }},
	]},
	performance: { hints: false },
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'client/dist/index.html'
		})
	],
	output: {
		filename: 'api-main-[hash].js',
		publicPath: '/static',
	},
}

