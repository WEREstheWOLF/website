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
app.use(express.urlencoded());
app.use(express.static(__dirname));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/contactMe', function(req, res){
	res.render('contactMe', {qs: req.query});
});

app.post('/contactMe', urlencodedParser, function(req, res){
	res.render('contact', {qs: req.query});
});

app.post('/html/contactMe.html', (req, res) => { 			//CHECK PATH
	console.log('Data: ', req.body.name, req.body.email);
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'noreplytyler38@gmail.com',
			pass: 'abcdefghijkLMNOP123'
		}
	});
	
	const mailOptions = {
		from: 'noreplytyler38@gmail.com',
		to: req.body.email,
		subject: '[EB]Submission Confirmation',
		html: '<p>Dear ' + req.body.name + ' ' + ',</p><p>Thank you for your feedback submission.</p><p>Sincerely,</p><p>EB</p>
	};
	
	transporter.sendMail(mailOptions, function (err, info){
		iff(err){
			console.log(err);
		}
		else{
			console.log(info);
		}
	});
	res.redirect('back');
});

/*app.post('/form_submission.php', function (req, res){
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
			fs.appendFile('data.txt', convertToString(parsed, ts)); 			//check
			sendEmail(parsed['email'],ts);
			res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'} );
			res.end();
		}
		else{
			res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'} );
			res.end(testValidity);
		}
	});
});		*/

app.get('*', function(req, res){
	if(req.url === '/favicon.ico'){
		res.writeHead(200, {Content-Type': 'image/x-icon} );
		return res.end();
	}
	var pathname = url.parse(req.url).pathname;
	pathname = ( pathname === '/' || pathname === '' ) ? '/contactMe.htm' : pathname;
	var ext = path.extname(pathname);
	fs.readFile(__dirname + pathname, function(err, data){
		if(err){
			if(ext){
				res.writeHead(404, {'Content-Type': mimeTypes[ext]});
			}
			else{
				res.writeHead(404, {'Content-Type': 'text/html'});
			}
			return res.end("404 Not Found");
		}
		if(ext){
			res.writeHead(200, {'Content-Type': mimeTypes[ext]});
		}
		else{
			res.writeHead(200, {'Content-Type': 'text/html'});
		}
		res.write(data);
		return.end();
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
			user: noreplytyler38@gmail.com,
			pass: abcdefghijkLMNOP123
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
