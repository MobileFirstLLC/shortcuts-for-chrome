/**
 * @constant
 * @static
 * @readonly
 * @name Config
 * @type {Object}
 * @description Application configurations.
 */
export const Config = Object.freeze({

    /**
     * @constant
     * @memberOf Config
     * @name recentIntervalMillis
     * @type {number}
     * @description When a link clicked within last X milliseconds,
     * it is considered "recently used".
     */
    recentIntervalMillis: 10 * 60 * 1000, // 10 minutes

    /**
     * @constant
     * @enum {{path: string}}
     * @memberOf Config
     * @name SVGIcons
     * @description App icons svg paths.
     */
    SVGIcons: {
        /**
         * @constant
         * @memberOf Config.SVGIcons
         * @name unpinnedLink
         * @type {{path: string}}
         * @description SVG icon for an unpinned menu link.
         */
        unpinnedLink: {
            path: 'M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,' +
                '5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z'
        },
        /**
         * @constant
         * @memberOf Config.SVGIcons
         * @name activePin
         * @type {{path: string}}
         * @description SVG icon for a pinned menu link.
         */
        activePin: {
            path: 'M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89' +
                '5.9,3 7,3H17M11,14L17.25,7.76L15.84,6.34L11,' +
                '11.18L8.41,8.59L7,10L11,14Z'
        }
    },

    /**
     * @constant
     * @memberOf Config
     * @name ContextMenuOptions
     * @enum {{title:string, url:string, id:string, parentId:string, ww:
     * number, wh:number }}
     * @description List of options to display in the context menu.
     * Links will open in new tab when width/height (ww/wh) are not
     * specified. Otherwise, links will open in a window of specified
     * size.
     */
    ContextMenuOptions: {
        /**
         * @constant
         * @memberOf Config.ContextMenuOptions
         * @description link to source code.
         */
        source: {
            title: 'Source code',
            url: 'https://github.com/mobilefirstllc/shortcuts-for-chrome'
        },
        /**
         * @constant
         * @memberOf Config.ContextMenuOptions
         * @description Link to Chrome web store.
         */
        chromeStore: {
            title: 'Rate extension',
            url: '{URI}/reviews'
        },
        /**
         * @constant
         * @memberOf Config.ContextMenuOptions
         * @description Link to POEditor.
         */
        translate: {
            title: 'Help translate',
            url: 'https://poeditor.com/join/project?hash=c2ihN8duR2'
        }
    }
});
