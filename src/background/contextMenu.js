import {Config} from '..';

/**
 * @class ContextMenu
 *
 * @classdesc The ContextMenu class adds custom options to the browser
 * action's context menu (the "right-click" menu). The context menu
 * setup must be run in the extension's background context.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/ | chrome.contextMenus}
 *
 * !!! info "Required Permissions"
 *     This feature requires `contextMenus` permission in extension
 *     manifest.
 *
 */
export default class ContextMenu {

    /**
     * @static
     * @function
     * @memberOf ContextMenu
     *
     * @description
     * This method creates a context menu based on a configuration
     * defined in [`Config.ContextMenuOptions`](#config-object).
     *
     * !!! example "Initializes a context menu"
     *     ```js linenums="0"
     *     import ContextMenu from 'contextMenu.js';
     *
     *     ContextMenu.initialize();
     *     ```
     */
    static initialize() {
        chrome.contextMenus.removeAll(() => Object
            .entries(Config.ContextMenuOptions)
            .map(([k, v]) =>
                ContextMenu.generateOption(k, v)));
        chrome.contextMenus.onClicked
            .addListener(ContextMenu.contextMenuOnClick);
    }

    /**
     * @static
     * @private
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
     * @private
     * @function
     * @memberOf ContextMenu
     * @description Generates an absolute url for a menu option.
     * @param {string} url - URL of context menu link.
     */
    static generateUrl(url) {
        const {short_name, homepage_url} = chrome.runtime.getManifest();
        const sanitizedSn = short_name.replace(/ /g, '');
        return url
            .replace('{hash}', `%23${sanitizedSn}`)
            .replace('{URI}', homepage_url);
    }

    /**
     * @static
     * @private
     * @function
     * @memberOf ContextMenu
     * @description Handles context menu option click.
     * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/#event-onClicked | onClicked}
     * @param {Object} info
     * @param {string|number} info.menuItemId - The ID of the menu item
     * that was clicked.
     */
    static contextMenuOnClick({menuItemId}) {
        const option = Config.ContextMenuOptions[menuItemId];
        if (option) {
            const url = ContextMenu.generateUrl(option.url);
            return chrome.tabs.create({url: url});
        }
    }
}
