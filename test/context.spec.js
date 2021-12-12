import {Background, Config} from '../src';
import ContextMenu from '../src/background/contextMenu';

const manifest = require('../src/manifest.json');
const {ContextMenuOptions} = Config;

describe('Context Menu', () => {

    beforeEach(() => {
        chrome.runtime.getManifest.returns(manifest);
        chrome.contextMenus.removeAll.yields({});
        new Background();
    });

    afterEach(function () {
        chrome.flush();
        sandbox.restore();
    });

    it('It opens source code link', () => {
        const args = {url: ContextMenuOptions.source.url};
        expect(chrome.tabs.create.withArgs(args).notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'source'});
        expect(chrome.tabs.create.withArgs(args).calledOnce).to.be.true;
    });

    it('It opens social links', () => {
        const url = ContextMenu.generateUrl(ContextMenuOptions.twitter);
        expect(chrome.tabs.create.withArgs({url}).notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'twitter'});
        expect(chrome.tabs.create.withArgs({url}).calledOnce).to.be.true;
    });

    it('It ignores invalid click', () => {
        expect(chrome.tabs.create.notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'invalid'});
        expect(chrome.tabs.create.notCalled).to.be.true;
    });

});
