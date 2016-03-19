const endPoint = '/task',
    destinations = ['LDN', 'MCR'];

const isNumber = (input) => {
    return typeof input === 'number';
};

const isValidDestination = (input) => {
    return destinations.indexOf(input) > -1;
};

const postHandler = (req, res) => {
    const {destination, type} = req.body;

    if (!isValidDestination(destination)) {
        res.statusCode = 400;
        res.json({data: {error: `Invalid task destination: ${destination}`}});
        return;
    }

    if (!isNumber(type)) {
        res.statusCode = 400;
        res.json({data: {error: 'Task type must be a number'}});
        return;
    }

    res.statusCode = 200;
    res.json({data: {}});
};

export default {
    postHandler,
    endPoint
};