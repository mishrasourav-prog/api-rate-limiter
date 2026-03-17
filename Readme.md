
# 🚀 Rate Limiter Microservice

A distributed rate-limiting microservice built using Node.js, Fastify, and Redis.
This service allows developers to protect their applications from abuse by enforcing request limits using API keys, user-based throttling, and IP-based fallback.


## Features

- 🔐 API Key Authentication
- 👤 Per-user rate limiting (recommended)
- 🌐 IP-based fallback limiting
- 🏢 Developer-level isolation
- ⚡ Redis-backed distributed rate limiting
- 📊 Standard rate limit headers


## How it Works

End User → Developer Backend → /check (Rate Limiter) → Allow / Block

- Developers integrate this service into their backend

- Each request is validated using an API key

- Rate limiting is applied based on:

    .userId (best)

    .IP address (fallback)

    .developer (last fallback)


## Tech Stack

- Node.js

- Fastify

- Redis

- Docker (optional)


## Installation

1️⃣ Clone the repository

    git clone https://github.com/mishrasourav-prog/api-rate-limiter.git
    cd rate-limiter-api

2️⃣ Install dependencies

    npm install
    
3️⃣ Setup environment variables

.env.example file:

    PORT=
    REDIS_HOST=
    REDIS_PORT=
    REDIS_URL=

    RATE_LIMIT_WINDOW=
    RATE_LIMIT_CAPACITY=
    RATE_LIMIT_REFILL_RATE=

4️⃣ Start Redis (Docker)

4️⃣ Start Redis (Docker)

    npm run dev


## API Usage

1️⃣ Register (Get API Key)

Endpoint

    POST /register

Response

    {
    "MESSAGE": "User registered successfully , save the api key for future use",
    "USER": "developer-id",
    "KEY": "your-api-key"
    }

👉 Save the KEY — this is required for all future requests

2️⃣ Check Rate Limit

Endpoint

    POST /check

🔑 Headers (REQUIRED)
     
    x-api-key: YOUR_API_KEY


## Request Options

✅ Option A: Per-User Limiting (Recommended)
    
    {
     "userId": "user123"
    }


🌐 Option B: IP-Based Limiting (Fallback)

    x-api-key: YOUR_API_KEY
    x-forwarded-for: USER_IP_ADDRESS


## Example Backend Integration

    import axios from "axios";

    async function checkRateLimit(userId, userIp) {
       try {
        const response = await axios.post(
        "http://localhost:3000/check",
        { userId }, // optional
        {
          headers: {
            "x-api-key": "YOUR_API_KEY",
            "x-forwarded-for": userIp,
          },
        }
      );

      return response.data.success;

      } catch (err) {
        if (err.response?.status === 429) {
          return false;
        }
        throw err;
       }
    }


## Key Generation Strategy

    rate:dev:<developerId>:user:<userId>   → Per user
    rate:dev:<developerId>:ip:<ip>         → Per IP
    rate:dev:<developerId>                 → Fallback


## Important Notes

- Always send API key in headers (x-api-key)

- Prefer userId for accurate rate limiting

- If no userId, send x-forwarded-for header

- Without both, rate limiting is applied at developer level


## Project Structure

    rate-limiter-api/
    │
    ├── src/
    │   │   app.js
    │   │   server.js
    │   │
    │   ├── lua/
    │   │   └── tokenBucket.lua
    │   │
    │   ├── metrics/
    │   │   └── metrics.js
    │   │
    │   ├── middlewares/
    │   │   └── rateLimiter.middleware.js
    │   │
    │   ├── plugins/
    │   │   └── redis.plugin.js
    │   │
    │   ├── rate-limiter/
    │   │   ├── configProvider.js
    │   │   └── limiterService.js
    │   │
    │   ├── routes/
    │   │   ├── check.routes.js
    │   │   ├── health.routes.js
    │   │   └── register.routes.js
    │   │
    │   └── utils/
    │       ├── generateKey.js
    │       └── register.js
    │
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── docker-compose.yml
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── README.md


## License

- MIT License 

