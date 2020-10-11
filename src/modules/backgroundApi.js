import CenteredPopup from './centeredPopup.js';

/**
 * Handle messaging between different parts of the extension, @see
 * {@link https://developer.chrome.com/apps/runtime#event-onMessage|onMessage}
 * @module
 * @name BackgroundApi
 */
export default class BackgroundApi {

    /**
     * @ignore
     * @description Call the constructor to register background API listeners
     *
     * @param {Object} request - user defined dynamic parameters
     * @param {String} request.open - opens the url defined by this property value
     * @param {Object} request.share - one of `share.options` - share window will launch
     *
     * @example chrome.runtime.sendMessage({open: "chrome://about"});
     *
     */
    constructor() {
        window.chrome.runtime.onMessage.addListener(
            (request, sender, callback) => {
                if (request.open) {
                    return window.chrome.tabs.create({url: request.open});
                }
                if (request.share) {
                    return CenteredPopup.open(
                        request.share.width,
                        request.share.height,
                        request.share.url);
                }
                return false;
            });
    }
}
