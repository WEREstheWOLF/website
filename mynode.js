var http = require('http');

var fs = require('fs');
var htmlFile;
var path = require('path');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(express.static('public/css'));

//app.use('/css',express.styatic(__dirname + '/css'));
//app.use('/public',express.static('public'));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/contactMe', function(req, res){
	return response.render('contactMe', {qs: req.query}));
});

app.post('/contactMe', urlencodedParser, function(request, response){
	return response.render('contactMe', {qs: req.query}));
});

app.get('/contactMe', function(req, res
	return response.send(request.body);
});



http.createServer(function (req, res){
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	if(request.headers.appect.split(',')[0] == 'text/css'){
		fs.readFile('index.css', (err, data)=>{
			res.writeHeader(200, {'Content-Type': 'text/css'});
			res.write(data);
			res.end();
	fs.readFile(filename, function(err, data){
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(8080);
