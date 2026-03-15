import { LimiterService } from "../rate-limiter/limiterService.js"
import configProvider from "../rate-limiter/configProvider.js";
import generateKey from "../utils/keyGenerator.js";

export default async function checkRoutes(fastify){
    fastify.post('/check' , async(request,reply) => {
        const key = generateKey(request);

        const allowed = await LimiterService(key);

        if(allowed){
            return reply.send({
                success:true,
                message: 'Request successful'
            });
        }
        return reply
       .header('X-RateLimit-Limit', configProvider.rateLimit.capacity)
       .code(429)
       .send({
        success:false,
        error: 'Too Many Requests'
       });
    })
}