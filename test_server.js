var express = require('express');
var server = express();
var UI = require('./fake/ui');
var bodyParser = require('body-parser');
var argv = require('optimist').argv;
var port = null;

argv.l ? port = 8080 : port = 80;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(require('./fake/cors'));

// Frontend static-files
var routes = require('./fake/routes');
server.use(express.static(__dirname + '/public'));
routes.forEach(function(route) {
	server.use(route, express.static(__dirname + '/public'));
});

// API
server.post('/api/login', require('./fake/login'));
server.get('/api/me', require('./fake/me'));
server.get('/api/features', require('./fake/features'));
server.get('/api/partners', require('./fake/partners'));
server.get('/api/partners/fraud', require('./fake/frod'));
server.post('/test', function(req, res){
	//res.send(req.query)
    console.log(req.body)
	res.send(req.body)
});

server.listen(port);
console.log('Fake started @', port);
