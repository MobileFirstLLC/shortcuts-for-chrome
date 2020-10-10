/**
 * @class
 * @classdesc Utility class for opening popup window in the middle of user's viewport
 */
class CenteredPopup {

    /**
     * @private
     * @description Compute offset for element to center it within some space
     * @param {Number} max max width
     * @param {Number} size element width
     * @return {Number}
     */
    static center(max, size) {
        return parseInt(Math.max(0, Math.round(0.5 * (max - size))), 0);
    }

    /**
     * @private
     * @description Request viewport dimensions from chrome runtime
     * @returns {Promise}
     */
    static getBounds() {
        return new Promise(function (resolve) {
            window.chrome.system.display.getInfo(resolve);
        });
    }

    /**
     * @description Create centered popup window in the middle of user's monitor viewport.
     * If user has multiple monitors this method launches window in the first/leftmost monitor.
     * This method requires `system.display` permission in `manifest.json`
     * @param {number} width - width of the new window (px)
     * @param {number} height - height of the new window (px)
     * @param {String} url - url to open
     * @param {String} type - window type enum: `popup` or `normal`, defaults to `popup`
     * @returns {Promise}
     *
     * @example CenteredPopup.open(500,500, 'http://www.example.com')
     */
    static open(width, height, url, type) {

        return new Promise(function (resolve) {

            /**
             * @private
             */
            function openWindow(info) {
                let area = info[0].workArea;

                window.chrome.windows.create({
                    url: url,
                    width: width,
                    height: height,
                    focused: true,
                    type: type || 'popup',
                    left: CenteredPopup.center(area.width, width),
                    top: CenteredPopup.center(area.height, height)
                }, resolve);
            }

            CenteredPopup.getBounds()
                .then(openWindow)
                .catch(() => {
                    openWindow([{workArea: {width: 0, height: 0}}]);
                });
        });
    }
}

export default CenteredPopup;
