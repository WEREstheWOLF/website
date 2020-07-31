  
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
