/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Helper methods for generating links menu
 * * * * * * * * * * * * * * * * * * * * */

import {SVGIcons} from '../../config';

/**
 * @module
 * @name Helpers
 * @description Menu panel helper methods
 */
export default class Helpers {

    /**
     * @description Given some icon name, this function returns SVG element
     * @param {Object} icon - one of
     * {@link https://oss.mobilefirst.me/shortcuts-for-chrome/SVGIconPaths.html|`<constants.SVGIcons>`}
     *
     * @param {String?} className - element class
     * @returns {string} icon element as HTML
     */
    static generateIcon(icon, className) {
        let svg = document.createElement('svg'),
            path = document.createElement('path');

        path.setAttribute('d', icon.d);
        svg.setAttribute('class', className);
        svg.setAttribute('viewBox',
            [0, 0, (icon.w || 24), (icon.h || 24)].join(' '));
        svg.appendChild(path);
        return svg.outerHTML;
    }

    /**
     * @static
     * @description Generate SVG icon for unpinned link.
     * @returns {string} icon element as HTML
     */
    static get unpinnedItemIcon() {
        return Helpers.generateIcon(
            SVGIcons.unpinnedLink, 'pin');
    }

    /**
     * @static
     * @description Generate SVG icon for pinned link.
     * @returns {string} icon element as HTML
     */
    static get pinnedItemIcon() {
        return Helpers.generateIcon(
            SVGIcons.activePin, 'unpin');
    }

    /**
     * @static
     * @description Sort a list of links by localized label.
     * @param {Array.<String>} linkList - list of links
     * @returns {Array.<Array.<String>>} sorted list of "tuples"
     * (String arrays of length 2) where first element is localized
     * label, second element is the original link.
     */
    static localizedSort(linkList) {
        return linkList.map(link =>
            [Helpers.translateLabel(link), link])
            .sort();
    }

    /**
     * @static
     * @description Get the translated dictionary value for some link.
     * @param {String} name - link name (dictionary key)
     * @returns {String} translated label
     */
    static translateLabel(name) {
        return chrome.i18n.getMessage(
            name.replace(/[\-\/]/g, '_')) || name;
    }

    /**
     * @static
     * @description Create a horizontal menu divider element and append
     * it to the end of the provided panel element (in place). This method
     * returns nothing. After calling this method panel will have a divider
     * as its last DOM child.
     * @param {Element} panel DOM element where to append the divider
     */
    static appendDivider(panel) {
        const div = document.createElement('div');

        div.setAttribute('class', 'divider');
        panel.appendChild(div);
    };

};
