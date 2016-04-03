import _ from 'lodash';
import objectAssign from 'object-assign';
import DatabaseClient from '../DatabaseClient';

const seriesName = 'SensorReadings';

const mapDatabaseResultToReadings = (results) => _.chain(results)
    .chunk(2)
    .map(entry => objectAssign({}, {time: entry[1]}, JSON.parse(entry[0])))
    .value();

const putReading = (deviceId, value) => {
    const client = DatabaseClient.getClient();
    client.zadd(seriesName, Date.now(), JSON.stringify({deviceId: deviceId, value: value}));
};

const getLatestReadings = (timeRangeMillis) => {
    return new Promise(resolve => {
        DatabaseClient.getClient().zrangebyscore(seriesName, Date.now() - timeRangeMillis, Date.now(), 'withscores', (error, results) => {
            resolve(mapDatabaseResultToReadings(results));
        });
    });
};

export default {
    putReading,
    getLatestReadings
};
