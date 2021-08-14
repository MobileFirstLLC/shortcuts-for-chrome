/**
 * Various application configs
 * @module
 * @name AppConfig
 */
export const AppConfig = {

    /**
     * @name recentIntervalMillis
     * @type number
     * @description When a link clicked within last X milliseconds,
     * it is considered "recently used".
     */
    recentIntervalMillis: 10 * 60 * 1000, // 10 minutes

    /**
     * App icons svg paths
     * @name SVGIcons
     * @type {{unpinnedLink: Object, activePin:Object}}
     */
    SVGIcons: {
        /**
         * @description SVG icon for an unpinned menu link
         */
        unpinnedLink: {
            /**
             * @type string
             * @description vector path
             */
            d: 'M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,' +
                '5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z'
        },
        /**
         * @description SVG icon for an pinned menu link
         * @returns {{d:String}}
         */
        activePin: {
            /**
             * @type string
             * @description vector path
             */
            d: 'M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,' +
                '3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z'
        }
    },

    /**
     * List of options to display in the context menu. Links will open in new
     * tab when width/height (ww/wh) are not specified. Otherwise links will
     * open in a window of specified size.
     * @name ContextMenuOptions
     * @type Object.<Object>
     */
    ContextMenuOptions: {
        source: {
            title: 'Source code',
            url: 'https://github.com/mobilefirstllc/shortcuts-for-chrome'
        },
        chromeStore: {
            title: 'Rate extension',
            url: '{URI}/reviews'
        },
        translate: {
            title: 'Help translate',
            url: 'https://poeditor.com/join/project?hash=c2ihN8duR2'
        },
        share: {
            id: 'share',
            title: 'Share...'
        },
        twitter: {
            parentId: 'share',
            title: 'Twitter',
            ww: 600, wh: 500,
            url: 'https://twitter.com/intent/tweet?text={hash} {URI} '
        },
        facebook: {
            parentId: 'share',
            title: 'Facebook',
            ww: 600, wh: 700,
            url: 'https://www.facebook.com/sharer/sharer.php?u={URI}&amp;src=sdkpreparse'
        },
        reddit: {
            parentId: 'share',
            title: 'Reddit',
            url: 'https://www.reddit.com/submit?url={URI}'
        },
        linkedin: {
            parentId: 'share',
            title: 'LinkedIn',
            ww: 600, wh: 500,
            url: 'https://www.linkedin.com/sharing/share-offsite/?url={URI}'
        },
        whatsapp: {
            parentId: 'share',
            title: 'Whatsapp',
            ww: 800, wh: 800,
            url: 'https://api.whatsapp.com/send/?phone&text={URI}'
        },
        pinterest: {
            parentId: 'share',
            title: 'Pinterest',
            ww: 700, wh: 800,
            url: 'https://www.pinterest.com/pin/create/button/?url={URI}&media=' +
                'https://raw.githubusercontent.com/MobileFirstLLC/shortcuts-for-chrome/' +
                '68bf15ddb9f263b058a10340202ac775f0f4cf8d/assets/preview.gif'
        }
    }
};
