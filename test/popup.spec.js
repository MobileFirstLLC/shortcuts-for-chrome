import Popup from '../src/popup/popup';
import Storage from '../src/shared/storage';

describe('Popup Window', function () {

    before(function () {
        global.popup = null;
        global.getLink = (n) => {
            return document.getElementsByTagName('a')[n || 0];
        };
        global.getLinkText = (link) => {
            return link.getElementsByTagName('span')[0];
        };
        global.getLinkName = (link) => {
            return link.getAttribute('data-name');
        };
        global.getLinkPin = (link) => {
            return link.getElementsByTagName('svg')[0];
        };
        global.SimulateDragEvent = function (el, type) {
            const createTransferEvent = (type) => {
                const ev = new window.CustomEvent(type, {});
                ev.dataTransfer = {
                    effectAllowed: () => {
                    },
                    setData: () => {
                    },
                    getData: () => {
                        return el.outerHTML;
                    }
                };
                return ev;
            };
            el.dispatchEvent(createTransferEvent(type));
        };
    });

    beforeEach(() => {
        chrome.storage.sync.get.yields({
            pinned: ['about', 'history', 'crashes'],
            recent: [
                {url: 'apps', ts: Date.now() + 500},
                {url: 'about', ts: Date.now() - 500}
            ]
        });
        sandbox.spy(Storage, 'save');
        global.popup = new Popup();
    });

    afterEach(function () {
        chrome.flush();
        sandbox.restore();
    });

    after(function () {
        delete global.popup;
        delete global.getLink;
        delete global.getLinkName;
        delete global.getLinkPin;
        delete global.getLinkText;
        delete global.SimulateDragEvent;
    });

    it('Menu panel initializes when empty storage', () => {
        chrome.storage.sync.get.yields({});
        expect(() => {
            new Popup();
        }, 'empty storage').to.not.throw();
        expect(Popup.getLinks().pinned, 'no pinned items').to.have.length(0);
    });

    it('Menu panel initializes when empty pinned list', () => {
        chrome.storage.sync.get.yields({pinned: []});
        expect(() => {
            new Popup();
        }, 'no pinned items').to.not.throw();
        expect(Popup.getLinks().pinned, 'no pinned items').to.have.length(0);
    });

    it('Menu panel initializes with pinned items', () => {
        expect(() => {
            new Popup();
        }, 'some pinned items').to.not.throw();
        expect(Popup.getLinks().pinned, '3 pinned items').to.have.length(3);
    });

    it('Pin click toggles link on and off', () => {
        chrome.storage.sync.set.yields(null);
        let link = getLink(0),
            name = getLinkName(link),
            pin = getLinkPin(link);

        expect(Popup.getLinks().pinned, 'pinned').to.contain(name);
        pin.onclick();
        expect(Popup.getLinks().pinned, 'not pinned after 1 click').to.not.contain(name);
        pin.onclick();
        expect(Popup.getLinks().pinned, 'pinned after 2nd click').to.contain(name);
    });

    it('Clicking link text opens a tab', () => {
        let link = getLink(0),
            label = getLinkText(link),
            url = getLinkName(link);
        expect(chrome.runtime.sendMessage.withArgs({open: url}).notCalled, 'before click').to.be.true;
        label.onclick();
        expect(chrome.runtime.sendMessage.withArgs({open: url}).calledOnce, 'after click').to.be.true;
    });

    describe('Link dragging', () => {

        it('Hover over elements and drop outside area', (done) => {
            let firstLink = getLink(0),
                secondLink = getLink(1),
                thirdLink = getLink(2);

            expect(Storage.save.notCalled, 'before drag').to.be.true;
            expect(() => {
                SimulateDragEvent(secondLink, 'dragstart');
                SimulateDragEvent(secondLink, 'dragover');  // move over self
                SimulateDragEvent(secondLink, 'dragleave');
                SimulateDragEvent(firstLink, 'dragover');  // move to before self
                SimulateDragEvent(firstLink, 'dragleave');
                SimulateDragEvent(thirdLink, 'dragover');  // move to after self
                SimulateDragEvent(thirdLink, 'dragleave');
                SimulateDragEvent(secondLink, 'dragend'); // drop outside
            }).to.not.throw();
            setTimeout(() => {
                expect(Storage.save.notCalled, 'no drop event occured').to.be.true;
                done();
            }, 10);
        });

        it('Drag/drop on self', (done) => {
            let firstLink = getLink(0);

            expect(Storage.save.notCalled, 'before drag').to.be.true;
            expect(() => {
                SimulateDragEvent(firstLink, 'dragstart');
                SimulateDragEvent(firstLink, 'drop');
            }).to.not.throw();
            setTimeout(() => {
                expect(Storage.save.calledOnce, 'drop callback fired').to.be.true;
                done();
            }, 10);
        });

        it('Drag/drop with order change > move before to after', (done) => {
            let firstLink = getLink(0),
                secondLink = getLink(1);

            expect(Storage.save.notCalled, 'before drag').to.be.true;
            expect(() => {
                SimulateDragEvent(firstLink, 'dragstart');
                SimulateDragEvent(secondLink, 'drop');
            }).to.not.throw();
            setTimeout(() => {
                expect(Storage.save.calledOnce, 'drop callback fired').to.be.true;
                done();
            }, 10);
        });

        it('Drag/drop with order change > move after to before', (done) => {
            let firstLink = getLink(0),
                secondLink = getLink(1);

            expect(Storage.save.notCalled, 'before drag').to.be.true;
            expect(() => {
                SimulateDragEvent(secondLink, 'dragstart');
                SimulateDragEvent(firstLink, 'drop');
            }).to.not.throw();
            setTimeout(() => {
                expect(Storage.save.calledOnce, 'drop callback fired').to.be.true;
                done();
            }, 10);
        });
    });
});
