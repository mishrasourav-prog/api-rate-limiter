export default function generateKey(request, developerId) {

    const endUserId = request.body?.userId;

    if (endUserId) {
        return `rate:dev:${developerId}:user:${endUserId}`;
    }

    const ip = request.headers['x-forwarded-for'] || request.ip;

    if (ip) {
        return `rate:dev:${developerId}:ip:${ip}`;
    }

    return `rate:dev:${developerId}`;
}