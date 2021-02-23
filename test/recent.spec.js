import {AppConfig} from '../src/config';
import RecentLinks from '../src/modules/recent';
import Storage from '../src/modules/storage';

describe('Recent links', function () {

    before(function () {
    });
    beforeEach(() => {
        global.now = Date.now();
        global.clock = sinon.useFakeTimers(global.now);
        chrome.storage.sync.get.yields({
            recent: [
                {url: 'apps', ts: global.now},
                {url: 'about', ts: global.now},
                {url: 'expired', ts: global.now - AppConfig.recentIntervalMillis - 100}
            ]
        });
        chrome.storage.sync.set.yields(null);
    });

    afterEach(function () {
        chrome.flush();
        sandbox.restore();
        global.clock.restore();
    });

    after(function () {
    });

    it('It returns pinned items', done => {
        RecentLinks.getRecent(result => {
            expect(result).to.contain('apps');
            expect(result).to.contain('about');
            done();
        });
    });

    it('It does not return expired items', done => {
        RecentLinks.getRecent(result => {
            expect(result).to.not.contain('expired');
            done();
        });
    });

    it('It updates existing item timestamp', done => {
        const stub = sandbox.stub(Storage, 'save');
        const objectMatcher = sinon.match([{url: 'about', ts: global.now}]);

        chrome.storage.sync.get.yields({recent: [{url: 'about', ts: global.now - 1}]});
        RecentLinks.addRecent('about');

        expect(objectMatcher.test(stub.getCall(0).args[1])).to.be.true;
        done();
    });

    it('It doesn\'t change non-matching existing items', done => {
        const stub = sandbox.stub(Storage, 'save');
        const targetObject = {url: 'apps', ts: global.now};
        const objectMatcher = sinon.match.array.contains([targetObject]);

        chrome.storage.sync.get.yields({recent: [targetObject]});
        RecentLinks.addRecent('other');

        expect(objectMatcher.test(stub.getCall(0).args[1])).to.be.true;
        done();
    });

    it('Adds new items on add', done => {
        const stub = sandbox.stub(Storage, 'save');
        const newObject = {url: 'other'};
        const objectMatcher = sinon.match.array.deepEquals(
            [{url: 'other', ts: global.now}]);

        chrome.storage.sync.get.yields({recent: null});
        RecentLinks.addRecent(newObject.url, _ => false);
        expect(objectMatcher.test(stub.getCall(0).args[1])).to.be.true;
        done();
    });

});
