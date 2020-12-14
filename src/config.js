/**
 * List of all links featured in the menu.
 *
 * The items in this list should be formatted so that `'chrome://' + item` is a navigable url.
 *
 * When adding/removing items also update the visible text label for the item at:
 * `./assest/locales/en/links.json`. If the url contains characters `-` or `/`
 * replace the chars with underscore `_` in the links.json dictionary.
 *
 * @namespace MenuLinks
 * @type Array.<string>
 */
export const MenuLinks = [
    'accessibility', 'appcache-internals', 'apps', 'autofill-internals', 'blob-internals',
    'bluetooth-internals', 'bookmarks', 'chrome-urls', 'components', 'conversion-internals',
    'crashes', 'credits', 'device-log', 'devices', 'dino', 'discards', 'download-internals',
    'downloads', 'extensions', 'extensions/configureCommands', 'flags', 'gcm-internals', 'gpu',
    'help', 'histograms', 'history', 'history/syncedTabs', 'identity-internals', 'indexeddb-internals',
    'inspect', 'internals/web-app', 'interstitials', 'interventions-internals', 'invalidations',
    'local-state', 'management', 'media-engagement', 'media-internals', 'nacl', 'net-export', 'net-internals',
    'network-errors', 'newtab', 'ntp-tiles-internals', 'omnibox', 'password-manager-internals',
    'policy', 'predictors', 'prefs-internals', 'print', 'process-internals', 'quota-internals', 'safe-browsing',
    'serviceworker-internals', 'settings', 'settings/accessibility', 'settings/appearance',
    'settings/autofill', 'settings/clearBrowserData', 'settings/defaultBrowser', 'settings/importData',
    'settings/languages', 'settings/onStartup', 'settings/passwords', 'settings/people', 'settings/printing',
    'settings/privacy', 'settings/reset', 'settings/search', 'settings/syncSetup', 'settings/system',
    'signin-internals', 'site-engagement', 'suggestions', 'sync-internals', 'system', 'terms',
    'tracing', 'translate-internals', 'ukm', 'usb-internals', 'user-actions', 'version', 'webrtc-internals',
    'webrtc-logs'
];

/**
 * List of options to display in the context menu
 * Links will open in new window when width/height (ww/wh) are not specified
 * Otherwise links will open in a popup window of specified size
 * @namespace ContextMenuOptions
 * @type Object.<Object>
 */
export const ContextMenuOptions = {
    chromeStore: {
        title: 'ctx_rate',
        url: '{URI}/reviews'
    },
    source: {
        title: 'ctx_source',
        url: 'https://github.com/mobilefirstllc/shortcuts-for-chrome'
    },
    twitter: {
        title: 'ctx_share_tw',
        ww: 600, wh: 500,
        url: 'https://twitter.com/intent/tweet?text={hash} {URI} '
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
    'bookmarkEmpty': {
        'd': 'M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,' +
            '5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z'
    },
    'bookmarkChecked': {
        'd': 'M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,' +
            '3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z'
    },
    'arrowBack': {
        'd': 'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z'
    }
};
