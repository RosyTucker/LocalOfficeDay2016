import DatabaseClient from '../DatabaseClient';

const putReading = (deviceId, value) => {
    const client = DatabaseClient.getClient();
    client.hset(Date.now(), deviceId, value);
};

export default {
    putReading
};
