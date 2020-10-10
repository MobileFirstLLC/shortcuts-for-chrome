import {ContextMenuOptions} from '../config'

/**
 * @class
 * @classdesc Share module contains the configuration and options for social sharing
 */
class Share {

    /**
     * @description List of all available share options
     * @returns {Object}
     */
    static get options() {
        return ContextMenuOptions();
    }

    /**
     * @returns Object
     */
    static label(key) {
        let loc = window.chrome.i18n.getMessage(key);

        if (loc) return loc;

        switch (key) {
            case Share.options.chromeStore.title:
                return 'Rate Extension';
            case Share.options.facebook.title:
                return 'Share on Facebook';
            case Share.options.twitter.title:
                return 'Share on Twitter';
        }
        return '';
    }

    /**
     * @function
     * @description Constructs absolute shareable url then calls the callback function
     * @param {Object} channel - one of `share.options`
     * @param {function} callback - function to call after share url
     * has been resolved. The first param of the callback function is the full url returned by this function.
     */
    static onClick(channel, callback) {
        const manifest = window.chrome.runtime.getManifest(),
            url = channel.url
                .replace('{hash}', '%23' + ((manifest.short_name || '').replace(/ /g, '')))
                .replace('{URI}', manifest.homepage_url);

        return callback(url);
    }
}

export default Share;
