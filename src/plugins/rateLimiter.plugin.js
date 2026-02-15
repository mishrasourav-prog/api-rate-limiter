import { createClient } from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const limiterPlugin = createClient({
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

limiterPlugin.on("connect", () => console.log("ratelimiter connecting..."));
limiterPlugin.on("ready", () => console.log("ratelimiter ready"));
limiterPlugin.on("reconnecting", () => console.log("ratelimiter reconnecting..."));
limiterPlugin.on('error', (err)=> {console.error('ratelimiter Client Error', err);});
limiterPlugin.on("end", () => console.log("ratelimiter connection closed"));

await limiterPlugin.connect();

export default limiterPlugin;



