const endPoint = '/task';

const postHandler = (req, res) => {
    res.statusCode = 200;
    res.json({data: {}});
};

export default {
    postHandler,
    endPoint
};