import Storage from '../modules/storage';
import {MenuLinks} from '../config';
import MenuPanel from '../menu/menu';

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
        this.pinned = [];
        this.getLinks = this.getLinks.bind(this);
        this.onPinToggle = this.onPinToggle.bind(this);
        this.onPinOrderChange = this.onPinOrderChange.bind(this);
        this.drawCurrentView = this.drawCurrentView.bind(this);
        this.activeView = new MenuPanel(
            this.getLinks,
            this.onPinToggle,
            this.onPinOrderChange);

        Storage.get([Storage.keys.pinned], items => {
            this.pinned = items[Storage.keys.pinned] || [];
            this.drawCurrentView();
        });
    }

    /**
     * @description get DOM element where to render content
     * This will also clear all existing children from that element
     */
    static get renderTarget() {
        let tmp = document.getElementsByTagName('body')[0];

        while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
        }
        return tmp;
    }

    /**
     * @description Render currently active view
     */
    drawCurrentView() {
        let wrapper = Popup.renderTarget;

        wrapper.setAttribute('id', this.activeView.name);
        wrapper.appendChild(this.activeView.render());
    }

    /**
     * @description Handler for when user pins/unpins an item
     * @param {String} key - id of the pin that was clicked
     */
    onPinToggle(key) {
        const index = this.pinned.indexOf(key);

        if (index < 0) {
            this.pinned.push(key);
        } else {
            this.pinned.splice(index, 1);
        }
        this.onPinOrderChange(this.pinned.concat([]), this.drawCurrentView);
        window.ga('send', 'event', 'chrome-urls', 'pin', null, 1);
    }

    /**
     * @description When user rearranges pins -> update and save new pin order
     * @param {Array<String>} newOrder - list of link ids and their new order
     * @param {function?} cb - callback function (optional)
     */
    onPinOrderChange(newOrder, cb) {
        this.pinned = newOrder;
        Storage.save(Storage.keys.pinned, this.pinned, cb);
    }

    /**
     * @description Get menu links
     */
    getLinks() {
        const pinned = this.pinned;

        return {
            pinned,
            unpinned: MenuLinks.filter(link => pinned.indexOf(link) < 0)
        };
    }
}
