const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		open: true,
		port: 3003
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'seatselection',
			filename: 'remoteEntry.js',
			exposes: {
				'./SeatSelection':
					'./src/components/SeatSelectionContent/SeatSelectionContent.jsx'
			},
			remotes: {
				movieapp: 'movieApp@http://localhost:9000/remoteEntry.js'
			},
			shared: ['react', 'react-dom']
		}),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: path.resolve(__dirname, 'node_modules'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: 'defaults'
									}
								],
								'@babel/preset-react'
							]
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'async'
		}
	}
};
