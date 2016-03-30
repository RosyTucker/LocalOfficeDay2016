import DatabaseClient from '../DatabaseClient';

const seriesName = 'SensorReadings';

const putReading = (deviceId, value) => {
    const client = DatabaseClient.getClient();
    console.log('Adding', deviceId, value, Date.now());
    client.zadd(seriesName, Date.now(), JSON.stringify({deviceId: deviceId, value: value}));
};

const getLatestReadings = (timeRangeMillis) => {
    return new Promise(resolve => {
        const client = DatabaseClient.getClient();
        client.zrangebyscore(seriesName, Date.now() - timeRangeMillis, Date.now(), (results) => {
            console.log('Results', results);
            resolve(results);
        });
    });
};

export default {
    putReading,
    getLatestReadings
};
