import fastify from '../app.js';

export default function healthRoutes(){
    fastify.get('/health', async(req,res)=>{
        return res.send(
            {
                status: 'ok',
                statusCode: 200,
                message: 'API is healthy and running smoothly',
                timestamp: Date.now()
            }
        )
    })
}