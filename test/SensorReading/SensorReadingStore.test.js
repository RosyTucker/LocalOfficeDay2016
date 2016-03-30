import {expect, sinon, PromiseHelper} from '../TestHelper';
import DatabaseClient from '../../src/DatabaseClient';
import SensorReadingStore from '../../src/SensorReading/SensorReadingStore';

describe('SensorReadingStore', () => {
    const sandbox = sinon.sandbox.create();
    const fakeDateTime = 123456789;

    let dbClient;

    beforeEach(() => {
        dbClient = {
            zadd: sinon.spy(),
            zrangebyscore: sinon.stub()
        };

        sandbox.stub(Date, 'now');
        sandbox.stub(DatabaseClient);
        Date.now.returns(fakeDateTime);
        DatabaseClient.getClient.returns(dbClient);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('putReading', () => {
        it('it should store the given reading with the current timestamp as series key', () => {
            SensorReadingStore.putReading(1, 123);
            expect(dbClient.zadd).to.have.been.calledWith('SensorReadings', fakeDateTime, JSON.stringify({
                deviceId: 1,
                value: 123
            }));
        });
    });

    describe('getReading', () => {
        it('it should return a promise with the the last 5 seconds worth records', (done) => {
            const result1 = {deviceId: 12, value: 'val'}, result2 = {deviceId: 3, value: 'meh'};
            const timeRange = 5000, expectedResult = [result1, result2];

            const getLatestReadingsPromise = SensorReadingStore.getLatestReadings(timeRange);

            expect(dbClient.zrangebyscore).to.have.been.calledWith('SensorReadings', fakeDateTime - timeRange, fakeDateTime);

            const zrangeByScoreCallback = dbClient.zrangebyscore.firstCall.args[3];

            zrangeByScoreCallback(null, [JSON.stringify(result1), JSON.stringify(result2)]);

            PromiseHelper.success(getLatestReadingsPromise, result => {
                expect(result).to.deep.equal(expectedResult);
            }, done);
        });
    });
});