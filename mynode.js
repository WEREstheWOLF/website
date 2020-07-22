var http = require('http');

var fs = require('fs');
var htmlFile;
var path = require('path');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ffv = require('.node_modules/feedbackformval'); //custom?
var nodemailer = require('nodemailer');
var uuidvl = require('uuid/vl');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(express.static('public/css'));

//app.use('/css',express.styatic(__dirname + '/css'));
//app.use('/public',express.static('public'));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/html/form_submission.php', funstion (req, res){
	var body = '';
	var testValidity = false;
	req.on('data', function(chunk){
		body += chunk.toString();
	});
	req.on('end', function(){
		testValidity = ffv.validateForm(body); //check
		if(testValidity === true){
			var ts = Date.now();
			var parsed = qs.parse(body);
			fs.appendFile('flatfileDB.txt', convertToString(parsed, ts)); //check
			sendEmail(parsed['email'],ts);
			res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'} );
			res.end();
		}
		else{
			res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'} );
			res.end(testValidity);
		}
	});
});

function convertToString(data, ts){
	data.id = uuidvl();
	data.created_at = Date();
	data.reference_id = ts;
	return JSON.stringify(data);
}

function sendEmail(email, reference){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		auth: {
			user: process.env.EMAILUSER,
			pass: process.env.EMAILPASS
		}
	});
	var mailOptions = {
		from: process.env.EMAILUSER,
		to: email,
		subject: 'Confirmation Email',
		text: "Your information has been received.\nThank you for your feedback."
	};
	transporter.sendMail(mailOptions);
}
			
	

/*app.get('/contactMe', function(req, res){
	return response.render('contactMe', {qs: req.query}));
});

app.post('/contactMe', urlencodedParser, function(request, response){
	return response.render('contactMe', {qs: req.query}));
});

app.get('/contactMe', function(req, res){
	return response.send(request.body);
});*/



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
