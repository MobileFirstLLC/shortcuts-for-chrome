import {Storage, RecentLinks, MenuLinks} from '..';
import Menu from '../menu';

/**
 * @class Popup
 *
 * @description Create a popup
 * @example
 * ```js title="Create popup"
 * new Popup()
 * ```
 *
 * @classdesc This is the main class for the popup window that shows when user
 * clicks extension icon. This class is responsible for:
 *
 * 1. saving/restoring persistent data and
 * 2. rendering the menu panel.
 *
 * This popup view can easily be extended to display other content, but currently it
 * renders the menu panel only.
 */
export default class Popup {

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
     * @static
     * @private
     * @memberOf Popup
     * @description Get/set pinned links.
     * @returns {string[]}
     */
    static get pinned() {
        return this._pinned;
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Get/set unpinned links.
     * @returns {string[]}
     */
    static get unpinned() {
        return MenuLinks.filter(link =>
            Popup.pinned.indexOf(link) < 0);
    }

    static set pinned(value) {
        this._pinned = value;
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Get/set recent links.
     * @returns {string[]}
     */
    static get recent() {
        return this._recent;
    }

    static set recent(value) {
        this._recent = value;
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Get/set the view that is currently active in the popup.
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
     * @private
     * @memberOf Popup
     * @description Get DOM element where to render content. This will also clear
     * all existing children from that element, meaning you can always assume
     * this element is empty.
     */
    static get renderTarget() {
        let tmp = document.body;

        while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
        }
        return tmp;
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Draw the currently active view in the render target.
     */
    static drawCurrentView() {
        let wrapper = Popup.renderTarget;

        wrapper.setAttribute('id', Popup.activeView.name);
        wrapper.appendChild(Popup.activeView.render());
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Handler for when user pins/unpins a link.
     * @param {string} key - Id of the pin that was clicked.
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
     * @static
     * @private
     * @memberOf Popup
     * @description Handler for when user rearranges pins, update and save new pin order.
     * @param {string[]} newOrder - List of link ids and their new order.
     * @param {function?} callback - Callback function (optional); specify this callback
     * if you need to perform some action after new order has been persisted.
     */
    static onPinOrderChange(newOrder, callback) {
        Popup.pinned = newOrder;
        Storage.save(Storage.keys.pinned, Popup.pinned, callback);
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Get menu links.
     * @returns {{pinned: string[], unpinned: string[]}}
     */
    static getLinks() {
        return {
            pinned: Popup.pinned,
            unpinned: Popup.unpinned
        };
    }

    /**
     * @static
     * @private
     * @memberOf Popup
     * @description Get recently used links.
     * @returns {string[]}
     */
    static getRecent() {
        return Popup.recent.filter(x =>
            Popup.pinned.indexOf(x) < 0);
    }
}
