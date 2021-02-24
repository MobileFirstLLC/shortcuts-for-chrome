import ContextMenu from '../src/modules/contextMenu';
import BackgroundApi from '../src/modules/backgroundApi';

describe('Context Menu', function () {

    before(function () {
        window.chrome.runtime.getManifest.returns({
            browser_action: {}, homepage_url: 'https://google.com'
        });
    });
    beforeEach(() => {
        new ContextMenu();
    });
    afterEach(function () {
        chrome.flush();
        sandbox.restore();
    });
    after(function () {
    });
});

describe('Background API', function () {

    before(function () {
    });
    beforeEach(() => {
    });
    afterEach(function () {
        chrome.flush();
        sandbox.restore();
    });
    after(function () {
    });

});
