import { LimiterService } from "../rate-limiter/limiterService.js";
import { totalRequestsCounter } from "../metrics/metrics.js";
import { blockedRequestsCounter } from "../metrics/metrics.js";
import configProvider from "../rate-limiter/configProvider.js";
import generateKey from "../utils/generateKey.js";


export async function rateLimiterMiddleware(request , reply){
    
    totalRequestsCounter.inc();
    const key = generateKey(request);

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