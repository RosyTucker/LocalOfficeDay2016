(function () {
    var data = [];

    const sensorReadingGetUrl = 'https://hackworks-challenge.herokuapp.com/sensorReading';

    const createColumns = function (group, deviceId) {
        const timeValues = _.concat(['time' + deviceId], _.map(group, 'time')),
            dataValues = _.concat(['data' + deviceId], _.map(group, 'value'));
        return [timeValues, dataValues];
    };

    const mapDataForColumns = function (data) {
        const groupedData = _.groupBy(data, 'deviceId'), columnData = _.map(groupedData, createColumns);
        return _.reduce(columnData, function (sum, current) {
            return _.concat(sum, current);
        }, []);
    };

    const chart = c3.generate({
        size: {
            height: 600
        },
        data: {
            xs: {
                data1: 'time1',
                data2: 'time2',
                data3: 'time3',
                data4: 'time4',
                data5: 'time5',
                data6: 'time6',
                data7: 'time7'
            },
            columns: []
        }
    });

    const collectData = function () {
        new Http.Get(sensorReadingGetUrl, true).start()
            .then(function (responseJson) {
                const dataWithNewValues = data.concat(JSON.parse(responseJson).data);
                data = _.uniqBy(dataWithNewValues, function(item) {
                    return item.time + item.deviceId;
                });
                chart.load({columns: mapDataForColumns(data)});
            });
    };

    setInterval(collectData, 1000);
})();