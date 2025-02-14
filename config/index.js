const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL: process.env.EMAIL
}