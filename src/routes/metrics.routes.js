import { register } from "../metrics/metrics.js";

export default async function metricsRoutes(fastify) {

  fastify.get("/metrics", async (request, reply) => {
    reply.header("Content-Type", register.contentType);
    return register.metrics();
  });

}