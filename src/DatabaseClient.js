import redis from 'redis';
import url from 'url';

const getClientFromUrl = (redisAddress) => {
    const redisUrl = url.parse(redisAddress);
    const client = redis.createClient(redisUrl.port, redisUrl.hostname);
    client.auth(redisUrl.auth.split(':')[1]);
    return client;
};

let client;

const getClient = function () {
    if (!client) {
        client = process.env.REDISTOGO_URL ? getClientFromUrl(process.env.REDISTOGO_URL) : redis.createClient();
    }
    return client;
};

export default {
    getClient
};