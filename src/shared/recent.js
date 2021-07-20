import {AppConfig} from '../config';
import Storage from './storage';

/**
 * @description
 * Recent links were used recently (based on config). They become
 * stale after some time and then get removed from the list of recent.
 * @module
 * @name RecentLinks
 */
export default class RecentLinks {

    /**
     * Determine if some timestamp still qualifies as "recent"
     * @param {number} timestamp - millis since epoch
     * @returns {boolean} - true if link is still valid
     */
    static isStillRecent(timestamp) {
        const minTime = Date.now() - AppConfig.recentIntervalMillis;

        return !!(timestamp && timestamp > minTime);
    }

    /**
     * Mark some URL as recently used. Will either add or
     * update the link, depending if it already exists
     * as a recently used link.
     * @param {string} url - link URL
     * @param {function} callback - handler for when function is done
     */
    static addRecent(url, callback = _ => false) {
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
     * Get all recent items; note that this methods returns
     * everything that is "not-stale". It doesn't check if
     * link is pinned or not. That should be done at display time.
     * @param {function} callback - result handler
     */
    static getRecent(callback) {
        Storage.get(null, items => {
            const recent = (items[Storage.keys.recent] || [])
                // filter out unwanted matches
                .filter(({url, ts}) =>
                    RecentLinks.isStillRecent(ts))
                // returns urs only
                .map(({url}) => url);

            callback(recent);
        });
    }
}
