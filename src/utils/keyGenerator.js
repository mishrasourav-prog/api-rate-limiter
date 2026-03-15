export default function generateKey(request){
    const bodykey = request.body?.key;
    if(bodykey){
        return `rate:custom:${bodykey}`
    }

    const headerkey = request.headers['x-api-key'];
    if(headerkey){
        return `rate:header:${headerkey}`
    }

    return `rate:ip:${request.ip}`;
}