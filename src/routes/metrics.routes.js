import fastify from "fastify";

export default function metricsRoutes(){
    fastify.get('/metrics', async(req,res)=>{
        return res.send({
            total: totalRequests,
            blocked: blockedrequests,
            approved: totalRequests - blockedrequests,
            timestamp: Date.now()

        })
    })
}