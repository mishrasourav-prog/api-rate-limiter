
import app from './app.js'
import configProvider from './rate-limiter/configProvider.js';
import redis from './plugins/redis.plugin.js';

const PORT = configProvider.port;
const HOST = configProvider.host;

const startServer = async () => {
    try{
        await app.listen({ port: PORT, host: HOST }, () => {
            console.log('Server is running on port ' + PORT);
        })
    }catch(err){
        console.error('Error starting server:', err);
        process.exit(1);
    }
}
startServer();

process.on('SIGINT', async () => {
  await app.close();
  await redis.quit();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await app.close();
  await redis.quit();
  process.exit(0);
});