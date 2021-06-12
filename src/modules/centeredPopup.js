/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Utility class for opening popup window in
 * the middle of user's viewport
 * * * * * * * * * * * * * * * * * * * * */

/**
 * @description
 * Utility module for opening popup window in the middle of user's viewport.
 *
 * @module
 * @name CenteredPopup
 */
export default class CenteredPopup {

    /**
     * @static
     * @description Create centered popup window in the middle of user's
     * monitor viewport. If user has multiple monitors this method launches
     * window in the first/leftmost monitor.
     * @param {number} width - width of the new window (px)
     * @param {number} height - height of the new window (px)
     * @param {String} url - url to open
     *
     * @example CenteredPopup.open(500,500, 'http://www.example.com')
     */
    static open(width, height, url) {

        /** @private */
        const center = (max, size) =>
                Math.trunc(Math.max(0,
                    Math.round(0.5 * (max - size)))),
            w = window.screen.width,
            h = window.screen.height * 0.75;

        chrome.windows.create({
            url: url,
            width: width,
            height: height,
            focused: true,
            type: 'popup',
            left: center(w, width),
            top: center(h, height)
        });
    }
}
