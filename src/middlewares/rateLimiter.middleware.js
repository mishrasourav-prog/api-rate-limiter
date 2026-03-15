import { LimiterService } from "../rate-limiter/limiterService.js";
import { totalRequestsCounter } from "../metrics/metrics.js";
import { blockedRequestsCounter } from "../metrics/metrics.js";


export async function rateLimiterMiddleware(req , res){
    console.log("Rate limiter triggered for:", req.ip);
    totalRequestsCounter.inc();
    const key = `rate:${req.ip}`;

    const allowed = await LimiterService(key);

    if(!allowed){
        blockedRequestsCounter.inc();
        return res
       .header('X-RateLimit-Limit', process.env.RATE_LIMIT_CAPACITY)
       .code(429)
       .send({error: 'Too Many Requests'});
    }
}