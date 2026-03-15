import { LimiterService } from "../rate-limiter/limiterService.js";
import { totalRequestsCounter } from "../metrics/metrics.js";
import { blockedRequestsCounter } from "../metrics/metrics.js";
import configProvider from "../rate-limiter/configProvider.js";


export async function rateLimiterMiddleware(request , reply){
    
    totalRequestsCounter.inc();
    const key = `rate:${request.ip}`;

    const allowed = await LimiterService(key);

    if(!allowed){
        blockedRequestsCounter.inc();
        return reply
       .header('X-RateLimit-Limit', configProvider.rateLimit.capacity)
       .code(429)
       .send({
        success:false,
        error: 'Too Many Requests'
       });
    }
}