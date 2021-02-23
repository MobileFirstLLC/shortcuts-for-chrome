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
 * @class
 * @name Menu
 * @classdesc Menu panel is a view that shows a list of links
 */
export default class Menu {

    constructor(getLinks, onPinToggle, onPinOrderChange, getRecent) {
        this.name = 'menu';
        this.idAttr = 'data-name';
        this.getLinks = getLinks;
        this.getRecent = getRecent;
        this.onPinToggle = onPinToggle;
        this.onPinOrderChange = onPinOrderChange;
        this.unpinnedItemIcon = appIcons.generateIcon(
            appIcons.icons.addPin, 'pin');
        this.pinnedItemIcon = appIcons.generateIcon(
            appIcons.icons.removePin, 'unpin');
    }

    /**
     * @description Draws the menu panel
     * @returns {Element} - DOM element
     */
    render() {
        const panel = document.createElement('div');
        const {pinned, unpinned} = this.getLinks();
        const recent = this.getRecent();

        this.renderPinnedLinks(panel, pinned);
        this.renderRecentItems(panel, recent);
        this.renderUnpinnedLinks(panel, unpinned);
        return panel;
    };

    /**
     * @description Send message to background to launch some link in new tab
     * @param {String} link - url of the link to open; this should be absolute url string
     */
    launchTab(link) {
        window.chrome.runtime.sendMessage({open: link});
    };

    /**
     * @ignore
     * @description when user has some pinned items, render each and make them draggable
     * @param {Element} panel - DOM element where links will be appended
     * @param {Array<String>} pinned - list of pinned links
     */
    renderPinnedLinks(panel, pinned) {
        if (!pinned || !pinned.length) return;

        let container = document.createElement('div'),
            actionCallback = (el) => {
                this.attachClickActions(el);
            },
            orderChangeCallback = (n) => {
                this.onPinOrderChange(n);
            };

        container.id = 'pinned';
        pinned.map((link) => {
            let elem = this.makeLink(
                this.pinnedItemIcon,
                this.linkLabel(link),
                link);

            container.appendChild(elem);
        });
        panel.appendChild(container);
        panel.appendChild(this.makeDivider());

        (() => new Draggable(
            this.idAttr,
            container,
            actionCallback,
            orderChangeCallback))();
    }

    /**
     * @ignore
     * @param panel - DOM reference
     * @param recent - list of recent items
     */
    renderRecentItems(panel, recent) {
        if (!recent || !recent.length) return;

        const label = document.createElement('span');

        label.innerText = this.linkLabel('recently_used');
        label.classList.add('category-title');
        panel.appendChild(label);

        recent.map((link) => (
            // localize label
            [this.linkLabel(link), link]
        ))
            // sort by localized label
            .sort()
            .map(([label, link]) =>
                panel.appendChild(
                    this.makeLink(
                        this.unpinnedItemIcon,
                        label, link
                    )));

        // add divider below
        panel.appendChild(this.makeDivider());
    }

    /**
     * @ignore
     * @description The unpinned items will be displayed in alphabetical order (localized)
     * @param {Element} panel - DOM element where links will be added
     * @param {Array<String>} links - list of link names
     */
    renderUnpinnedLinks(panel, links) {
        let firstLetter = null;

        links.map((link) => {
            // first get localized label
            return [this.linkLabel(link), link];
        })
            // then sort based on the localized label
            .sort()
            // only then make the elements
            .map((item) => {
                let elem = this.makeLink(this.unpinnedItemIcon, item[0], item[1]);

                if (firstLetter && firstLetter !== item[0][0]) {
                    panel.appendChild(this.makeDivider());
                }
                firstLetter = item[0][0];
                panel.appendChild(elem);
            });
    }

    /**
     * @ignore
     * @description bind the onclick events to some link element
     * @param {Element} el - link element
     */
    attachClickActions(el) {
        let name = el.getAttribute(this.idAttr);

        el.getElementsByTagName('span')[0].onclick = () => {
            this.launchTab(name);
        };
        el.getElementsByTagName('svg')[0].onclick = () => {
            this.onPinToggle(name);
        };
    }

    /**
     * @ignore
     * @description Get the i18n dictionary key for some link
     * @param {String} name - link name
     */
    linkLabel(name) {
        return window.chrome.i18n.getMessage(
            name.replace(/[\-\/]/g, '_')) || name;
    }

    /**
     * @ignore
     * @function
     * @description Makes a menu divider
     */
    makeDivider() {
        let div = document.createElement('div');

        div.setAttribute('class', 'divider');
        return div;
    };

    /**
     * @ignore
     * @description Create link element that can be pinned
     * @param {String} icon - icon HTML as string
     * @param {String} label - link text
     * @param {String} name - className
     * @returns {Element} - created link element
     */
    makeLink(icon, label, name) {
        let a = document.createElement('a'),
            text = document.createElement('span');

        text.innerText = label;
        a.setAttribute(this.idAttr, name);
        a.innerHTML = icon + text.outerHTML;
        this.attachClickActions(a);
        return a;
    };
};
