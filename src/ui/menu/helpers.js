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

import {SVGIconPaths} from '../../config';

/**
 * @module
 * @name Helpers
 * @description Menu panel helper methods
 */
export default class Helpers {

    /**
     * @description UI icons
     */
    static get icons() {
        return SVGIconPaths;
    }

    /**
     * @description Given some icon name, this function returns SVG element
     * @param {Object} icon - one of `appIcons.icons`
     * @param {String?} className - element class
     * @returns {string} - icon element as HTML
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
     * @returns {string}
     */
    static get unpinnedItemIcon() {
        return Helpers.generateIcon(
            Helpers.icons.unpinnedLink, 'pin');
    }

    /**
     * @static
     * @returns {string}
     */
    static get pinnedItemIcon() {
        return Helpers.generateIcon(
            Helpers.icons.activePin, 'unpin');
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
