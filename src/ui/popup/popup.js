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

import Storage from '../../modules/storage';
import {MenuLinks} from '../../links.json';
import RecentLinks from '../../modules/recent';
import Menu from '../menu/menu';

/**
 * @class
 * @name Popup
 * @classdesc This is the main class for the popup window
 * This class is responsible for saving/restoring persistent data
 * and rendering the menu panel. This element can easily be extended
 * to display other content but currently the only content that does
 * get rendered is the menu panel.
 */
export default class Popup {

    constructor() {
        Popup.activeView = new Menu(
            Popup.getLinks,
            Popup.onPinToggle,
            Popup.onPinOrderChange,
            Popup.getRecent);

        // load user settings and draw initial view
        RecentLinks.getRecent(list => {
            Storage.get([Storage.keys.pinned], items => {
                Popup.recent = list || [];
                Popup.pinned = items[Storage.keys.pinned] || [];
                Popup.drawCurrentView();
            });
        });
    }

    static get pinned() {
        return this._pinned || [];
    }

    static get unpinned() {
        return MenuLinks.filter(link =>
            Popup.pinned.indexOf(link) < 0);
    }

    static set pinned(value) {
        this._pinned = value;
    }

    static get recent() {
        return this._recent || [];
    }

    static set recent(value) {
        this._recent = value;
    }

    static get activeView() {
        return this._activeView;
    }

    static set activeView(view) {
        this._activeView = view;
    }

    /**
     * @description get DOM element where to render content
     * This will also clear all existing children from that element
     */
    static get renderTarget() {
        let tmp = document.body;

        while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
        }
        return tmp;
    }

    /**
     * @description Render currently active view
     */
    static drawCurrentView() {
        let wrapper = Popup.renderTarget;

        wrapper.setAttribute('id', Popup.activeView.name);
        wrapper.appendChild(Popup.activeView.render());
    }

    /**
     * @description Handler for when user pins/unpins an item
     * @param {String} key - id of the pin that was clicked
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
     * @description When user rearranges pins -> update and save new pin order
     * @param {Array<String>} newOrder - list of link ids and their new order
     * @param {function?} cb - callback function (optional)
     */
    static onPinOrderChange(newOrder, cb) {
        Popup.pinned = newOrder;
        Storage.save(Storage.keys.pinned, Popup.pinned, cb);
    }

    /**
     * @description Get menu links
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
     */
    static getRecent() {
        return Popup.recent.filter(x =>
            Popup.pinned.indexOf(x) < 0);
    }
}
