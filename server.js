// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

const browser = require("browser-detect");




//Request Ip method found here : https://stackfame.com/get-ip-address-node#How_to_User8217s_get_IP_address_in_Express_JS
const requestIp = require("request-ip");

const ipMiddleware = function(req, res, next) {
  
  console.log(clientIp) 
  next();
};


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", 
function (req, res) {
  const result = browser(req.headers["user-agent"]);
  const clientIp = requestIp.getClientIp(req);
  res.json({
    ipaddress: clientIp,
    language:req.headers["accept-language"].split(",")[0] +", " + req.headers["accept-language"].split(",")[1],
    software: result.name + "/ " + result.version
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
