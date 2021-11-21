import BackgroundApi from '../src/background/api';
import RecentLinks from '../src/shared/recent';

describe('Background API', function () {

    beforeEach(() => {
        new BackgroundApi();
    });
    afterEach(function () {
        chrome.flush();
        sandbox.restore();
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
