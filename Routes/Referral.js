var express = require("express");
var referral = express.Router();
var database = require("../Database/database");
var cors = require("cors");

referral.use(cors());

referral.post("/sendcode", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const FromUserID = req.body.FromUserID;
  const ToUserEmail = req.body.ToUserEmail;
  const referralCode = req.body.referralCode;
  var userData = {
    FromUserID: req.body.FromUserID,
    ToUserEmail: req.body.ToUserEmail,
    referralCode: req.body.referralCode,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO referrals (FromUserID, ToUserEmail, referralCode) VALUES (?,?,?)",
        [FromUserID, ToUserEmail, referralCode],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Successfully added";
            res.status(201).json(appData);
          } else {
            appData["data"] = "Error Occured!";
            res.status(400).json(appData);
            console.log(err);
          }
        }
      );
      connection.release();
    }
  });
});
referral.post("/validatecode/", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const ToUserEmail = req.body.ToUserEmail;
  const referralCode = req.body.referralCode;
  var userData = {
    ToUserEmail: req.body.email,
    referralCode: req.body.referralCode,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "Select * from referrals where ToUserEmail=? and referralCode=?",
        [ToUserEmail,referralCode],
        function (err, rows, fields) {
          if (!err) {
            
            console.log(rows)
            if(rows.length>0){
              appData.error = 0;
                  // console.log(ro.referralCode)
                  appData["data"] = rows;
                  res.status(201).json(appData);
            }
            else{
              appData.error=-1;
              appData["data"]="No Records found";
              
              res.status(201).json(appData);
              // console.log()
            }
            // console.log("HII")
            
          } else {
            appData["data"] = "Error Occured!";
            res.status(400).json(appData);
            console.log(err);
          }
        }
      );
      connection.release();
    }
  });
});
module.exports = referral;
