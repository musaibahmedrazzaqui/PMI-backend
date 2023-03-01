const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const id = 14;
var mailer = express.Router();
var database = require("../Database/database");
var cors = require("cors");

mailer.use(cors());

// mailer.use(bodyParser.json());

mailer.post("/send-email", (req, res) => {
  const email = req.body.email;
  console.log("HI");
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

module.exports = mailer;
