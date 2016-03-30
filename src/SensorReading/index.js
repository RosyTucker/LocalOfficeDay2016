import SensorReadingStore from './SensorReadingStore';

const endPoint = '/sensorReading', timeRangeMillis = 5000;

const isNumber = (input) => {
    return typeof input === 'number';
};

const invalidRequestResponse = (res, message) => {
    res.statusCode = 400;
    res.json({data: {error: message}});
};

const postHandler = (req, res) => {
    if (!req.body || !req.body.deviceId || !req.body.value) {
        invalidRequestResponse(res, 'Sensor reading must have a deviceId and a value');
        return;
    }

    if (!isNumber(req.body.deviceId) || !isNumber(req.body.value)) {
        invalidRequestResponse(res, 'Sensor reading must have a numeric deviceId and value');
        return;
    }

    SensorReadingStore.putReading(req.body.deviceId, req.body.value);
    res.statusCode = 200;
    res.json({data: {}});
};

const getHandler = (req, res) => {
    res.statusCode = 200;
    SensorReadingStore.getLatestReadings(timeRangeMillis).then(results => res.json({data: results}));
};

export default {
    postHandler,
    getHandler,
    endPoint
};