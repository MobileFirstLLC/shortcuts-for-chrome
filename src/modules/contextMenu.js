/** * * * * * * * * * * * * * * * * * * * *
 *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Extension context menu
 *
 * * * * * * * * * * * * * * * * * * * * */


import CenteredPopup from './centeredPopup';
import {ContextMenuOptions} from '../config';

/**
 * This module adds custom options to chrome browser action context menu
 * (right click on extension icon next to address bar). `contextMenus` permissions
 * is required in`manifest.json`.
 * @module
 * @name ContextMenu
 */
export default class ContextMenu {

    /**
     * Initialize the context menu
     *
     * @name ContextMenu
     */
    constructor() {
        const manifest = window.chrome.runtime.getManifest(),
            CONTEXT = manifest['page_action'] ?
                'page_action' : 'browser_action';

        window.chrome.contextMenus.removeAll(() => {
            Object.keys(ContextMenu.options).map(key => {
                window.chrome.contextMenus.create({
                    title: ContextMenu.label(ContextMenu.options[key].title),
                    contexts: [CONTEXT],
                    parentId: ContextMenu.options[key].parentId,
                    id: ContextMenu.options[key].id || key
                });
            });
        });

        window.chrome.contextMenus.onClicked
            .addListener(ContextMenu.contextMenuOnClick);
    }

    /**
     * @description List of all available share options
     * @returns {Object}
     */
    static get options() {
        return ContextMenuOptions;
    }

    /**
     * @returns Object
     * @param {string} key - i18n dictionary key
     */
    static label(key) {
        return window.chrome.i18n.getMessage(key) || '';
    }

    /**
     * @function
     * @description Constructs absolute shareable url then calls the callback function
     * @param {Object} channel - one of `share.options`
     * has been resolved. The first param of the callback function is the full url returned by this function.
     */
    static generateUrl(channel) {
        const manifest = window.chrome.runtime.getManifest();

        return channel.url
            .replace('{hash}', '%23' + ((manifest.short_name || '')
                .replace(/ /g, '')))
            .replace('{URI}', manifest.homepage_url);
    }

    /**
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
     * @private
     * @description when user clicks on context menu option
     * @param {Object} info - click event details
     */
    static contextMenuOnClick(info) {
        const option = ContextMenu.options[info.menuItemId];

        if (!option) return false;

        const url = ContextMenu.generateUrl(option);
        const {ww, wh} = option;

        if (option.id === ContextMenu.options.copy.id) {
            return ContextMenu.clipboardCopy(url);
        }
        if (ww && wh) {
            return CenteredPopup.open(ww, wh, url);
        }
        return window.open(url);
    }
}
