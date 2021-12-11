/* eslint-disable no-new */

import ContextMenu from './contextMenu';

/**
 * @description This module sets up all functionality and event handlers
 * in the background context of the extension. Currently, this module sets
 * up extension context menu. Instantiate background to enable this
 * functionality.
 *
 * @example
 * ```
 * new Background()
 * ```
 *
 * @class Background
 * @kind module
 */
export default class Background {

    constructor() {
        new ContextMenu();
    }
}
