var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = 8086;

var  entryConfigList = [
    'webpack-dev-server/client?http://localhost:'+port,
    'webpack/hot/dev-server',
    './mock/api.mock.js'
]

for(var k in config.entry){
	if(Array.isArray(config.entry[k])){
      [].unshift.apply(config.entry[k],entryConfigList);
	}
}

//http://webpack.github.io/docs/webpack-dev-server.html#api
new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	contentBase:'src/views/',
	stats: {
		colors: true
	}
}).listen(port,function(err, result) {
	if(err) console.log(err);
	   console.log('Listening at localhost:' + port);
});
