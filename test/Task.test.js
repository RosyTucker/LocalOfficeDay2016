import {expect, sinon} from './TestHelper';
import Task from '../src/Task';

describe('Task', () => {
    it('should have endpoint of task', () => {
        expect(Task.endPoint).to.equal('/task');
    });

    it('should return 200 when valid task posted', () => {
        const req = {}, res = {json: sinon.spy()};

        Task.postHandler(req, res);

        expect(res.statusCode).to.equal(200);
        expect(res.json).to.have.been.calledWith({data: {}})
    });
});