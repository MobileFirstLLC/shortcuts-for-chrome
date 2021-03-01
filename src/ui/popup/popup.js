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

import {MenuLinks} from '../../links.json';
import Storage from '../../modules/storage';
import RecentLinks from '../../modules/recent';
import Menu from '../menu/menu';

/**
 * @module
 * @name Popup
 * @description This is the main class for the popup window
 * This class is responsible for saving/restoring persistent data
 * and rendering the menu panel. This element can easily be extended
 * to display other content but currently the only content that does
 * get rendered is the menu panel.
 */
export default class Popup {

    /**
     * @constructor
     * @name Popup
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
     * Get pinned links
     * @returns {Array.<String>}
     */
    static get pinned() {
        return this._pinned;
    }

    /**
     * Get unpinned links
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
     * Get recent links
     * @returns {Array.<String>}
     */
    static get recent() {
        return this._recent;
    }

    static set recent(value) {
        this._recent = value;
    }

    /**
     * Get active view
     * @returns {Element}
     */
    static get activeView() {
        return this._activeView;
    }

    static set activeView(view) {
        this._activeView = view;
    }

    /**
     * Get DOM element where to render content
     * This will also clear all existing children from that element
     * @static
     */
    static get renderTarget() {
        let tmp = document.body;

        while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
        }
        return tmp;
    }

    /**
     * Render currently active view
     * @static
     */
    static drawCurrentView() {
        let wrapper = Popup.renderTarget;

        wrapper.setAttribute('id', Popup.activeView.name);
        wrapper.appendChild(Popup.activeView.render());
    }

    /**
     * Handler for when user pins/unpins an item
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
     * When user rearranges pins -> update and save new pin order
     * @param {Array<String>} newOrder - list of link ids and their new order
     * @param {function?} callback - callback function (optional)
     * @static
     */
    static onPinOrderChange(newOrder, callback) {
        Popup.pinned = newOrder;
        Storage.save(Storage.keys.pinned, Popup.pinned, callback);
    }

    /**
     * Get menu links
     * @static
     */
    static getLinks() {
        return {
            pinned: Popup.pinned,
            unpinned: Popup.unpinned
        };
    }

    /**
     * Get Recently used links
     * @returns {Array.<Object>}
     * @static
     */
    static getRecent() {
        return Popup.recent.filter(x =>
            Popup.pinned.indexOf(x) < 0);
    }
}
