import Storage from '../modules/storage';

/**
 * @class
 * @name UpdateHandler
 * @classdesc Register action that should occur on
 * extension install or update.
 */
export default class UpdateHandler {
    constructor() {
        window.chrome.runtime.onInstalled.addListener(details => {
            if (details.reason === 'update') {
                Storage.migrateStorage();
            }
        });
    }
}
