/**
 * @description List of all links featured in the menu.
 * The items in this list should be formatted so that 'chrome://' + item is a navigable url.
 * When adding/removing items also update the visible text label for item at:
 * ./assest/locales/en/links.json. If the url contains "-" or "/"
 * replace such chars with underscore "_" in the i18n dictionary.
 */
export const MenuLinks = [
    "accessibility", "appcache-internals", "apps", "autofill-internals", "blob-internals", "bluetooth-internals", "bookmarks",
    "chrome-urls", "components", "conversion-internals", "crashes", "credits", "device-log", "devices", "dino", "discards",
    "download-internals", "downloads", "extensions", "extensions/configureCommands", "flags",
    "gcm-internals", "gpu", "help", "histograms", "history", "history/syncedTabs", "identity-internals",
    "indexeddb-internals", "inspect", "internals/web-app", "interstitials", "interventions-internals", "invalidations",
    "local-state", "management", "media-engagement", "media-internals", "nacl", "net-export", "net-internals",
    "network-errors", "newtab", "ntp-tiles-internals", "omnibox", "password-manager-internals",
    "policy", "predictors", "prefs-internals", "print", "process-internals", "quota-internals", "safe-browsing",
    "serviceworker-internals", "settings", "settings/accessibility", "settings/appearance",
    "settings/autofill", "settings/clearBrowserData", "settings/defaultBrowser", "settings/importData",
    "settings/languages", "settings/onStartup", "settings/passwords", "settings/people", "settings/printing",
    "settings/privacy", "settings/reset", "settings/search", "settings/syncSetup", "settings/system",
    "signin-internals", "site-engagement", "suggestions", "sync-internals", "system", "terms",
    "tracing", "translate-internals", "ukm", "usb-internals", "user-actions", "version", "webrtc-internals",
    "webrtc-logs"
];

/**
 * List of options to display in the context menu
 * @return {{twitter: {ww: number, wh: number, title: string, url: string}, facebook: {ww: number, wh: number, title: string, url: string}, chromeStore: {ww: number, wh: number, title: string, url: string}}}
 * @constructor
 */
export const ContextMenuOptions = () => {
    return {
        chromeStore: {title: 'ctx_rate', url: '{URI}/reviews'},
        source: {title: 'ctx_source', url: 'https://github.com/mobilefirstllc/shortcuts-for-chrome'},
        twitter: {title: 'ctx_share_tw', ww: 600, wh: 500, url: 'https://twitter.com/intent/tweet?text={hash} {URI} '},
    };
}

/**
 * Analytics id
 * @type {string}
 */
export const UA_ID = "UA-129118591-4"
