/**
 * @description Application storage for persisting data.
 * Currently persisted data includes:
 *
 * 1. pinned links (user preference)
 * 2. recently used links (based on user behavior)
 *
 * This storage is stored in chrome sync storage, which is specific to current
 * user, and will sync between devices if user is signed in and sync is enabled.
 * {@link https://developer.chrome.com/docs/extensions/reference/storage/#usage}
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
    }

    /**
     * @function
     * @description save some property in storage
     * @param {String} key - one of `storage.keys`
     * @param {*} value - value to save
     * @param {function} callback - called after save operation has completed
     */
    static save(key, value, callback = _ => false) {
        chrome.storage.sync.set({[key]: value}, callback);
    }
}
