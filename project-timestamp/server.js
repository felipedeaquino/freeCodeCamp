// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", (req, res) => {  
  var reqDate = req.params.date;
  //checks given parameter; timestamp format or date format
  var timestampOrDate = Number(reqDate);
  //not NaN means that it was a timestamp formatted as string
  if (isNaN(timestampOrDate) == false) {
    //creates Date object
    var utc = new Date(timestampOrDate);
    //formats output
    utc = utc.toUTCString();
    //response
    res.json({ unix: timestampOrDate, utc: utc })
  } else {
    //checks if date format is legit
    var timestamp = Date.parse(reqDate);
    //not NaN = legit
    if (isNaN(timestamp) == false) {
      //creates Date object
      var utc = new Date(timestamp);
      //formats output
      utc = utc.toUTCString();
      //response
      res.json({ unix: timestamp, utc: utc });
    } else {
      //invalid request parameter
      res.json({ error: "Invalid Date" });
    };
  };
});

app.get("/api/", (req, res) => {
  var date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
