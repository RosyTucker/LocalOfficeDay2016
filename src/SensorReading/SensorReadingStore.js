import DatabaseClient from '../DatabaseClient';

const seriesName = 'SensorReadings';

const putReading = (deviceId, value) => {
    const client = DatabaseClient.getClient();
    client.zadd(seriesName, Date.now(), JSON.stringify({deviceId: deviceId, value: value}));
};

const getLatestReadings = (timeRangeMillis) => {
    return new Promise(resolve => {
        const client = DatabaseClient.getClient();
        client.zrangebyscore(seriesName, Date.now() - timeRangeMillis, Date.now(), (error, results) => {
            const resultsAsJson = results.map(result => JSON.parse(result));
            resolve(resultsAsJson);
        });
    });
};

export default {
    putReading,
    getLatestReadings
};
