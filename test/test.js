console.log('notification-wrapper: test');

// modules
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const opener = require('opener');
const path = require('path');


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
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //hotの依存
	],

	module: {
		rules: [{
            test: /\.(js|mjs)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
						["env", {
							modules: false
						}],
						'stage-0'
					]
                }
            }
        }]
	},

	mode: 'development'
}

const instance = webpack(config);

const server = new webpackDevServer(instance, {
	contentBase: "./",
	hot: true, // LiveReloadみたいなの
	inline: true
});
server.listen(8080);
opener('http://localhost:8080/');
