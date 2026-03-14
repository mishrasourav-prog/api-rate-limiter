import { LimiterService } from "../rate-limiter/limiterService";

export async function rateLimiterMiddleware(req , res){
    const key = 'rate:${req.ip}';

    const allowed = await LimiterService(key);

    if(!allowed){
       return reply.code(429).send({error: 'Too Many Requests'});
    }
}