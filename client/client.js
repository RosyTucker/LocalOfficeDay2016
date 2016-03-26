import request from 'request';

const baseUrl = 'https://hackworks-challenge.herokuapp.com',
    typeSequence = [1, 2, 3, 4, 5],
    destinationSequence = ['LDN'];

const sleep = (millis) => {
    const endTime = new Date().getTime() + millis;

    while (new Date().getTime() <= endTime) ;
};

const postTask = (destination, type) => {
    return new Promise((resolve) => {
        request({
            url: `${baseUrl}/task`,
            method: 'POST',
            json: {"destination": destination, "type": type}
        }, (error, resp, body) => {
            resolve(resp.statusCode, body);
        });
    });
};

const loop = (currentType, currentDestination) => {
    const chosenType = typeSequence[currentType], chosenDestination = destinationSequence[currentDestination];
    console.log('Posting: ', chosenDestination, chosenType);

    postTask(chosenDestination, chosenType).then((statusCode, body) => {
        console.log('Status Code:', statusCode, 'Body:', body);
        sleep(2500);
        const nextType = (currentType + 1) % typeSequence.length,
            nextDestination = (currentDestination + 1) % destinationSequence.length;
        loop(nextType, nextDestination);
    });
};

loop(0, 0);