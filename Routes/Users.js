var express = require("express");
var users = express.Router();
var database = require("../Database/database");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var token;

users.use(cors());

// process.env.SECRET_KEY = 09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611;

users.post("/register", function (req, res) {
  var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  var userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    insitituteID: 1,
    levelID: 1,
    gender: req.body.gender,
    emailID: req.body.emailID,
    password: req.body.password,
    profileImageUrl: "ss",
    dateJoined: today,
    isEmailVerified: 1,
    numOfReferrals: 0,
  };
  // const userID = 2;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const insitituteID = 1;
  const levelID = 1;
  const gender = req.body.gender;
  const emailID = req.body.emailID;
  const password = req.body.password;
  const profileImageUrl = "ss";
  const dateJoined = "2022-12-22";
  const isEmailVerified = 1;
  const numOfReferrals = 0;
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "INSERT INTO user (firstName, lastName, instituteID, levelID, gender, emailID, password, profileImageUrl, dateJoined, isEmailVerified, numOfReferrals) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          firstName,
          lastName,
          insitituteID,
          levelID,
          gender,
          emailID,
          password,
          profileImageUrl,
          dateJoined,
          isEmailVerified,
          numOfReferrals,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "User registered successfully!";
            res.status(201).json(appData);
          } else {
            appData["data"] = "Error Occured!";
            res.status(400).json(appData);
            console.log("in error");
          }
        }
      );
      connection.release();
    }
  });
});

users.post("/login", function (req, res) {
  var appData = {};
  var emailID = req.body.emailID;
  var password = req.body.password;

  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.error(err);
    } else {
      connection.query(
        "SELECT * FROM user WHERE emailID = ?",
        [emailID],
        function (err, rows, fields) {
          if (err) {
            appData.error = 1;
            appData["data"] = "Error Occused";
            res.status(400).json(appData);
            console.log(rows);
            console.log(err);
          } else {
            if (rows.length > 0) {
              if (rows[0].password == password) {
                let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                  expiresIn: 1440,
                });
                appData.error = 0;
                res.status(200).json(appData);
                console.log(rows);
              } else {
                appData.error = 1;
                appData["token"] = token;
                appData["data"] = "Email and Password does not match";
                res.status(200).json(appData);
                console.log(rows);
              }
            } else {
              appData.error = 2;
              appData["data"] = "Email does not exists!";
              res.status(204).json(appData);
              console.log(rows);
            }
            console.log(appData);
          }
        }
      );
      connection.release();
    }
  });
});

users.use(function (req, res, next) {
  var token = req.body.token || req.headers["token"];
  var appData = {};
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err) {
      if (err) {
        appData["error"] = 1;
        appData["data"] = "Token is invalid";
        res.status(500).json(appData);
        console.log("in jwt verify");
      } else {
        next();
      }
    });
  } else {
    appData["error"] = 1;
    appData["data"] = "Please send a token";
    res.status(403).json(appData);
  }
});

users.get("/getUsers", function (req, res) {
  var appData = {};

  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query("SELECT * FROM user", function (err, rows, fields) {
        if (!err) {
          appData["error"] = 0;
          appData["data"] = rows;
          res.status(200).json(appData);
          console.log(err);
        } else {
          appData["data"] = "No data found";
          res.status(204).json(appData);
          console.log(err);
          console.log(res);
        }
      });
      connection.release();
    }
  });
});

module.exports = users;