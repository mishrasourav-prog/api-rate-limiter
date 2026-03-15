import fs from 'fs';
import path from 'path';
import redis from '../plugins/redis.plugin.js'

const script = fs.readFileSync(path.join(process.cwd(), 'src/lua/tokenBucket.lua'), 'utf-8');

export async function LimiterService(key){
    const capacity = process.env.RATE_LIMIT_CAPACITY;
    const refillRate = process.env.RATE_LIMIT_REFILL_RATE;
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

