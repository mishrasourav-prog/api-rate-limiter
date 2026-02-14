-- KEYS[1]  -> Redis key (rate:userId or rate:ip)
-- ARGV[1]  -> bucket capacity (max tokens)
-- ARGV[2]  -> refill rate (tokens per second)
-- ARGV[3]  -> current timestamp (seconds)

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

-- Fetch current state
local data = redis.call("HMGET", key, "tokens", "last_refill")
local tokens = tonumber(data[1])
local last_refill = tonumber(data[2])

-- Initialize bucket if not exists
if tokens == nil then
  tokens = capacity
  last_refill = now
end

-- Calculate elapsed time
local elapsed = math.max(0, now - last_refill)

-- Refill tokens
local refill = elapsed * refill_rate
tokens = math.min(capacity, tokens + refill)

-- Check availability
local allowed = tokens >= 1
if allowed then
  tokens = tokens - 1
end

-- Save updated state
redis.call("HMSET", key,
  "tokens", tokens,
  "last_refill", now
)

-- Set TTL so Redis cleans unused keys
local ttl = math.ceil(capacity / refill_rate)
redis.call("EXPIRE", key, ttl)

-- Return result (1 = allowed, 0 = blocked)
if allowed then
  return 1
else
  return 0
end
