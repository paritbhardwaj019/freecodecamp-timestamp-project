// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:endpoint", function (req, res) {
  const { endpoint } = req.params;
  const myDate = new Date(endpoint);
  if (myDate.toUTCString() === "Invalid Date") {
    const newDate = new Date(Number(endpoint));
    if (newDate.toUTCString() === "Invalid Date") {
      res.status(400).json({ error: "Invalid Date" });
    } else {
      res
        .status(200)
        .json({ unix: newDate.getTime(), utc: newDate.toUTCString() });
    }
  } else {
    res.status(200).json({ unix: myDate.getTime(), utc: myDate.toUTCString() });
  }
});

app.get("/api", function (req, res) {
  const date = new Date();
  res.status(200).json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
