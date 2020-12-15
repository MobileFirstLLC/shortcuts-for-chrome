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
     * @name BackgroundApi
     */
    constructor() {
        window.chrome.runtime.onMessage.addListener(/**
         * @ignore
         * @param {Object} request - user defined dynamic parameters
         * @param {String} request.open - opens the url defined by this property value
         *
         * @example chrome.runtime.sendMessage({open: "chrome://about"});
         */
        (request) => {
            if (request.open) {
                window.chrome.tabs.create({url: request.open});
            }
        });
    }
}
