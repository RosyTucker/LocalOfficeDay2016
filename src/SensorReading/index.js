import SensorReadingStore from './SensorReadingStore';

const endPoint = '/sensorReading';

const isNumber = (input) => {
    return typeof input === 'number';
};

const invalidRequestResponse = (res, message) => {
    res.statusCode = 400;
    res.json({data: {error: message}});
};

const postHandler = (req, res) => {
    console.log('body', req.body);
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

export default {
    postHandler,
    endPoint
};