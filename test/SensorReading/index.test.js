import {expect, sinon} from '../TestHelper';
import SensorReading from '../../src/SensorReading';
import SensorReadingStore from '../../src/SensorReading/SensorReadingStore';

const request = (deviceId, value) => {
    return {
        body: {deviceId: deviceId, value: value}
    };
};

describe('SensorReading', () => {
    const sandbox = sinon.sandbox.create();
    let response;

    beforeEach(() => {
        response = {json: sinon.spy()};
        sandbox.stub(SensorReadingStore);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should have endpoint of sensorReading', () => {
        expect(SensorReading.endPoint).to.equal('/sensorReading');
    });

    describe('POST', () => {
        it('should return 200 and store the reading when valid sensor reading posted', () => {
            SensorReading.postHandler(request(1, 123), response);

            expect(response.statusCode).to.equal(200);
            expect(response.json).to.have.been.calledWith({data: {}});
            expect(SensorReadingStore.putReading).to.have.been.calledWithMatch(1, 123);
        });

        it('should return 400 when no request body sent', () => {
            SensorReading.postHandler({}, response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Sensor reading must have a deviceId and a value'}});
            expect(SensorReadingStore.putReading).to.not.have.been.called;
        });

        it('should return 400 when task posted with no deviceId', () => {
            SensorReading.postHandler({body: {value: 123}}, response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Sensor reading must have a deviceId and a value'}});
            expect(SensorReadingStore.putReading).to.not.have.been.called;
        });

        it('should return 400 when task posted with no value', () => {
            SensorReading.postHandler({body: {deviceId: 123}}, response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Sensor reading must have a deviceId and a value'}});
            expect(SensorReadingStore.putReading).to.not.have.been.called;
        });

        it('should return 400 when task posted with invalid deviceId', () => {
            SensorReading.postHandler(request('not a number', 123), response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Sensor reading must have a numeric deviceId and value'}});
            expect(SensorReadingStore.putReading).to.not.have.been.called;
        });

        it('should return 400 when task posted with invalid value', () => {
            SensorReading.postHandler(request(2, 'not a number'), response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Sensor reading must have a numeric deviceId and value'}});
            expect(SensorReadingStore.putReading).to.not.have.been.called;
        });
    });

    // describe('GET', () => {
    //    it('', () => {
    //    });
    // });
});