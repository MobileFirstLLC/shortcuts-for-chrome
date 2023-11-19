/**
 * @static
 * @class Storage
 * @classdesc Application storage for persisting data. Persisted data includes:
 *
 * 1. pinned links (user preference)
 * 2. recently used links (based on user behavior).
 *
 * This storage is stored in chrome sync storage, which is specific to current
 * user, and will sync between devices if user is signed in and sync is enabled.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/storage/#usage | Chrome storage}
 *
 * !!! info
 *     This feature requires `storage` permission in extension manifest.
 */
export default class Storage {

    /**
     * @constant
     * @static
     * @enum
     * @memberOf Storage
     * @description List of storage keys. Only these keys can be stored in this storage.
     * @returns {{Object}}
     */
    static get keys() {
        return {pinned: 'pinned', recent: 'recent'};
    }

    /**
     * @memberOf Storage
     * @static
     * @description Get some property from storage.
     * @param {string|Array<string>|Object} keys Must be one of:
     * A single key to get, list of keys to get, or a dictionary
     * specifying default values (see description of the object).
     * An empty list or object will return an empty result object.
     * Pass in null to get the entire contents of storage.
     * @param {function} callback - Function to call with result.
     *
     * @example
     * ```js title="Get values from storage"
     * Storage.get([Storage.keys.recent], items => {
     *   // do something with items
     * });
     * ```
     */
    static get(keys, callback) {
        chrome.storage.sync.get(keys, callback);
    }

    /**
     * @memberOf Storage
     * @static
     * @description Save some property in storage.
     * @param {string} key - One of  {@link Storage.keys}.
     * @param {*} value - Value to save.
     * @param {function?} callback - Called after save operation has completed.
     *
     * @example
     * ```js title="Save value to storage"
     * Storage.save(Storage.keys.recent, recentObj, callback);
     * ```
     */
    static save(key, value, callback = () => false) {
        chrome.storage.sync.set({[key]: value}, callback);
    }
}
