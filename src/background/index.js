/* eslint-disable no-new */

// import Api from './api';
import ContextMenu from './contextMenu';

/**
 * @module
 * @name Background
 *
 * @description This module is responsible for setting up all event handlers
 * and actions that happen in the background context of the extension.
 *
 * Currently this module sets up extension context menu.
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
        new ContextMenu();
    }
}
