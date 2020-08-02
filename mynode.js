const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require('path')
var nodemailer = require('nodemailer');


app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static(__dirname));

app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static(__dirname));

app.get('/', function(request, response) {
  console.log('GET /')
  var html = `
    <html>
        <body>
            <form method="post" action="http://localhost:3000">Name: 
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>
        </body>
    </html>`
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(html)
})

app.post('/', function(request, response) {
  console.log('POST /')
  console.dir(request.body)
  response.writeHead(200, {'Content-Type': 'text/html'})
  let lineOne = "Thank you for your response, " + request.body.name + ".<br>";
  var output = lineOne;
  let lineTwo = "Your address is: " + request.body.address + ".<br>";
  output += lineTwo;
  let lineThree = "Your Phone number is: " + request.body.phone + ".<br>";
  output += lineThree;
  let lineFour = "Your Email is: " + request.body.email + ".<br>";
  output += lineFour;
  let lineFive = "Your comments given are: " + request.body.comments + ".<br>";
  output += lineFive;
  
  //start email
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jackson.nicolas41@ethereal.email',
        pass: 'YNXYwZVHZ6wBD24vaU'
    }
  });
  let info = transporter.sendMail({
		from: 'noreplytyler38@gmail.com',
		to: request.body.email,
		subject: '[EB]Submission Confirmation',
		html: '<p>Dear ' + request.body.name + ' ' + ',</p><p>Thank you for your feedback submission.</p><p>Sincerely,</p><p>EB</p>'
	});
	
	transporter.sendMail(function (err, info){
		if(err){
			console.log(err);
		}
		else{
			console.log(info);
		}
	});
	//response.redirect('back');
  //end email
  //pause for 10 seconds to review output
  setTimeout(function() {
  }, 10000);
	
  response.write(output);
  response.end('Thank you.')
})

port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
/*
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
}).listen(8080);*/
		
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
