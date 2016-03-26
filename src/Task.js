import TaskStore from './TaskStore';

const endPoint = '/task', destinations = ['LDN', 'MCR'];

const isNumber = (input) => {
    return typeof input === 'number';
};

const isValidDestination = (input) => {
    return destinations.indexOf(input) > -1;
};

const invalidRequestResponse = (res, message) => {
    res.statusCode = 400;
    res.json({data: {error: message}});
};

const getHandler = (req, res) => {
    res.statusCode = 200;
    res.json();
    res.json({data: TaskStore.getTask()});
};

const postHandler = (req, res) => {
    if (!req.body || !req.body.destination || !req.body.type) {
        invalidRequestResponse(res, 'Task must have a destination and type');
        return;
    }

    const {destination, type} = req.body;

    if (!isValidDestination(destination)) {
        invalidRequestResponse(res, `Invalid task destination: ${destination}`);
        return;
    }

    if (!isNumber(type)) {
        invalidRequestResponse(res, 'Task type must be a number');
        return;
    }

   TaskStore.putTask({destination: destination, type: type});
    res.statusCode = 200;
    res.json({data: {}});
};

export default {
    postHandler,
    getHandler,
    endPoint
};