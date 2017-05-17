'use strict';

var path = require('path');

var express = require('express'),
	app = express(),
  router = express.Router(),
	config = require('./config');

app.use(express.static(path.join(__dirname,'dist')));

app.set('views', config.viewPath);
app.engine('.html', require('ejs').renderFile);
app.set('view engine', '.html');

app.use('/', router);

function render(res,req,title){
    title = req.query.title || title || config.name;

    res.render('index',{
        title:title
    });
}

app.get('*', function(req, res) {
      render(res,req);
});

//微信功能验证
router.get('/MP_verify_ALxXmZH7MaJ7Nvd7.txt',function(req,res){
    res.send('ALxXmZH7MaJ7Nvd7');
});

app.listen(config.port,'0.0.0.0', function(err) {
	if(err) console.log(err)
	console.log('app server listening on port ' + config.port);
});
