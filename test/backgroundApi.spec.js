import BackgroundApi from '../src/modules/backgroundApi';
import RecentLinks from '../src/modules/recent';

describe('Background API', function () {

    beforeEach(() => {
        new BackgroundApi();
    });

    it('It opens tab on request', done => {
        expect(chrome.tabs.create.notCalled).to.be.true;
        chrome.runtime.onMessage.dispatch({open: 'history'});
        expect(chrome.tabs.create.withArgs({url: 'chrome://history'}).calledOnce).to.be.true;
        done();
    });

    it('It adds opened links to recent links', done => {
        const stub = sandbox.stub(RecentLinks, 'addRecent');
        chrome.runtime.onMessage.dispatch({open: 'about'});
        expect(stub.withArgs('about').calledOnce).to.be.true;
        done();
    });

    it('It disregards messages without open', done => {
        expect(chrome.tabs.create.notCalled).to.be.true;
        chrome.runtime.onMessage.dispatch({send: 'message'});
        expect(chrome.tabs.create.notCalled).to.be.true;
        done();
    });
});
