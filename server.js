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
var Mailer = require("./Routes/mailer");
var Users = require("./Routes/Users");
var Referral =require("./Routes/Referral")
var Driver = require("./Routes/Driver");
var Blockchain =require("./Routes/Blockchain")
// var Multichain = require("./Routes/Multichain");
var Vehicle = require("./Routes/Vehicle");
var Rides = require("./Routes/Rides");
var Landmarks = require("./Routes/Landmarks");
app.use("/mailer", Mailer);
// app.use("/blockchain", Multichain);
app.use("/users", Users);
app.use("/driver", Driver);
app.use("/vehicle", Vehicle);
app.use("/rides", Rides);
app.use("/landmarks", Landmarks);
app.use("/blockchain", Blockchain)
app.use("/referral", Referral)
var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port: ` + port);
});
