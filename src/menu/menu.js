import Draggable from './dragging.js';
import Helpers from './helpers';

/**
 * Initialize menu panel instance
 * @param {function} getLinks - function that returns currently pinned/unpinned links
 * @param {function} onPinToggle - callback when pin is turned on/off
 * @param {function} onPinOrderChange - callback when pins are rearranged
 * @param {function} getRecent - function that returns recent links
 *
 * @module
 * @name Menu
 * @description Menu panel is a DOM elements that shows a list of links.
 * This menu panel is drawn dynamically by creating all menu
 * elements programmatically upon calling `menuObj.render()`. The
 * parent instantiating the menu will call render. Parent must then
 * add the returned menu to DOM tree to display it to user.
 */
export default class Menu {

    /**
     * @constructor
     * @name Menu
     * @param {function} getLinks - function that returns all links
     * @param {function} onPinToggle - callback function for when link is pinned/unpinned
     * @param {function} onPinOrderChange - callback function for when links are re-ordered
     * @param {function} getRecent - function that returns list of recent links
     * @returns {{idAttr: string, name: string, render: (function(): Element)}} - Menu panel reference
     */
    constructor(getLinks, onPinToggle, onPinOrderChange, getRecent) {
        Menu.getLinks = getLinks;
        Menu.getRecent = getRecent;
        Menu.onPinToggle = onPinToggle;
        Menu.onPinOrderChange = onPinOrderChange;

        // return public instance methods
        // that are callable from outside this class
        return {
            name: Menu.name,
            idAttr: Menu.idAttr,
            render: Menu.render
        };
    }

    /**
     * @public
     * @static
     * @description name of this menu view
     * @returns {string}
     */
    static get name() {
        return 'menu';
    }

    /**
     * @public
     * @static
     * @description DOM attribute for getting the unique id of a link
     * @returns {string}
     */
    static get idAttr() {
        return 'data-name';
    }

    /**
     * @private
     * @static
     * @description
     * Function that menu will call to get all links.
     * This function is specified at instantiation.
     * @returns {Function}
     */
    static get getLinks() {
        return this._getLinks;
    }

    static set getLinks(func) {
        this._getLinks = func;
    }

    /**
     * @private
     * @static
     * @description
     * Function that menu will call to get recent items.
     * This function is specified at instantiation.
     * @returns {Function}
     */
    static get getRecent() {
        return this._getRecent;
    }

    static set getRecent(func) {
        this._getRecent = func;
    }

    /**
     * @private
     * @static
     * @description
     * Callback function when item is pinned or unpinned.
     * This callback is specified at instantiation.
     * @returns {Function}
     */
    static get onPinToggle() {
        return this._onPinToggle;
    }

    static set onPinToggle(func) {
        this._onPinToggle = func;
    }

    /**
     * @private
     * @static
     * @description
     * Callback function when pin order is changed. This callback
     * is specified at instantiation.
     * @returns {Function}
     */
    static get onPinOrderChange() {
        return this._onPinOrderChange;
    }

    static set onPinOrderChange(func) {
        this._onPinOrderChange = func;
    }

    /**
     * @public
     * @static
     * @description Programmatically draws the menu panel and its links
     * @returns {Element} - DOM element representing the menu.
     */
    static render() {
        const panel = document.createElement('div');

        Menu.renderPinnedLinks(panel);
        Menu.renderRecentItems(panel);
        Menu.renderUnpinnedLinks(panel);
        return panel;
    };

    /**
     * @private
     * @static
     * @description
     * When user has some pinned items, render each and make them draggable
     * @param {Element} panel - DOM element where links will be appended
     */
    static renderPinnedLinks(panel) {
        const {pinned} = Menu.getLinks();

        if (!pinned || !pinned.length) return;
        const container = document.createElement('div');

        container.id = 'pinned';
        pinned.map((link) => (
            container.appendChild(
                Menu.createLink(
                    Helpers.pinnedItemIcon,
                    Helpers.translateLabel(link),
                    link))
        ));
        panel.appendChild(container);
        Helpers.appendDivider(panel);

        (() => new Draggable(
            Menu.idAttr,
            container,
            Menu.attachClickActions,
            Menu.onPinOrderChange))();
    }

    /**
     * @private
     * @static
     * @description
     * If user has recently clicked on some unpinned link, render
     * them in this special section. Recent items will expire after
     * enough time has elapsed since user clicked on the link.
     * @param {Element} panel - DOM element where links will be appended
     */
    static renderRecentItems(panel) {
        const recent = Menu.getRecent();

        if (!recent || !recent.length) return;
        const label = document.createElement('span');

        label.innerText = Helpers.translateLabel('ui_recently_used');
        label.classList.add('category-title');
        panel.appendChild(label);

        Helpers.localizedSort(recent)
            .map(([label, link]) =>
                Menu.appendUnpinnedLink(panel, label, link));

        // add divider below
        Helpers.appendDivider(panel);
    }

    /**
     * @private
     * @static
     * @description
     * The unpinned items will be displayed in alphabetical order (localized)
     * @param {Element} panel - DOM element where links will be appended
     */
    static renderUnpinnedLinks(panel) {
        const {unpinned} = Menu.getLinks();
        let firstLetter = null;

        Helpers.localizedSort(unpinned)
            .map(([label, link]) => {
                if (firstLetter && firstLetter !== label[0]) {
                    Helpers.appendDivider(panel);
                }
                firstLetter = label[0];
                Menu.appendUnpinnedLink(panel, label, link);
            });
    }

    /**
     * @private
     * @static
     * @description
     * bind the onclick events to a link
     * @param {Element} element - DOM node representing a link
     */
    static attachClickActions(element) {
        let name = element.getAttribute(Menu.idAttr);

        element.getElementsByTagName('span')[0].onclick =
            () => chrome.runtime.sendMessage({open: name});
        element.getElementsByTagName('svg')[0].onclick =
            () => Menu.onPinToggle(name);
    }

    /**
     * @private
     * @static
     * @description Create link element that can be pinned
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
     * @private
     * @static
     * @description Create and append an unpinned link
     * @param {Element} panel - DOM node where to append link
     * @param {String} label - link text
     * @param {String} name - className
     * @returns {Element}
     */
    static appendUnpinnedLink(panel, label, name) {
        panel.appendChild(Menu.createLink(
            Helpers.unpinnedItemIcon, label, name));
    }
};
