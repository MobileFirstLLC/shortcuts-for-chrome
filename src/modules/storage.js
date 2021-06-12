/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Application storage for persisting data
 * * * * * * * * * * * * * * * * * * * * */

/**
 * @description Application storage for persisting data
 * @module
 * @name Storage
 */
export default class Storage {

    /**
     * @description List of storage keys. Only these keys can be
     * stored in this storage. For more details, @see:
     * {@link https://developer.chrome.com/docs/extensions/reference/storage/}
     * @returns Object
     */
    static get keys() {
        return {pinned: 'pinned', recent: 'recent'};
    };

    /**
     * @description Migrate storage from local to sync storage
     * This allows syncing user preferences between devices.
     */
    static migrateStorage() {
        chrome.storage.local.get([Storage.keys.pinned],
            items => {
                const result = items[Storage.keys.pinned] || [];

                // do not overwrite sync storage if already done
                if (result.length) {
                    Storage.save(Storage.keys.pinned,
                        result, _ => false);
                    // clear local storage
                    chrome.storage.local.set({
                        [Storage.keys.pinned]: []
                    }, _ => false);
                }
            });
    }

    /**
     * @function
     * @description get some property from storage
     * @param {String|Array<String>|Object} keys must be one of:
     * A single key to get, list of keys to get, or a dictionary
     * specifying default values (see description of the object).
     * An empty list or object will return an empty result object.
     * Pass in null to get the entire contents of storage.
     * @param {function} callback - function to call with result
     */
    static get(keys, callback) {
        chrome.storage.sync.get(keys, callback);
    };

    /**
     * @function
     * @description save some property in storage
     * @param {String} key - one of `storage.keys`
     * @param {*} value - value to save
     * @param {function} callback - called after save operation has completed
     */
    static save(key, value, callback = _ => false) {
        chrome.storage.sync.set({[key]: value}, callback);
    };
}
