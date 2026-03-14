import Fastify from 'fastify'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware.js';

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.addHook('onRequest', rateLimiterMiddleware);

export default fastify;

