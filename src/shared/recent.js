import {Config} from './config';
import Storage from './storage';

/**
 * @static
 * @class RecentLinks
 *
 * @classdesc Recent links is a list of URL that were used recently (based on config).
 * They become stale after some time and then get removed from the recent list.
 */
export default class RecentLinks {

    /**
     * @static
     * @memberOf RecentLinks
     * @description Determine if some timestamp still qualifies as "recent".
     * @param {number} timestamp - Milliseconds since epoch when link was last accessed.
     * @returns {boolean} True if link is still valid relative to current time.
     *
     * @example
     * ``` js title="Check if recent"
     * const timestamp = Date.now(); // capture timestamp
     *
     * // ... a few minutes later:
     * console.log(RecentLinks.isStillRecent(timestamp));
     * ```
     */
    static isStillRecent(timestamp) {
        const minTime = Date.now() - Config.recentIntervalMillis;

        return !!(timestamp && timestamp > minTime);
    }

    /**
     * @static
     * @memberOf RecentLinks
     * @description Mark some URL as recently used. Will either add or update the link,
     * depending on if it already exists as a recently used link.
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
     * @description Get all recent items; note that this methods returns everything
     * that is "not-stale". It doesn't check if link is pinned or not. That should
     * be done at display time.
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
