const nodemailer = require("nodemailer");
const redisClient = require('../redisClient');
const {EMAIL, EMAIL_PASSWORD} = require('../config/index');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const sendWelcomeEmail = async (username, email) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Fashion Ethnic!",
      html: `
        <h2>Dear ${username},</h2>
        <p>Thank you for signing up with <b>Fashion Ethnic</b>! 🎉</p>
        <p>We are excited to have you onboard.</p>
        <p>Enjoy your shopping experience with us.</p>
        <p>Best Regards,<br>Fashion Ethnic Team</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome Email sent to ${email}`);
    } catch (error) {
      console.error("Welcome Email failed:", error);
    }
  };

  redisClient.subscribe("user_registered", async (message) => {
    const user = JSON.parse(message);
    console.log(`New User Registered: ${user.username}, Sending Welcome Email...`);
    await sendWelcomeEmail(user.username, user.email);
  });  