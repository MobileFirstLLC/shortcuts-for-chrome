/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Popup window script implementation
 * * * * * * * * * * * * * * * * * * * * */

import {MenuLinks} from '../links.json';
import Storage from '../modules/storage';
import RecentLinks from '../modules/recent';
import Menu from '../menu/menu';

/**
 * @module
 * @name Popup
 * @description This is the main class for the popup window that shows
 * when user clicks extension icon. This class is responsible for:
 *
 * - saving/restoring persistent data and
 * - rendering the menu panel
 *
 * This popup view can easily be extended to display other content, but
 * currently it renders the menu panel only.
 */
export default class Popup {

    /**
     * @constructor
     * @name Popup
     * @description instantiate Popup window
     */
    constructor() {
        Popup.activeView = new Menu(
            Popup.getLinks,
            Popup.onPinToggle,
            Popup.onPinOrderChange,
            Popup.getRecent);

        // load user settings and draw initial view
        RecentLinks.getRecent(recentList => {
            Popup.recent = recentList;
            Storage.get([Storage.keys.pinned], items => {
                Popup.pinned = items[Storage.keys.pinned] || [];
                Popup.drawCurrentView();
            });
        });
    }

    /**
     * @description Get pinned links
     * @returns {Array.<String>}
     */
    static get pinned() {
        return this._pinned;
    }

    /**
     * @description Get unpinned links
     * @returns {Array.<String>}
     */
    static get unpinned() {
        return MenuLinks.filter(link =>
            Popup.pinned.indexOf(link) < 0);
    }

    static set pinned(value) {
        this._pinned = value;
    }

    /**
     * @description Get recent links
     * @returns {Array.<String>}
     */
    static get recent() {
        return this._recent;
    }

    static set recent(value) {
        this._recent = value;
    }

    /**
     * @description Get the view that is currently active in the Popup
     * @returns {Element}
     */
    static get activeView() {
        return this._activeView;
    }

    static set activeView(view) {
        this._activeView = view;
    }

    /**
     * @static
     * @description
     * Get DOM element where to render content.
     * This will also clear all existing children from that element,
     * meaning you can always assume this element is empty.
     */
    static get renderTarget() {
        let tmp = document.body;

        while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
        }
        return tmp;
    }

    /**
     * @description Draw the currently active view in the render target.
     * @static
     */
    static drawCurrentView() {
        let wrapper = Popup.renderTarget;

        wrapper.setAttribute('id', Popup.activeView.name);
        wrapper.appendChild(Popup.activeView.render());
    }

    /**
     * @description Handler for when user pins/unpins a link.
     * @param {String} key - id of the pin that was clicked
     * @static
     */
    static onPinToggle(key) {
        const index = Popup.pinned.indexOf(key);

        if (index < 0) {
            Popup.pinned.push(key);
        } else {
            Popup.pinned.splice(index, 1);
        }

        Popup.onPinOrderChange(Popup.pinned, Popup.drawCurrentView);
    }

    /**
     * @description Handler for when user rearranges pins, update and save new pin order.
     * @param {Array<String>} newOrder - list of link ids and their new order
     * @param {function?} callback - callback function (optional); specify this callback
     * if you need to perform some action after new order has been persisted.
     * @static
     */
    static onPinOrderChange(newOrder, callback) {
        Popup.pinned = newOrder;
        Storage.save(Storage.keys.pinned, Popup.pinned, callback);
    }

    /**
     * @description Get menu links
     * @returns {{pinned: Array.<String>, unpinned: Array.<String>}}
     * @static
     */
    static getLinks() {
        return {
            pinned: Popup.pinned,
            unpinned: Popup.unpinned
        };
    }

    /**
     * @description Get recently used links
     * @returns {Array.<String>}
     * @static
     */
    static getRecent() {
        return Popup.recent.filter(x =>
            Popup.pinned.indexOf(x) < 0);
    }
}
