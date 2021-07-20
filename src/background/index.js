/* eslint-disable no-new */

import Api from './api';
import ContextMenu from './contextMenu';
import UpdateHandler from './update';

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
        new Api();
        new ContextMenu();
        new UpdateHandler();
    }
}
