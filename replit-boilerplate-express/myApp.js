var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var connect = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//middleware logger of requests prints server requests
app.get('/json', function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//static assets usage example  
app.use("/public", express.static(__dirname + "/public"));

//. This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
//from https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({extended: false}));

//serves html index file
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
  //res.send(console.log(__dirname))
});

//apply some logic using secrets (environment variables) also serving JSON to a certain route
app.get('/json', function(req, res) {
  var text = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    text = text.toUpperCase();
    res.json({"message" : text});
  }
  else {
    res.json({"message" : text});
  }
}); 

//time server using "chain middleware" logic
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time : req.time });
});

//gets route parameter from client
app.get("/:word/echo", function(req, res) {
  var word = req.params.word;
  res.json({"echo" : word});
});

//gets query parameter from client
app.get("/name", function(req, res) {
  res.json({ name: req.query.first + " " + req.query.last});
});


//app.route(path).get(handler).post(handler) - como?

/*app.post("/name", function(req, res) {
  console.log(req.body);
});*/

//gets data from post requests
app.post("/name", function(req, res) {
  res.json({ name: req.body.first + " " + req.body.last});
});

 module.exports = app;
