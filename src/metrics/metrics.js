import client from "prom-client";

export const totalRequestsCounter = new client.Counter({
    name: 'http_req_total',
    help: 'Total number of HTTP requests'
})

export const blockedRequestsCounter = new client.Counter({
    name: 'http_req_blocked_total',
    help: 'Total number of blocked HTTP requests'
})

export const register = client.register;

