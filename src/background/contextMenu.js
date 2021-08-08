import {AppConfig} from '../config';

/**
 * @description
 * This module adds custom options to chrome browser action context menu
 * (right click on extension icon next to address bar). `contextMenus`
 * permissions is required in`manifest.json`. Instantiate `new ContextMenu()`
 * to activate this functionality.
 *
 * @module
 * @name ContextMenu
 */
export default class ContextMenu {

    /**
     * @description Initialize the context menu
     * @constructor
     * @name ContextMenu
     */
    constructor() {
        const {ContextMenuOptions} = AppConfig;

        chrome.contextMenus.removeAll(() => {
            Object.keys(ContextMenuOptions).map(key => {
                chrome.contextMenus.create({
                    title: ContextMenuOptions[key].title,
                    contexts: ['action'],
                    parentId: ContextMenuOptions[key].parentId,
                    id: ContextMenuOptions[key].id || key
                });
            });
        });

        chrome.contextMenus.onClicked
            .addListener(ContextMenu.contextMenuOnClick);
    }

    /**
     * @static
     * @private
     * @function
     * @description Constructs absolute shareable url then calls the
     * callback function
     * @param {Object} channel - one of `share.options`
     * has been resolved. The first param of the callback function is the
     * full url returned by this function.
     */
    static generateUrl(channel) {
        const {short_name, homepage_url} = chrome.runtime.getManifest();
        const hashtag = `%23${short_name}`.replace(/ /g, '');

        return channel.url
            .replace('{hash}', hashtag)
            .replace('{URI}', homepage_url);
    }

    /**
     * @static
     * @private
     * @description when user clicks on context menu option
     * @param {Object} info - click event details
     */
    static contextMenuOnClick(info) {
        const option = AppConfig.ContextMenuOptions[info.menuItemId];

        if (!option) return false;

        const url = ContextMenu.generateUrl(option);

        return chrome.tabs.create({url});
    }
}
