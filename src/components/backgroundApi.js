import CenteredPopup from './centeredPopup.js';

/**
 * @class
 * @classdesc Handle messaging between different parts of the extension, @see
 * {@link https://developer.chrome.com/apps/runtime#event-onMessage|onMessage}
 * @param {Object} request - user defined dynamic parameters
 * @param {String} request.open - opens the url defined by this property value
 * @param {Object} request.share - one of `share.options` - share window will launch
 *
 * @example chrome.runtime.sendMessage({open: "chrome://about"});
 */
class BackgroundApi {

    /**
     * @description Call the constructor to register background API listeners
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

export default BackgroundApi;
