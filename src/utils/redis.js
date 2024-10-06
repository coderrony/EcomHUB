import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL); // Replace with your Redis connection URL

export default redis;
