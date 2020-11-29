import Storage from '../modules/storage';

export default class UpdateHandler {
    constructor() {
        window.chrome.runtime.onInstalled.addListener(details => {
            if (details.reason === 'update') {
                Storage.migrateStorage();
            }
        });
    }
}
