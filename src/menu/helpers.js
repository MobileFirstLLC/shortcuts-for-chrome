import {Config} from '..';

/**
 * @static
 * @class Helpers
 * @classdesc This module contains various, static menu panel helper methods.
 */
export default class Helpers {

    /**
     * @static
     * @memberOf Helpers
     * @description Given an icon name, this function returns SVG element.
     * @param {Object} icon - One of {@type Config.SVGIcons}
     * @param {string?} className - Element class.
     * @returns {string} Icon element as HTML string.
     */
    static generateIcon(icon, className) {
        let svg = document.createElement('svg'),
            path = document.createElement('path');

        path.setAttribute('d', icon.path);
        svg.setAttribute('class', className);
        svg.setAttribute('viewBox',
            [0, 0, (icon.w || 24), (icon.h || 24)].join(' '));
        svg.appendChild(path);
        return svg.outerHTML;
    }

    /**
     * @static
     * @memberOf Helpers
     * @description Generate SVG icon for unpinned link.
     * @returns {string} Icon element as HTML.
     */
    static get unpinnedItemIcon() {
        return Helpers.generateIcon(
            Config.SVGIcons.unpinnedLink, 'pin');
    }

    /**
     * @static
     * @memberOf Helpers
     * @description Generate SVG icon for pinned link.
     * @returns {string} Icon element as HTML.
     */
    static get pinnedItemIcon() {
        return Helpers.generateIcon(
            Config.SVGIcons.activePin, 'unpin');
    }

    /**
     * @static
     * @memberOf Helpers
     * @description Sort a list of links by their localized label.
     * @param {string[]} linkList - List of links.
     * @returns {Array.<Array.<String>>} Sorted list of tuples, where
     *
     * - first element is localized label
     * - second element is the original link
     */
    static localizedSort(linkList) {
        return linkList.map(link =>
            [Helpers.translateLabel(link), link])
            .sort();
    }

    /**
     * @static
     * @memberOf Helpers
     * @description Get the translated dictionary value for some link.
     * @param {string} name - Link name (dictionary key).
     * @returns {string} Translated label.
     */
    static translateLabel(name) {
        return chrome.i18n.getMessage(
            name.replace(/[-/]/g, '_')) || name;
    }

    /**
     * @static
     * @memberOf Helpers
     * @description Create a horizontal menu divider element and append
     * it to the end of the provided panel element (in place). This method
     * returns nothing. After calling this method panel will have a divider
     * as its last DOM child.
     * @param {Element} panel - DOM element where to append the divider.
     */
    static appendDivider(panel) {
        const div = document.createElement('div');

        div.setAttribute('class', 'divider');
        panel.appendChild(div);
    }
}
