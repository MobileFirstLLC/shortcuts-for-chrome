import {AppConfig} from '../config';

/**
 * @description
 * This module adds custom options to Chrome browser action context menu
 * (right click on extension icon next to address bar). Instantiate ContextMenu
 * to activate this functionality.
 *
 * @example
 * ```
 * new ContextMenu()
 * ```
 *
 * !!! info
 *     This feature requires `contextMenus` permission in extension manifest
 *
 * @class ContextMenu
 * @kind module
 */
export default class ContextMenu {

    constructor() {
        chrome.contextMenus.removeAll(() => {
            Object.entries(AppConfig.ContextMenuOptions)
                .map(ContextMenu.generateOption);
        });
        chrome.contextMenus.onClicked
            .addListener(ContextMenu.contextMenuOnClick);
    }

    /**
     * @static
     * @private
     * @description Make context menu option.
     */
    static generateOption([key, {title, parentId, id}]) {
        return chrome.contextMenus.create({
            title, parentId, id: id || key, contexts: ['action']
        });
    }

    /**
     * @static
     * @private
     * @description Generates an absolute url for a menu option.
     * @param {string} url - url of context menu link.
     */
    static generateUrl({url}) {
        const {short_name, homepage_url} = chrome.runtime.getManifest();
        const hashtag = `%23${short_name}`.replace(/ /g, '');

        return url
            .replace('{hash}', hashtag)
            .replace('{URI}', homepage_url);
    }

    /**
     * @static
     * @private
     * @description Handles context menu option click
     * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/#event-onClicked | onClicked}
     * @param {string|number} menuItemId - The ID of the menu item that was clicked.
     */
    static contextMenuOnClick({menuItemId}) {
        const option = AppConfig.ContextMenuOptions[menuItemId];

        return (!option || !option.url) ? false :
            chrome.tabs.create({url: ContextMenu.generateUrl(option)});
    }
}
