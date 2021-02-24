import ContextMenu from '../src/modules/contextMenu';
import {ContextMenuOptions} from '../src/config';

class DisplayStub {
    getInfo(callback) {
        callback([{workArea: {width: 1920, height: 1024}}]);
    }
}

describe('Context Menu', function () {

    beforeEach(() => {
        window.chrome.runtime.getManifest.returns({
            browser_action: {},
            short_name: 'app',
            homepage_url: 'https://google.com'
        });
        document.oncopy = () => {};
        document.execCommand = (command) => {};
        window.chrome.system.display = new DisplayStub();
        window.chrome.contextMenus.removeAll.yields({});
        new ContextMenu();
    });

    it('It opens source code link', done => {
        const stub = sandbox.stub(window, 'open');
        expect(stub.notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'source'});
        expect(stub.withArgs(ContextMenuOptions.source.url).calledOnce).to.be.true;
        done();
    });

    it('It opens social links', done => {
        expect(chrome.windows.create.notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'twitter'});
        expect(chrome.windows.create.calledOnce).to.be.true;
        done();
    });

    it('It copies URL to clipboard', done => {
        const stub = sandbox.stub(document, 'execCommand');
        expect(stub.notCalled).to.be.true;
        chrome.contextMenus.onClicked.dispatch({menuItemId: 'copy'});
        expect(stub.calledOnce).to.be.true;
        done();
    });

});
