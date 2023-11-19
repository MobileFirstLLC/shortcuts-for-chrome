import {Config} from './config';
import Storage from './storage';

/**
 * @class RecentLinks
 *
 * @classdesc Recent links is a list of URL that were used "recently",
 * based on configurable interval in
 * [Config.recentIntervalMillis](#config-object). Unpinned recent links
 * are displayed at the top of the menu. Recent links become stale after
 * some time and are removed from the recent list.
 */
export default class RecentLinks {

    /**
     * @static
     * @memberOf RecentLinks
     * @description Determine if some timestamp still qualifies as
     * recent.
     *
     * !!! example "Check if access is recent"
     *     ```{ .js }
     *     const timestamp = Date.now(); // capture timestamp
     *
     *     // ... a few minutes later:
     *     console.log(RecentLinks.isStillRecent(timestamp));
     *     ```
     *
     * @param {number} timestamp - Milliseconds since epoch when link
     * was last accessed.
     * @returns {boolean} True if link is still valid relative to
     * current time.
     */
    static isStillRecent(timestamp) {
        const minTime = Date.now() - Config.recentIntervalMillis;

        return !!(timestamp && timestamp > minTime);
    }

    /**
     * @static
     * @memberOf RecentLinks
     * @description Mark some URL as recently used. This will either add
     * or update the link, depending on if it already exists as a
     * recently used link.
     * @param {string} url - Link URL.
     * @param {function} callback - Handler for when function is done.
     */
    static addRecent(url, callback = () => false) {
        Storage.get([Storage.keys.recent], items => {
            let found = false;
            const recent = (items[Storage.keys.recent] || [])
                // remove stale entries
                .filter(({ts}) => RecentLinks.isStillRecent(ts))
                .map(item => {
                    // if given URL is already recent,
                    // update its timestamp
                    if (item.url === url) {
                        item.ts = Date.now();
                        found = true;
                    }
                    return item;
                });

            if (!found) {
                recent.push({url, ts: Date.now()});
            }

            Storage.save(Storage.keys.recent, recent, callback);
        });
    }

    /**
     * @static
     * @memberOf RecentLinks
     * @description Get all recent items. This method returns everything
     * that qualifies as recent. It doesn't check if a link is pinned or
     * not, and that should be done at display time to avoid
     * duplication.
     * @param {function} callback - Result handler
     */
    static getRecent(callback) {
        Storage.get(null, items => {
            const recent = (items[Storage.keys.recent] || [])
                // filter out unwanted matches
                .filter(({ts}) =>
                    RecentLinks.isStillRecent(ts))
                // returns urs only
                .map(({url}) => url);

            callback(recent);
        });
    }
}
