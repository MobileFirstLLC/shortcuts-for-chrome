import Storage from './storage';

/**
 * Register action that should occur on
 * extension install or update.
 * @module
 * @name UpdateHandler
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
