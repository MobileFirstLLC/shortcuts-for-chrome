/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Background message listeners
 * * * * * * * * * * * * * * * * * * * * */

// noinspection JSUnresolvedVariable,JSDeprecatedSymbols
import RecentLinks from './recent';

/**
 * @description
 * Listen to incoming messages from other browser contexts.
 * Instantiate `new BackgroundApi()` to bind this behavior.
 *
 * @module
 * @name BackgroundApi
 */
export default class BackgroundApi {

    /**
     * @constructor
     * @name BackgroundApi
     *
     * @description
     * Instantiate `new BackgroundApi()` to register background API listeners which
     * handles messaging between different parts of the extension, @see
     * {@link https://developer.chrome.com/apps/runtime#event-onMessage|onMessage}
     * for details on message passing in chrome extensions.
     *
     * @example chrome.runtime.sendMessage({open: "about"}); // will open tab: chrome://about
     */
    constructor() {
        chrome.runtime.onMessage.addListener(
            (request) => {
                if (request.open) {
                    const urlPath = request.open;
                    const fullURL = 'chrome://' + urlPath;

                    chrome.tabs.create({url: fullURL});
                    RecentLinks.addRecent(urlPath);
                }
            });
    }
}
