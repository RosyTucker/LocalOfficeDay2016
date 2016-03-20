import {expect, sinon} from './TestHelper';
import Task from '../src/Task';


const request = (destination, type) => {
    return {
        body: {destination: destination, type: type}
    };
};

describe('Task', () => {
    let response;

    beforeEach(() => {
        response = {json: sinon.spy()};
    });

    it('should have endpoint of task', () => {
        expect(Task.endPoint).to.equal('/task');
    });

    it('should return 200 when valid task posted for LDN', () => {
        Task.postHandler(request('LDN', 1), response);

        expect(response.statusCode).to.equal(200);
        expect(response.json).to.have.been.calledWith({data: {}});
    });

    it('should return 200 when valid task posted for MCR', () => {
        Task.postHandler(request('MCR', 2), response);

        expect(response.statusCode).to.equal(200);
        expect(response.json).to.have.been.calledWith({data: {}});
    });

    it('should return 400 when task posted with invalid destination', () => {
        Task.postHandler(request('NYC', 1), response);

        expect(response.statusCode).to.equal(400);
        expect(response.json).to.have.been.calledWith({data: {error: 'Invalid task destination: NYC'}});
    });

    it('should return 400 when task posted with no destination', () => {
        Task.postHandler({body: {}}, response);

        expect(response.statusCode).to.equal(400);
        expect(response.json).to.have.been.calledWith({data: {error: 'Task must have a destination and type'}});
    });

    it('should return 400 when task posted with no type', () => {
        Task.postHandler({body: {destination: 'LDN'}}, response);

        expect(response.statusCode).to.equal(400);
        expect(response.json).to.have.been.calledWith({data: {error: 'Task must have a destination and type'}});
    });

    it('should return 400 when task posted with invalid type', () => {
        Task.postHandler(request('LDN', 'String'), response);

        expect(response.statusCode).to.equal(400);
        expect(response.json).to.have.been.calledWith({data: {error: 'Task type must be a number'}});
    });
});