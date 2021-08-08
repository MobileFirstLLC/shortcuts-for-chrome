import {Storage} from '../shared';

/**
 * @module
 * @name UpdateHandler
 * @description Register action that should occur on extension install or update.
 * Instantiate this object to register a handler
 */
export default class UpdateHandler {
    /**
     * @constructor
     * @name UpdateHandler
     * @description Instantiate this object to register a handler
     */
    constructor() {
        chrome.runtime.onInstalled.addListener(details => {
            if (details.reason === 'update') {
               Storage.migrateStorage();
            }
        });
    }
}
