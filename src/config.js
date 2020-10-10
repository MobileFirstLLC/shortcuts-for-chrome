/**
 * @description List of all links featured in the menu.
 * The items in this list should be formatted so that 'chrome://' + item is a navigable url.
 * When adding/removing items also update the visible text label for item at:
 * ./assest/locales/en/links.json. If the url contains "-" or "/"
 * replace such chars with underscore "_" in the i18n dictionary.
 */
export const MenuLinks = ['accessibility', 'appcache-internals', 'apps', 'blob-internals',
    'bluetooth-internals', 'bookmarks', 'cache', 'chrome-urls', 'components',
    'conflicts', 'crashes', 'credits', 'device-log', 'devices', 'dino', 'discards',
    'dns', 'downloads', 'extensions', 'extensions/configureCommands', 'flags', 'flash',
    'gcm-internals', 'gpu', 'help', 'histograms', 'history', 'identity-internals',
    'indexeddb-internals', 'inspect', 'invalidations', 'local-state',
    'media-internals', 'nacl', 'net-export', 'net-internals', 'network-errors',
    'newtab', 'ntp-tiles-internals', 'omnibox', 'password-manager-internals',
    'policy', 'predictors', 'print', 'profiler', 'quota-internals',
    'serviceworker-internals', 'settings', 'settings/accessibility',
    'settings/appearance', 'settings/autofill', 'settings/defaultBrowser',
    'settings/importData', 'settings/languages', 'settings/onStartup',
    'settings/passwordsAndForms', 'settings/people', 'settings/printing',
    'settings/privacy', 'settings/reset', 'settings/search', 'settings/syncSetup',
    'settings/system', 'signin-internals', 'site-engagement', 'suggestions',
    'supervised-user-internals', 'sync-internals', 'system',
    'taskscheduler-internals', 'terms', 'tracing',
    'translate-internals', 'usb-internals', 'user-actions', 'version',
    'view-http-cache', 'webrtc-internals', 'webrtc-logs', 'media-engagement',
    'safe-browsing', 'settings/clearBrowserData', 'history/syncedTabs',
    'download-internals', 'interstitials', 'interventions-internals',
    'process-internals'];


/**
 * List of options to display in the context menu
 * @return {{twitter: {ww: number, wh: number, title: string, url: string}, facebook: {ww: number, wh: number, title: string, url: string}, chromeStore: {ww: number, wh: number, title: string, url: string}}}
 * @constructor
 */
export const ContextMenuOptions = () => {
    return {
        chromeStore: {
            title: 'ctx_rate', ww: 1200, wh: 800,
            url: '{URI}/reviews'
        },
        source: {
            title: 'ctx_source', url: 'https://github.com/mobilefirstllc/shortcuts-for-chrome'
        },
        twitter: {
            title: 'ctx_share_tw', ww: 600, wh: 500,
            url: 'https://twitter.com/intent/tweet?text={hash} {URI} '
        },
    };
}

/**
 * Analytics id
 * @type {string}
 */
export const UA_ID = "UA-129118591-4"
