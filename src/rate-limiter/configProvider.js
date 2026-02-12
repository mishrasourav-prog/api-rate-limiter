import dotenv from 'dotenv'

dotenv.config()

const configProvider = {
   port: process.env.PORT || 3000,
   redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
    },
    rateLimit: {
        window: Number(process.env.RATE_LIMIT_WINDOW) || 60, // in seconds
        capacity: Number(process.env.RATE_LIMIT_CAPACITY) || 100, // max requests per window
        refillRate: Number(process.env.RATE_LIMIT_REFILL_RATE) || 1, // tokens added per second
    }
}

export default configProvider