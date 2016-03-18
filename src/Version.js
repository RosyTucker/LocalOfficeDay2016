const handler = (req, res) => {
    res.statusCode = 200;
    res.json({Version: '0.0.1'});
};

export default {
    END_POINT: '/version',
    handler: handler
}