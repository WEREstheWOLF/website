var http = require('http');

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var tj = require('templatesjs');
var fs = require('fs');
var nodemailer = require('nodemailer');
const path = require('path')

var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static(__dirname));

app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.heroku_nwkpq781);
var feedbackSchema = new mongoose.Schema({
	name: String,
	address: String,
	phone: String,
	email: String,
	comments: String
});
var feedback = mongoose.model("feedback", feedbackSchema);

app.post("/post-feedback", (req, res) =>{
	async function queryMongo(){
		const userStatus = await feedback.findOneAndUpdate( {email: req.body.email}, {$set:{
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			email: req.body.email,
			comments: req.body.comments
		}}, {upsert: true});
		return userStatus;
	}

	queryMongo().then(result => {
		let userStatus = result;
		let feedbackPage = fs.readFileSync(__dirname + 'html/contactMe.html');
		
		if (userStatus !== null) {
			tj.setSync(feedbackPage);
			let lineOne = "Thank you for revisiting, " + req.body.name + ">";
			let lineTwo = "Your new feedback has been recorded.";
			
			var output = tj.renderSync("primarymessage",lineOne);
			output = tj.setSync("secondarymessage",lineTwo);
			
			res.writeHead(200,{"Content-Type" : "text/html"});
			res.write(output);
			res.end();
		}
		else{
			tj.setSync(feedbackPage);
			let lineOne = "I apprecxiate your feedback, " + req.body.name + ".";
			var output = tj.renderSync("primarymessage",lineOne);
			feedback.count({}, function( err, count){
				console.log(count);
				lineTwo = "You are visitor number: <b>" + (count) + "</b>.";
				output = tj.renderSync("secondarymessage",lineTwo);
				res.writeHead(200,{"Content-Type" : "text/html"});
				res.write(output);
				res.end();
			});
		}
	});
	
	let testAccount = await nodemailer.createTestAccount();
	
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		}
	});
	
	let info = await transporter.sendMail({
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
	pathname = ( pathname === '/' || pathname === '' ) ? '/contactMe.html' : pathname;
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
		
		app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});
		
const listener = app.listen(process.env.PORT, () => {
	console.log("Website is running on port " + listener.address().port);
});
		
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/contactMe.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/aboutMe.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/shapeTFGame.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.css'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/aboutMe.css'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/shapeTFGame.css'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/mynode.js'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});
