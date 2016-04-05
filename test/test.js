console.log('notification-wrapper: test');

// modules
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const opener = require('opener');

const config = {
	entry: {
		app: [
			"webpack-dev-server/client?http://localhost:8080/",
			"webpack/hot/dev-server",
			'./index.js'
		]
	},
	output: {
		path: __dirname,
		filename: 'bundle_index.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: [
					"babel-preset-es2015",
					"babel-preset-stage-0"
				]
			},
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //hotの依存
	]
}

const instance = webpack(config);

const server = new webpackDevServer(instance, {
	contentBase: "./",
	hot: true, // LiveReloadみたいなの
	inline: true
});
server.listen(8080);
opener('http://localhost:8080/');
