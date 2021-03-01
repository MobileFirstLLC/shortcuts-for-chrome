/* eslint-disable no-new */
/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Defines which scripts run in the background context
 * * * * * * * * * * * * * * * * * * * * */

import BackgroundApi from '../modules/backgroundApi';
import ContextMenu from '../modules/contextMenu';
import UpdateHandler from '../modules/onUpdate';

/**
 * @module
 * @name Background
 *
 * @description This class is responsible for setting up
 * event handlers and actions that happen in the
 * background context of the browser. It:
 * 1. initialize the message passing API
 * 2. sets up extension context menu
 */
export default class Background {
    constructor() {
        new BackgroundApi();
        new ContextMenu();
        new UpdateHandler();
    }
}
