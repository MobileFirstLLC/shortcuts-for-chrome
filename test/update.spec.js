import UpdateHandler from '../src/background/update';
import Storage from '../src/shared/storage';

describe('Update Handler', function () {

    beforeEach(() => {
        new UpdateHandler();
    });
    afterEach(function () {
        chrome.flush();
        sandbox.restore();
    });

    it('It migrates storage on update', done => {
        const stub = sandbox.stub(Storage, 'migrateStorage');
        chrome.runtime.onInstalled.dispatch({reason: 'update'});
        expect(stub.calledOnce).to.be.true;
        done();
    });

    it('It does not migrate storage on other events', done => {
        const stub = sandbox.stub(Storage, 'migrateStorage');
        chrome.runtime.onInstalled.dispatch({reason: 'install'});
        expect(stub.notCalled).to.be.true;
        done();
    });
});
