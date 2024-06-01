const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false, // Use `true` for port 465, `false` for all other ports
  });

  module.exports = transporter;
