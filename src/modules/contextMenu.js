/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Build extension context menu and handle context menu clicks
 * * * * * * * * * * * * * * * * * * * * */

import CenteredPopup from './centeredPopup';
import {ContextMenuOptions} from '../config';

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
        // TODO: v3 manifest this will be "action"
        const CONTEXT = 'browser_action';

        window.chrome.contextMenus.removeAll(() => {
            Object.keys(ContextMenuOptions).map(key => {
                window.chrome.contextMenus.create({
                    title: window.chrome.i18n.getMessage(
                        ContextMenuOptions[key].title),
                    contexts: [CONTEXT],
                    parentId: ContextMenuOptions[key].parentId,
                    id: ContextMenuOptions[key].id || key
                });
            });
        });

        window.chrome.contextMenus.onClicked
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
        const {short_name, homepage_url} =
            window.chrome.runtime.getManifest();
        const hashtag = '%23' + ((short_name || '')
            .replace(/ /g, ''));

        return channel.url
            .replace('{hash}', hashtag)
            .replace('{URI}', homepage_url);
    }

    /**
     * @static
     * @private
     * @description Copy text value to clipboard
     * @param {String} value
     */
    static clipboardCopy(value) {
        /** @ignore */
        document.oncopy = (event) => {
            event.preventDefault();
            event.clipboardData.setData('text/plain', value);
        };
        document.execCommand('Copy', false, null);
    }

    /**
     * @static
     * @private
     * @description when user clicks on context menu option
     * @param {Object} info - click event details
     */
    static contextMenuOnClick(info) {
        const option = ContextMenuOptions[info.menuItemId];

        if (!option) return false;

        const url = ContextMenu.generateUrl(option);
        const {ww, wh} = option;

        if (option.id === ContextMenuOptions.copy.id) {
            return ContextMenu.clipboardCopy(url);
        }
        if (ww && wh) {
            return CenteredPopup.open(ww, wh, url);
        }
        return window.open(url);
    }
}
