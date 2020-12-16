/**
 * List of options to display in the context menu
 * Links will open in new window when width/height (ww/wh) are not specified
 * Otherwise links will open in a popup window of specified size
 * @namespace ContextMenuOptions
 * @type Object.<Object>
 */
export const ContextMenuOptions = {
    source: {
        title: 'ctx_source',
        url: 'https://github.com/mobilefirstllc/shortcuts-for-chrome'
    },
    chromeStore: {
        title: 'ctx_rate',
        url: '{URI}/reviews'
    },
    share: {
        id: 'share',
        title: 'ctx_share'
    },
    twitter: {
        parentId: 'share',
        title: 'ctx_share_tw',
        ww: 600, wh: 500,
        url: 'https://twitter.com/intent/tweet?text={hash} {URI} '
    },
    facebook: {
        parentId: 'share',
        title: 'ctx_share_fb',
        ww: 600, wh: 700,
        url: 'https://www.facebook.com/sharer/sharer.php?u={URI}&amp;src=sdkpreparse'
    },
    reddit: {
        parentId: 'share',
        title: 'ctx_share_rd',
        url: 'https://www.reddit.com/submit?url={URI}'
    },
    linkedin: {
        parentId: 'share',
        title: 'ctx_share_li',
        ww: 600, wh: 500,
        url: 'https://www.linkedin.com/sharing/share-offsite/?url={URI}'
    },
    whatsapp: {
        parentId: 'share',
        title: 'ctx_share_wa',
        ww: 800, wh: 800,
        url: 'https://api.whatsapp.com/send/?phone&text={URI}'
    },
    pinterest: {
        parentId: 'share',
        title: 'ctx_share_pi',
        ww: 700, wh: 800,
        url: 'https://www.pinterest.com/pin/create/button/?url={URI}&media=' +
            'https://raw.githubusercontent.com/MobileFirstLLC/shortcuts-for-chrome/' +
            '68bf15ddb9f263b058a10340202ac775f0f4cf8d/assets/preview.gif'
    },
    copy: {
        id: 'copy',
        parentId: 'share',
        title: 'ctx_share_copy',
        url: '{URI}'
    }
};

/**
 * Analytics id - used within extension
 * @namespace UA_ID
 * @type string
 */
export const UA_ID = 'UA-129118591-4';

/**
 * App icon svg paths
 * @namespace SVGIconPaths
 * @type Object.<Object>
 */
export const SVGIconPaths = {
    addPin: {
        'd': 'M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,' +
            '5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z'
    },
    removePin: {
        'd': 'M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,' +
            '3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z'
    }
};
