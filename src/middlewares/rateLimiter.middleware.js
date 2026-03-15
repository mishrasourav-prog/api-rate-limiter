import { LimiterService } from "../rate-limiter/limiterService";

let totalRequests = 0;
let blockedrequests = 0;

export async function rateLimiterMiddleware(req , res){
    totalRequests++;
    const key = 'rate:${req.ip}';

    const allowed = await LimiterService(key);

    if(!allowed){
       blockedrequests++;
       return res
       .header('X-RateLimit-Limit', process.env.RATE_LIMIT_CAPACITY)
       .code(429)
       .send({error: 'Too Many Requests'});
    }
}
