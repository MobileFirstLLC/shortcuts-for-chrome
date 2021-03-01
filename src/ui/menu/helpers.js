/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Helper methods for links menu
 * * * * * * * * * * * * * * * * * * * * */

import appIcons from '../../modules/appIcons.js';

/**
 * @module
 * @name Helpers
 * @description Menu panel helper methods
 */
export default class Helpers {

    /**
     * @static
     * @returns {string}
     */
    static get unpinnedItemIcon() {
        return appIcons.generateIcon(
            appIcons.icons.addPin, 'pin');
    }

    /**
     * @static
     * @returns {string}
     */
    static get pinnedItemIcon() {
        return appIcons.generateIcon(
            appIcons.icons.removePin, 'unpin');
    }

    /**
     * @static
     * Sort a list of links yby localized label
     * @param {Array.<String>} linkList - list of links
     * @returns - sorted list where first
     * element is localized label, second element is
     * the original link
     */
    static localizedSort(linkList) {
        return linkList.map(link =>
            [Helpers.translateLabel(link), link])
            .sort();
    }

    /**
     * @static
     * Get the translated dictionary value for some link
     * @param {String} name - link name (dictionary key)
     */
    static translateLabel(name) {
        return window.chrome.i18n.getMessage(
            name.replace(/[\-\/]/g, '_')) || name;
    }

    /**
     * @static
     * Create a horizontal menu divider element
     * @param {Element} panel - DOM element where to append the divider
     */
    static appendDivider(panel) {
        const div = document.createElement('div');

        div.setAttribute('class', 'divider');
        panel.appendChild(div);
    };

};
