import { createClient } from 'redis';

const redis = createClient({
    url: process.env.REDIS_URL,
    socket: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
        connectTimeout: 10000
    },
    database: 1,
    disableOfflineQueue: true,
    pingInterval: 10000,
    
});

redis.on("connect", () => console.log("Redis connecting..."));
redis.on("ready", () => console.log("Redis ready"));
redis.on("reconnecting", () => console.log("Redis reconnecting..."));
redis.on('error', (err)=> {console.error('Redis Client Error', err);});
redis.on("end", () => console.log("Redis connection closed"));

await redis.connect();

export default redis;
