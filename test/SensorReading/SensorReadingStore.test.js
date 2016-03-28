import {expect, sinon} from '../TestHelper';
import DatabaseClient from '../../src/DatabaseClient';
import SensorReadingStore from '../../src/SensorReading/SensorReadingStore';

describe('SensorReadingStore', () => {
    const sandbox = sinon.sandbox.create();
    const fakeDateTime = 123456789;

    let dbClient;

    beforeEach(() => {
        dbClient = {
            hset: sinon.spy()
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
        it('it should store the given reading with the current timestamp as key', () => {
            SensorReadingStore.putReading(1, 123);
            expect(dbClient.hset).to.have.been.calledWith(fakeDateTime, 1, 123);
        });
    });
});