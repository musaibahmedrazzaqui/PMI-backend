var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

var Users = require("./Routes/Users");
var Driver = require("./Routes/Driver");
var Vehicle = require("./Routes/Vehicle");
var Rides = require("./Routes/Rides");
var Landmarks = require("./Routes/Landmarks");
app.use("/users", Users);
app.use("/driver", Driver);
app.use("/vehicle", Vehicle);
app.use("/rides", Rides);
app.use("/landmarks", Landmarks);

var port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`Server running on port: ` + port);
});
