const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const id = 14;
var mailer = express.Router();
var database = require("../Database/database");
var cors = require("cors");
const { query } = require("express");

mailer.use(cors());
mailer.use(bodyParser.json());
// mailer.use(bodyParser.json());

mailer.post("/send-email", (req, res) => {
  const email = req.body.email;
  console.log("HI");
  // console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pmifyp@gmail.com",
      pass: "zhdlzpsjqbdajagc",
    },
  });
  console.log(id);
  const mailOptions = {
    from: "your_gmail_username",
    to: email,
    subject: "Email verification",
    html:
      '<p>Click<a href="https://pmi-backend-production.up.railway.app/rides/verify-email/' +
      email +
      '">here</a> to verify your email on the POOL ME IN PLATFORM.</p>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Error occurred while sending email." });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ message: "Email sent successfully!" });
    }
  });
});
mailer.post("/send-email-ride", (req, res) => {
  const email = req.body.email;
  console.log("body", req.body);
  const driverid = req.body.driverid;
  var driveremail;
  var appData = {};
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      var query = `Select * from user where userID=${driverid}`;
      connection.query(query, function (err, rows, fields) {
        if (!err) {
          console.log("Rows", rows);
          appData["error"] = 0;
          appData["data"] = rows;
          // driveremail = rows.emailID;
          res.status(200).json(appData);
          // console.log(appData.data);
        } else {
          appData["error"] = 1;
          appData["data"] = "No data found";
          res.status(204).json(appData);
          console.log(err);
          // console.log(res);
        }
      });
      connection.release();
    }
  });
  console.log(appData.data);
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "pmifyp@gmail.com",
  //     pass: "zhdlzpsjqbdajagc",
  //   },
  // });
  // console.log(id);
  // const mailOptions = {
  //   from: "your_gmail_username",
  //   to: email,
  //   subject: "Email verification",
  //   html:
  //     '<p>Click<a href="https://pmi-backend-production.up.railway.app/rides/verify-email/' +
  //     email +
  //     '">here</a> to verify your email on the POOL ME IN PLATFORM.</p>',
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //     res.status(500).send({ message: "Error occurred while sending email." });
  //   } else {
  //     console.log("Email sent: " + info.response);
  //     res.status(200).send({ message: "Email sent successfully!" });
  //   }
  // });
});
module.exports = mailer;
