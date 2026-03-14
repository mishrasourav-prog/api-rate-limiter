import fs from 'fs';
import path from 'path';
import redis from '../plugins/redis.plugin.js'

const luaScript = fs.readFileSync(path.join(process.cwd(), 'src/rate-limiter/tokenbucket.lua'), 'utf-8');

export async function LimiterService(key){
    const capacity = process.env.RATE_LIMITER_CAPACITY;
    const refillRate = process.env.RATE_LIMITER_REFILL_RATE;
    const now = Math.floor(Date.now() / 1000);

    const result = await redis.eval(luaScript , {
                    keys: [key],
                    arguments: [capacity, refillRate, now]
                })

    return result === 1;
}

