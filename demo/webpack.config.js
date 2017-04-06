var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry: './index.js',
	output: {
		filename: './dist/index.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(png|gif)$/,
				loader: 'file-loader',
				options: {
					publicPath: '/',
					outputPath: 'dist/img/',
					name: '[hash:6].[ext]'
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'dist/index.css',
			disable: false,
			allChunks: true,
			ignoreOrder: true
		})
	],

};