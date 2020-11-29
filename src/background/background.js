import BackgroundApi from '../modules/backgroundApi';
import ContextMenu from '../modules/contextMenu';

/**
 * @class
 * @name Background
 * @classdesc This class is responsible for setting up event handlers and actions that
 * happen in the background context of the browser. It
 *
 * 1. initialize the message passing API
 * 2. sets up extension context menu
 */
export default class Background {
    constructor() {
        // eslint-disable-next-line no-new
        new BackgroundApi();
        // eslint-disable-next-line no-new
        new ContextMenu();
    }
}
