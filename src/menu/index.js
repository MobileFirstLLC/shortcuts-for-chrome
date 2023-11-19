import Draggable from './dragging.js';
import Helpers from './helpers';
import {RecentLinks} from '..';

/**
 * @class Menu
 * @description Create a menu of navigation links.
 *
 * @example
 * ```js title="Create menu of links"
 * const menu = new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent);
 * ```
 *
 * @classdesc Menu panel is a DOM elements that shows a list of links. This menu panel
 * is drawn dynamically by creating all menu elements programmatically on `render()`.
 * The parent instantiating the menu will call render. Parent must then add the returned
 * menu to DOM tree to display it to user.
 *
 * @param {function} getLinks - Function that returns all links.
 * @param {function} onPinToggle - Callback function for when link is pinned/unpinned.
 * @param {function} onPinOrderChange - Callback function for when links are re-ordered.
 * @param {function} getRecent - Function that returns list of recent links.
 * @returns {{idAttr: string, name: string, render: (function(): Element)}} Menu panel reference.
 *

 */
export default class Menu {

    constructor(getLinks, onPinToggle, onPinOrderChange, getRecent) {
        Menu.getLinks = getLinks;
        Menu.getRecent = getRecent;
        Menu.onPinToggle = onPinToggle;
        Menu.onPinOrderChange = onPinOrderChange;

        /**
         * Return public instance methods callable from outside this class.
         */
        return {
            name: Menu.name,
            idAttr: Menu.idAttr,
            render: Menu.render
        };
    }

    /**
     * @static
     * @memberOf Menu
     * @description Name of this menu view.
     * @returns {string}
     */
    static get name() {
        return 'menu';
    }

    /**
     * @static
     * @memberOf Menu
     * @description DOM attribute for getting the unique id of a link.
     * @returns {string}
     */
    static get idAttr() {
        return 'data-name';
    }

    /**
     * @private
     * @static
     * @memberOf Menu
     * @description Function that menu will call to get all links. This function is
     * specified at instantiation.
     * @returns {function}
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
     * @memberOf Menu
     * @description Function that menu will call to get recent items. This function is
     * specified at instantiation.
     * @returns {function}
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
     * @memberOf Menu
     * @description Callback function when item is pinned or unpinned. This callback is
     * specified at instantiation.
     * @returns {function}
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
     * @memberOf Menu
     * @description Callback function when pin order is changed. This callback
     * is specified at instantiation.
     * @returns {function}
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
     * @memberOf Menu
     * @description Programmatically draws the menu panel and its links.
     * @returns {Element} DOM element representing the menu.

     * @example
     * ```js title="Render menu"
     * // render the menu, then append to document body
     * body.append(menu.render());
     * ```
     */
    static render() {
        const panel = document.createElement('div');

        Menu.renderPinnedLinks(panel);
        Menu.renderRecentItems(panel);
        Menu.renderUnpinnedLinks(panel);
        return panel;
    }

    /**
     * @private
     * @static
     * @memberOf Menu
     * @description When user has some pinned items, render each and make them draggable.
     * @param {Element} panel DOM element where links will be appended.
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
     * @static
     * @private
     * @memberOf Menu
     * @description If user has recently clicked on some unpinned link, render them in
     * this special section. Recent items will expire after enough time has elapsed since
     * user clicked on the link.
     * @param {Element} panel DOM element where links will be appended.
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
     * @static
     * @private
     * @memberOf Menu
     * @description The unpinned items will be displayed in alphabetical order (localized).
     * @param {Element} panel DOM element where links will be appended.
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
     * @static
     * @private
     * @memberOf Menu
     * @description Bind the onclick events to a link.
     * @param {Element} element DOM node representing a link.
     */
    static attachClickActions(element) {
        let name = element.getAttribute(Menu.idAttr);

        element.getElementsByTagName('span')[0].onclick =
            () => Menu.onOpen(name);
        element.getElementsByTagName('svg')[0].onclick =
            () => Menu.onPinToggle(name);
    }

    /**
     * @static
     * @private
     * @memberOf Menu
     * @description Open selected URL and record "recent use" of that URL. Recent use is
     * recorded in the background to enable capturing it before the popup closes; attempting
     * to do it in the foreground leads to a race.
     * @param {string} urlPath - Chrome URL to open.
     */
    static onOpen(urlPath) {
        const fullURL = 'chrome://' + urlPath;

        RecentLinks.addRecent(urlPath,
            () => chrome.tabs.create({url: fullURL}));
    }

    /**
     * @static
     * @private
     * @memberOf Menu
     * @description Create link element that can be pinned.
     * @param {string} icon - Icon HTML as string.
     * @param {string} label - Link text.
     * @param {string} name - Class name.
     * @returns {Element} Created link element.
     */
    static createLink(icon, label, name) {
        const a = document.createElement('a'),
            text = document.createElement('span');

        text.innerText = label;
        a.setAttribute(Menu.idAttr, name);
        a.innerHTML = icon + text.outerHTML;
        Menu.attachClickActions(a);
        return a;
    }

    /**
     * @static
     * @private
     * @memberOf Menu
     * @description Create and append an unpinned link.
     * @param {Element} panel - DOM node where to append link.
     * @param {string} label - Link text.
     * @param {string} name - Class name.
     * @returns {Element}
     */
    static appendUnpinnedLink(panel, label, name) {
        panel.appendChild(Menu.createLink(
            Helpers.unpinnedItemIcon, label, name));
    }
}
