const nodemailer = require("nodemailer");

//Nodemailer

const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun" ,"mailtrap")
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.sendgrid.net",
  //   port: 587,
  //   auth: {
  //     user: "apikey",
  //     pass: process.env.SENDGRID_API_KEY,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  /////////////////////////////////
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: "587",
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  /////////////////////////////////
  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: "E-shop App <ibrahem22122001@outlook.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;
