import fs from 'fs';
import path from 'path';
import redis from '../plugins/redis.plugin.js'
import configProvider from './configProvider.js';

const script = fs.readFileSync(path.join(process.cwd(), 'src/lua/tokenBucket.lua'), 'utf-8');

export async function LimiterService(key){
    const capacity = configProvider.rateLimit.capacity;
    const refillRate = configProvider.rateLimit.refillRate;
    const now = Math.floor(Date.now() / 1000);

    const result = await redis.eval(script, {
                        keys: [key],
                        arguments: [
                        capacity.toString(),
                        refillRate.toString(),
                        now.toString()
                        ]
                    });

    console.log("Limiter result:", result);                

    return result === 1;
}



