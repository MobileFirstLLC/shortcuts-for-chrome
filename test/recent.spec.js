import {Config, RecentLinks, Storage} from '../src';

describe('Recently used links', function () {

    beforeEach(() => {
        global.now = Date.now();
        global.clock = sinon.useFakeTimers(global.now);
        chrome.storage.sync.get.yields({
            recent: [
                {url: 'apps', ts: global.now},
                {url: 'about', ts: global.now},
                {url: 'expired', ts: global.now - Config.recentIntervalMillis - 100}
            ]
        });
        chrome.storage.sync.set.yields(null);
    });

    afterEach(function () {
        chrome.flush();
        sandbox.restore();
        global.clock.restore();
    });

    it('It always returns a list', done => {
        RecentLinks.getRecent(result => {
            expect(Array.isArray(result)).to.equal(true);
            chrome.storage.sync.get.yields({});
            RecentLinks.getRecent(result => {
                expect(Array.isArray(result)).to.equal(true);
                chrome.storage.sync.get.yields({recent: undefined});
                RecentLinks.getRecent(result => {
                    expect(Array.isArray(result)).to.equal(true);
                    done();
                });
            });
        });
    });

    it('It returns recent items', done => {
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
