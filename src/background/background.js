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
 * @description This module is responsible for setting up all event handlers
 * and actions that happen in the background context of the extension.
 *
 * This module will:
 *
 * 1. initialize the message passing API
 * 2. sets up extension context menu
 * 3. bind updateHandler
 *
 * Instantiate `new Background()` to enable this functionality.
 */
export default class Background {

    /**
     * @constructor
     * @name Background
     * @description Instantiate Background to bind background behavior.
     */
    constructor() {
        new BackgroundApi();
        new ContextMenu();
        new UpdateHandler();
    }
}
