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
        it('it should gt the sensor readings with the scores for the last 5 seconds', () => {
            const timeRange = 5000;

            SensorReadingStore.getLatestReadings(timeRange);
            expect(dbClient.zrangebyscore).to.have.been.calledWith('SensorReadings', fakeDateTime - timeRange, fakeDateTime, 'withscores');
        });

        it('it should return a promise with the the results', (done) => {
            const dbClientResponse = [
                    JSON.stringify({deviceId: 12, value: 'val'}), 111,
                    JSON.stringify({deviceId: 3, value: 'meh'}), 112
                ],
                expectedResults = [
                    {time: 111, deviceId: 12, value: 'val'},
                    {time: 112, deviceId: 3, value: 'meh'}
                ];

            const getLatestReadingsPromise = SensorReadingStore.getLatestReadings(0),
                zrangeByScoreCallback = dbClient.zrangebyscore.firstCall.args[4];

            zrangeByScoreCallback(null, dbClientResponse);

            PromiseHelper.success(getLatestReadingsPromise, result => expect(result).to.deep.equal(expectedResults), done);
        });
    });
});