export default async function healthRoutes(fastify) {
    fastify.get('/health', async(request,reply)=>{
        return reply.send(
            {
                status: 'ok',
                statusCode: 200,
                message: 'API is healthy and running smoothly',
                timestamp: Date.now()
            }
        )
    })
}