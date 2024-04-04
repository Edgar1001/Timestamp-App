// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // Check if date is empty
  if (date === undefined) {
    today = new Date();
    const timestamp = { unix: today.getTime(), utc: today.toUTCString() };
    res.json(timestamp);
  }

  // Check if date is a positive integer
  parsedDate = parseInt(date, 10)
  if (date == parsedDate && parsedDate >= 0) {
    date = parseInt(date, 10);
  }

  // Get the date object
  const dateObj = new Date(date);

  // Check if the date is valid
  const isValidDate = (dateObj instanceof Date && !isNaN(dateObj.valueOf()));

  // Set the timestamp response
  let timestamp = {};
  if (isValidDate) {
    timestamp = { unix: dateObj.getTime(), utc: dateObj.toUTCString() };
  }
  else {
    timestamp = { error: "Invalid date" }
  }

  // Send the response
  res.json(timestamp);
});


// listen for requests
const PORT = 8080;
var listener = app.listen(PORT, function() {
  console.log('The app is listening on port ' + listener.address().port + '.');
});
