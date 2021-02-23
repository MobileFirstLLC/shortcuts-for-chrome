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
 * Listen to incoming messages from other browser contexts.
 *
 * @module
 * @name BackgroundApi
 */
export default class BackgroundApi {

    /**
     * Call the constructor to register background API listeners which
     * handles messaging between different parts of the extension, @see
     * {@link https://developer.chrome.com/apps/runtime#event-onMessage|onMessage}
     *
     * @example chrome.runtime.sendMessage({open: "about"});
     * will open tab at chrome://about
     * @name BackgroundApi
     */
    constructor() {
        window.chrome.runtime.onMessage.addListener(
            (request) => {
                if (request.open) {
                    const urlPath = request.open;
                    const fullURL = 'chrome://' + urlPath;

                    window.chrome.tabs.create({url: fullURL});
                    RecentLinks.addRecent(urlPath);
                }
            });
    }
}
