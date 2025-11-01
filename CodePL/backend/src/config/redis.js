// const { createClient }  = require('redis');

// const redisClient = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: 'redis-19934.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 19934
//     }
// });

// module.exports = redisClient;
const { createClient } = require('redis');

const redisClient = createClient({
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) || 19751
    }
});

redisClient.on("connect", () => console.log("🔌 Connecting to Redis..."));
redisClient.on("ready", () => console.log("✅ Redis ready to use"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));
redisClient.on("end", () => console.log("🚪 Redis connection closed"));

module.exports = redisClient;