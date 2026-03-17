import { LimiterService } from "../rate-limiter/limiterService.js"
import configProvider from "../rate-limiter/configProvider.js";
import generateKey from "../utils/generateKey.js";
import redis from '../plugins/redis.plugin.js'

export default async function checkRoutes(fastify){

    

    fastify.post('/check' , async(request,reply) => {
        const apiKey = request.headers['x-api-key'];
        if (!apiKey) {
            return reply.code(401).send({ error: "API key required" });
        }
        let userId;
        try {
            userId = await redis.get(`apikey:${apiKey}`);
            if (!userId) {
            return reply.code(403).send({ error: "Invalid API key" });
            }
        } catch (error) {
             return reply.code(500).send({ error: "Redis error" });
        }
        

       
        const key = generateKey(request, userId);

        const allowed = await LimiterService(key);

        if(allowed){
            return reply.send({
                success:true,
                message: 'Allowed'
            });
        }
        return reply
       
       .header('X-RateLimit-Limit', configProvider.rateLimit.capacity)
       .header('X-RateLimit-Remaining', 0)
       .header('Retry-After', configProvider.rateLimit.window)
       .code(429)
       .send({
        success:false,
        error: 'Too Many Requests'
       });
    })
}