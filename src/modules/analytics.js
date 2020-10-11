/**
 * Google analytics wrapper
 * @module
 * @name Analytics
 */
export default class Analytics {

    constructor(UA_id) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            };
            i[r].l = 1 * new Date();
            a = s.createElement(o);
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            if (m && m.parentNode) m.parentNode.insertBefore(a, m);
        })(window, document, 'script',
            'https://www.google-analytics.com/analytics.js', 'ga');
        window.ga('create', UA_id, 'auto');
        window.ga('set', 'checkProtocolTask', null);
        window.ga('set', 'transport', 'beacon');
    }

    /**
     * @description raise ga event
     * @param {String} action
     * @param {String} label
     * @param {String} category
     */
    logEvent(action = 'action', label = 'label', category = 'category') {
        window.ga('send', 'event', category, action, label, 1);
    }
}
