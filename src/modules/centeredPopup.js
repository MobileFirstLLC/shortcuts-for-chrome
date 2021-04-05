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
 * Utility class for opening popup window in
 * the middle of user's viewport
 *
 * @module
 * @name CenteredPopup
 */
export default class CenteredPopup {

    /**
     * @description Create centered popup window in the middle of user's
     * monitor viewport. If user has multiple monitors this method launches
     * window in the first/leftmost monitor. This method requires
     * `system.display` permission in `manifest.json`
     * @param {number} width - width of the new window (px)
     * @param {number} height - height of the new window (px)
     * @param {String} url - url to open
     *
     * @example CenteredPopup.open(500,500, 'http://www.example.com')
     */
    static open(width, height, url) {

        /** @private */
        const getBounds = (callback) =>
            window.chrome.system.display.getInfo(callback);

        /** @private */
        const center = (max, size) =>
            Math.trunc(Math.max(0, Math.round(0.5 * (max - size))));

        /** @private */
        const openWindow = (info) => {
            const [{workArea: {width: w, height: h}}] = info ||
            [{workArea: {width: 0, height: 0}}];

            window.chrome.windows.create({
                url: url,
                width: width,
                height: height,
                focused: true,
                type: 'popup',
                left: center(w, width),
                top: center(h, height)
            });
        };

        getBounds(openWindow);
    }
}
