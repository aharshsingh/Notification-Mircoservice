const redis = require('redis')
const {REDIS_URL, REDIS_PASSWORD} = require('./config/index')
const redisClient = redis.createClient({
  url: `rediss://:${REDIS_PASSWORD}@${REDIS_URL}`      
});

redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.connect();
module.exports = redisClient;
