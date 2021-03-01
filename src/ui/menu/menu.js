/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Browser links menu UI and event handling
 * * * * * * * * * * * * * * * * * * * * */

import appIcons from '../../modules/appIcons.js';
import Draggable from '../../modules/dragging.js';

/**
 * Initialize menu panel instance
 * @param {function} getLinks - function that returns currently pinned/unpinned links
 * @param {function} onPinToggle - callback when pin is turned on/off
 * @param {function} onPinOrderChange - callback when pins are rearranged
 * @param {function} getRecent - function that returns recent links
 *
 * @module
 * @name Menu
 * @description Menu panel is a view that shows a list of links
 */
export default class Menu {

    /**
     * @constructor
     * @name Menu
     * @param getLinks
     * @param onPinToggle
     * @param onPinOrderChange
     * @param getRecent
     * @returns {{idAttr: string, name: string, render: (function(): Element)}}
     */
    constructor(getLinks, onPinToggle, onPinOrderChange, getRecent) {
        Menu.getLinks = getLinks;
        Menu.getRecent = getRecent;
        Menu.onPinToggle = onPinToggle;
        Menu.onPinOrderChange = onPinOrderChange;

        // return instance methods
        return {
            name: Menu.name,
            idAttr: Menu.idAttr,
            render: Menu.render
        };
    }

    /**
     * @static
     * @returns {string}
     */
    static get name() {
        return 'menu';
    }

    /**
     * @static
     * @returns {string}
     */
    static get idAttr() {
        return 'data-name';
    }

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
     * @returns {Function}
     */
    static get getLinks() {
        return this._getLinks;
    }

    static set getLinks(func) {
        this._getLinks = func;
    }

    /**
     * @static
     * @returns {Function}
     */
    static get getRecent() {
        return this._getRecent;
    }

    static set getRecent(func) {
        this._getRecent = func;
    }

    /**
     * @static
     * @returns {Function}
     */
    static get onPinToggle() {
        return this._onPinToggle;
    }

    static set onPinToggle(func) {
        this._onPinToggle = func;
    }

    /**
     * @static
     * @returns {Function}
     */
    static get onPinOrderChange() {
        return this._onPinOrderChange;
    }

    static set onPinOrderChange(func) {
        this._onPinOrderChange = func;
    }

    /**
     * @static
     * Draws the menu panel
     * @returns {Element} - DOM element
     */
    static render() {
        const panel = document.createElement('div');

        Menu.renderPinnedLinks(panel);
        Menu.renderRecentItems(panel);
        Menu.renderUnpinnedLinks(panel);
        return panel;
    };

    /**
     * @static
     * When user has some pinned items, render
     * each and make them draggable
     * @param {Element} panel - where links will be appended
     */
    static renderPinnedLinks(panel) {
        const {pinned} = Menu.getLinks();

        if (!pinned || !pinned.length) return;
        const container = document.createElement('div');

        container.id = 'pinned';
        pinned.map((link) => (
            container.appendChild(
                Menu.createLink(
                    Menu.pinnedItemIcon,
                    Menu.translateLabel(link),
                    link))
        ));
        panel.appendChild(container);
        Menu.appendDivider(panel);

        (() => new Draggable(
            Menu.idAttr,
            container,
            Menu.attachClickActions,
            Menu.onPinOrderChange))();
    }

    /**
     * @static
     * @param {Element} panel - DOM reference
     */
    static renderRecentItems(panel) {
        const recent = Menu.getRecent();

        if (!recent || !recent.length) return;
        const label = document.createElement('span');

        label.innerText = Menu.translateLabel('recently_used');
        label.classList.add('category-title');
        panel.appendChild(label);

        Menu.localizedSort(recent)
            .map(([label, link]) =>
                Menu.appendUnpinnedLink(panel, label, link));

        // add divider below
        Menu.appendDivider(panel);
    }

    /**
     * @static
     * The unpinned items will be displayed in alphabetical order (localized)
     * @param {Element} panel - DOM element where links will be added
     */
    static renderUnpinnedLinks(panel) {
        const {unpinned} = Menu.getLinks();
        let firstLetter = null;

        Menu.localizedSort(unpinned)
            .map(([label, link]) => {
                if (firstLetter && firstLetter !== label[0]) {
                    Menu.appendDivider(panel);
                }
                firstLetter = label[0];
                Menu.appendUnpinnedLink(panel, label, link);
            });
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
            [Menu.translateLabel(link), link])
            .sort();
    }

    /**
     * @static
     * bind the onclick events to a link
     * @param {Element} element - DOM node representing a link
     */
    static attachClickActions(element) {
        let name = element.getAttribute(Menu.idAttr);

        element.getElementsByTagName('span')[0].onclick =
            () => window.chrome.runtime.sendMessage({open: name});
        element.getElementsByTagName('svg')[0].onclick =
            () => Menu.onPinToggle(name);
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

    /**
     * @static
     * Create link element that can be pinned
     * @param {String} icon - icon HTML as string
     * @param {String} label - link text
     * @param {String} name - className
     * @returns {Element} - created link element
     */
    static createLink(icon, label, name) {
        const a = document.createElement('a'),
            text = document.createElement('span');

        text.innerText = label;
        a.setAttribute(Menu.idAttr, name);
        a.innerHTML = icon + text.outerHTML;
        Menu.attachClickActions(a);
        return a;
    };

    /**
     * @static
     * Create and append an unpinned link
     * @param {Element} panel - DOM node where to append link
     * @param {String} label - link text
     * @param {String} name - className
     * @returns {Element}
     */
    static appendUnpinnedLink(panel, label, name) {
        panel.appendChild(Menu.createLink(
            Menu.unpinnedItemIcon, label, name));
    }
};
