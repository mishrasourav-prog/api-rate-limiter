import Fastify from 'fastify'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware.js';
import healthRoutes from './routes/health.routes.js';


const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.addHook('onRequest', rateLimiterMiddleware);

fastify.register(healthRoutes);


export default fastify;

