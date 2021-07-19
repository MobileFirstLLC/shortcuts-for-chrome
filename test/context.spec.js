import ContextMenu from '../src/background/contextMenu';
import {ContextMenuOptions} from '../src/config';


describe('Context Menu', () => {

    beforeEach(() => {
        chrome.runtime.getManifest.returns({
            browser_action: {},
            short_name: 'app',
            homepage_url: 'https://google.com'
        });
        document.oncopy = () => {
        };
        document.execCommand = (command) => {
        };
        chrome.contextMenus.removeAll.yields({});
        new ContextMenu();
    });

    afterEach(function () {
        chrome.flush();
        sandbox.restore();
    });

    it('It opens source code link', done => {
        expect(chrome.tabs.create.withArgs({url: ContextMenuOptions.source.url}).notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'source'});
        expect(chrome.tabs.create.withArgs({url: ContextMenuOptions.source.url}).calledOnce).to.be.true;
        done();
    });

    it('It opens social links', done => {
        expect(chrome.tabs.create.withArgs({url: ContextMenuOptions.twitter.url}).notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'twitter'});
        expect(chrome.tabs.create.calledOnce).to.be.true;
        done();
    });

});
