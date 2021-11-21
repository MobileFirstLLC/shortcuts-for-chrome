// noinspection JSUnresolvedVariable,JSDeprecatedSymbols

import RecentLinks from '../shared/recent';

/**
 * @description
 * Listen to incoming messages from other browser contexts.
 * Instantiate `new BackgroundApi()` to bind this behavior.
 *
 * @module
 * @name Api
 */
export default class Api {

    /**
     * @constructor
     * @name Api
     *
     * @description
     * Instantiate `new BackgroundApi()` to register background API listeners which
     * handles messaging between different parts of the extension, @see
     * {@link https://developer.chrome.com/apps/runtime#event-onMessage|onMessage}
     * for details on message passing in chrome extensions.
     *
     * This module records recently opened tabs.
     *
     * @example chrome.runtime.sendMessage({open: "about"}); // will record "about" as recently used
     */
    constructor() {
        chrome.runtime.onMessage.addListener(
            (request) => request.open && RecentLinks.addRecent(request.open));
    }
}
