/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Handler for when extension updates
 * * * * * * * * * * * * * * * * * * * * */

import Storage from './storage';

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
        window.chrome.runtime.onInstalled.addListener(details => {
            if (details.reason === 'update') {
                Storage.migrateStorage();
            }
        });
    }
}
