import crypto from "crypto";
import redis from "../plugins/redis.plugin.js";

export default async function registerUser(){
     const userId = crypto.randomUUID();
     const apiKey = crypto.randomBytes(32).toString("hex");


    await redis.set(`user:${userId}`, apiKey);
    await redis.set(`apikey:${apiKey}`, userId);

     return ({
        MESSAGE: "User registered successfully , save the api key for future use",
        USER:userId,
        KEY:apiKey
     })
}