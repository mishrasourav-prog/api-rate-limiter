import fastify from 'fastify';
import app from './app.js'
import configProvider from './rate-limiter/configProvider.js';


const PORT = configProvider.port;

const startServer = async () => {
    try{
        await app.listen({ port: PORT }, () => {
            console.log('Server is running on port ' + PORT);
        })
    }catch(err){
        console.error('Error starting server:', err);
    }
}
startServer();