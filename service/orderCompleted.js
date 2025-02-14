const redis = require('redis');
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

const sendOrderCompletionEmail = async (username, email, order) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "🛍️ Your Order is Complete - Fashion Ethnic",
        html: `
            <h2>Dear ${username},</h2>
            <p>Thank you for shopping with <b>Fashion Ethnic</b>! 🎉</p>
            <p>Your order has been successfully processed. Here are your order details:</p>

            <h3>🛒 Order Summary</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Order Date:</strong> ${order.orderDate}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>

            <h3>📦 Products Ordered</h3>
            <ul>
                ${order.items.map(item => `
                    <li>
                        <strong>${item.name}</strong> <br>
                        Quantity: ${item.quantity} <br>
                        Price: ₹${item.price} 
                    </li>
                `).join('')}
            </ul>

            <h3>💳 Payment Invoice</h3>
            <p><strong>Total Amount Paid:</strong> ₹${order.totalAmount}</p>

            <p>We hope you enjoy your purchase. If you have any questions, feel free to reach out to our support team.</p>
            <p>Best Regards,<br><b>Fashion Ethnic Team</b></p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order Completion Email sent to ${email}`);
    } catch (error) {
        console.error("Order Completion Email failed:", error);
    }
};

redisClient.subscribe("order_completed", async (message) => {
    const orderData = JSON.parse(message);
    console.log(`Order Completed: ${orderData.orderId}, Sending Confirmation Email...`);
    await sendOrderCompletionEmail(orderData.username, orderData.email, orderData);
});
