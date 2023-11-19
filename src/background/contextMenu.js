import {Config} from '..';

/**
 * @static
 * @class ContextMenu
 * @classdesc This module adds custom options to Chrome browser action context menu
 * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/ | chrome.contextMenus API}
 *
 * !!! info
 *     This feature requires `contextMenus` permission in extension manifest.
 */
export default class ContextMenu {

    /**
     * @static
     * @function
     * @memberOf ContextMenu
     * @description Initialize extension context menu
     * @example
     * ```js
     * ContextMenu.initialize();
     * ```
     */
    static initialize() {
        chrome.contextMenus.removeAll(() => Object
            .entries(Config.ContextMenuOptions)
            .map(([k, v]) => ContextMenu.generateOption(k, v)));
        chrome.contextMenus.onClicked
            .addListener(ContextMenu.contextMenuOnClick);
    }

    /**
     * @static
     * @function
     * @memberOf ContextMenu
     * @description Make context menu option.
     * @param {string} key - Option key/id.
     * @param {Object} value
     * @param {string} value.title - Option title.
     * @param {string|number} value.id - Option id.
     * @param {string|number} value.parentId - Option parent id.
     */
    static generateOption(key, {title, id, parentId}) {
        return chrome.contextMenus.create({
            title, parentId, id: (id || key), contexts: ['action']
        });
    }

    /**
     * @static
     * @function
     * @memberOf ContextMenu
     * @description Generates an absolute url for a menu option.
     * @param {Object} option
     * @param {string} option.url - URL of context menu link.
     */
    static generateUrl({url}) {
        const {short_name, homepage_url} = chrome.runtime.getManifest();
        const sanitizedSn = short_name.replace(/ /g, '');

        return url
            .replace('{hash}', `%23${sanitizedSn}`)
            .replace('{URI}', homepage_url);
    }

    /**
     * @static
     * @function
     * @memberOf ContextMenu
     * @description Handles context menu option click.
     * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/#event-onClicked | onClicked}
     * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-OnClickData | OnClickData}
     * @param {Object} info
     * @param {string|number} info.menuItemId - The ID of the menu item that was clicked.
     */
    static contextMenuOnClick({menuItemId}) {
        const option = Config.ContextMenuOptions[menuItemId];

        return !option ? false :
            chrome.tabs.create({url: ContextMenu.generateUrl(option)});
    }
}
