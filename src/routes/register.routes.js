import registerUser from "../utils/register.js";

export default async function registerRoutes(fastify) {
    fastify.post("/register", async (request , reply)=>{
        try{
            const res = await registerUser();
            return reply.status(201).send(res);
        }
        catch(err){
                console.error(err);
                return reply.status(500).send({error:"Internal Server Error"});
            }
        
            }
        )
}