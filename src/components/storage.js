let _storageKeys = {pinned: 'pinned'};

/**
 * @class
 * @classdesc Application storage for persisting data
 */
class Storage {

    /**
     * @description List of storage keys. Only these keys can be stored in this storage.
     * @returns Object
     */
    static get keys() {
        return _storageKeys;
    };

    /**
     * @function
     * @description get some property from storage
     * @param {String|Array<String>} keys must be one of `storage.keys` or `null`.
     * If `null`, entire contents of the storage will be returned.
     * @param {function} callback - function to call with result
     */
    static get(keys, callback) {
        window.chrome.storage.local.get(keys, callback);
    };

    /**
     * @function
     * @description save some property in storage
     * @param {String} key - one of `storage.keys`
     * @param {*} value - value to save
     * @param {function} callback - called after save operation has completed
     */
    static save(key, value, callback) {
        if (!Storage.keys.hasOwnProperty(key)) {
            throw Error('unknown key');
        }

        let obj = {};

        obj[key] = value;
        window.chrome.storage.local.set(obj, callback);
    };
}

export default Storage;
