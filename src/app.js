import Fastify from 'fastify'
import {rateLimiterMiddleware} from './middlewares/rateLimiter.middleware.js';
import healthRoutes from './routes/health.routes.js';
import metricsRoutes from './routes/metrics.routes.js';
import checkRoutes from './routes/check.routes.js';
import registerRoutes from './routes/register.routes.js';


const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { 
    success: true,
    message: 'Welcome to the Rate Limiter API! Please refer to the documentation for usage details.'
  }
})

// fastify.addHook('onRequest', rateLimiterMiddleware);

fastify.register(healthRoutes);
fastify.register(metricsRoutes);
fastify.register(checkRoutes);
fastify.register(registerRoutes)

export default fastify;

