import ContextMenu from './contextMenu';

/**
 * @class Background
 *
 * @description Initializes all background scripts.
 *
 * !!! example "Initialize background scripts"
 *     ```js linenums="0"
 *     new Background();
 *     ```
 *
 * @classdesc The background class sets up all functionality and event
 * handlers in the extension's background context. Currently, this
 * module sets up the extension context menu. Instantiate `Background`
 * to activate this functionality. The instantiation must be run in the
 * extension's background context.
 */
export default class Background {

    constructor() {
        ContextMenu.initialize();
    }
}
