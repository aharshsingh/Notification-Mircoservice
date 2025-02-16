const nodemailer = require("nodemailer");
const redisClient = require('../redisClient');
const { EMAIL, EMAIL_PASSWORD } = require('../config/index');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});

const sendForgotPasswordEmail = async (email, otp) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: `
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password. Use the OTP below to proceed:</p>
            <h3>${otp}</h3>
            <p>This OTP is valid for 5 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best Regards,<br>Fashion Ethnic Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password Reset OTP sent to ${email}`);
    } catch (error) {
        console.error("Failed to send OTP email:", error);
    }
};

redisClient.subscribe("forgot_password", async (message) => {
    const data = JSON.parse(message);
    console.log(`Forgot Password Request for: ${data.email}, Sending OTP...`);
    await sendForgotPasswordEmail(data.email, data.OTP);
});

