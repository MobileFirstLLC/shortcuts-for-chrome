import CenteredPopup from './centeredPopup';
import Share from './share';

/**
 * @class
 * @classdesc This module adds custom options to chrome browser action context menu
 * (right click on extension icon next to address bar). `contextMenus` permissions
 * is required in`manifest.json`.
 */
class ContextMenu {

    /**
     * @description Initialize the context menu
     */
    constructor() {
        const manifest = window.chrome.runtime.getManifest(),
            CONTEXT = manifest['page_action'] ?
                'page_action' : 'browser_action';

        window.chrome.contextMenus.removeAll(() => {
            Object.keys(Share.options).map(key => {
                window.chrome.contextMenus.create({
                    title: Share.label(Share.options[key].title),
                    contexts: [CONTEXT],
                    id: key
                });
            });
        });

        window.chrome.contextMenus.onClicked.addListener(ContextMenu.contextMenuOnClick);
    }

    /**
     * @private
     * @description when user clicks on context menu option
     * @param {Object} info - click event details
     */
    static contextMenuOnClick(info) {
        Object.keys(Share.options)
            .filter(function (key) {
                return (key === info.menuItemId);
            })
            .map(function (key) {
                let c = Share.options[key];

                return Share.onClick(c, (url) => {
                    (c.ww && c.wh) ?
                        CenteredPopup.open(c.ww, c.wh, url) :
                        window.open(url);
                });
            });
    }
}

export default ContextMenu;
