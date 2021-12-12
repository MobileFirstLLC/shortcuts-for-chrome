import ContextMenu from './contextMenu';

/**
 * @class Background
 *
 * @description Initialize background scripts.
 *
 * @example
 * ```js title="Initialize background"
 * new Background();
 * ```
 *
 * @classdesc This module sets up all functionality and event handlers in the background
 * context of the extension. Currently, this module sets up extension context menu.
 * Instantiate background to activate this functionality.
 */
export default class Background {

    constructor() {
        ContextMenu.initialize();
    }
}
