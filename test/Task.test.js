import {expect, sinon} from './TestHelper';
import Task from '../src/Task';
import TaskStore from '../src/TaskStore';

const request = (destination, type) => {
    return {
        body: {destination: destination, type: type}
    };
};

describe('Task', () => {
    const sandbox = sinon.sandbox.create();
    let response;

    beforeEach(() => {
        response = {json: sinon.spy()};
        sandbox.stub(TaskStore);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should have endpoint of task', () => {
        expect(Task.endPoint).to.equal('/task');
    });

    describe('POST', () => {
        it('should return 200 and store the task when valid task posted for LDN', () => {
            Task.postHandler(request('LDN', 1), response);

            expect(response.statusCode).to.equal(200);
            expect(response.json).to.have.been.calledWith({data: {}});
            expect(TaskStore.putTask).to.have.been.calledWithMatch({destination: 'LDN', type: 1});
        });

        it('should return 200 when valid task posted for MCR', () => {
            Task.postHandler(request('MCR', 2), response);

            expect(response.statusCode).to.equal(200);
            expect(response.json).to.have.been.calledWith({data: {}});
            expect(TaskStore.putTask).to.have.been.calledWithMatch({destination: 'MCR', type: 2});
        });

        it('should return 400 when no request body sent', () => {
            Task.postHandler({}, response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Task must have a destination and type'}});
            expect(TaskStore.putTask).to.not.have.been.called;
        });

        it('should return 400 when task posted with invalid destination', () => {
            Task.postHandler(request('NYC', 1), response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Invalid task destination: NYC'}});
            expect(TaskStore.putTask).to.not.have.been.called;
        });

        it('should return 400 when task posted with no destination', () => {
            Task.postHandler({body: {}}, response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Task must have a destination and type'}});
            expect(TaskStore.putTask).to.not.have.been.called;
        });

        it('should return 400 when task posted with no type', () => {
            Task.postHandler({body: {destination: 'LDN'}}, response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Task must have a destination and type'}});
            expect(TaskStore.putTask).to.not.have.been.called;
        });

        it('should return 400 when task posted with invalid type', () => {
            Task.postHandler(request('LDN', 'String'), response);

            expect(response.statusCode).to.equal(400);
            expect(response.json).to.have.been.calledWith({data: {error: 'Task type must be a number'}});
            expect(TaskStore.putTask).to.not.have.been.called;
        });
    });

    describe('GET', () => {
        it('should return 200 ', () => {
            TaskStore.getTask.returns({destination: 'MyDestination', type: 12});

            Task.getHandler({}, response);

            expect(response.statusCode).to.equal(200);
            expect(response.json).to.have.been.calledWith({data: {destination: 'MyDestination', type: 12}});
        });
    });
});