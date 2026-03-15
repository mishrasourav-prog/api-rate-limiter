import { register } from "../metrics/metrics.js";

export default async function metricsRoutes(fastify, options) {

  fastify.get("/metrics", async (req, reply) => {
    reply.header("Content-Type", register.contentType);
    return register.metrics();
  });

}