import chai from 'chai';
import chaiString from 'chai-string';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(chaiString);

const {expect} = chai;

const PromiseHelper = {
    success(promiseObj, expectationsFunction, doneFunction) {
        new Promise((resolve, reject) => {
            promiseObj.then(result => {
                try {
                    expectationsFunction(result);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }, () => {
                reject('Promise Rejected');
            });
        }).then(doneFunction, doneFunction);
    }
};

export {
    expect,
    sinon,
    PromiseHelper
};