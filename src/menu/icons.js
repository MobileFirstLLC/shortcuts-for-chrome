/**
 *  @class
 *  @classdesc Generates simple SVG icons dynamically
 */
class AppIcons {

    /**
     * @description UI icons
     * @returns {Object}
     */
    static get icons() {
        return {
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
    }

    /**
     * @description Given some icon name, this function returns SVG element
     * @param {Object} icon - one of `appIcons.icons`
     * @param {String?} className - element class
     * @returns {Element} - icon element
     */
    static generateIcon(icon, className) {
        let svg = document.createElement('svg'),
            path = document.createElement('path');

        path.setAttribute('d', icon.d);
        svg.setAttribute('class', className);
        svg.setAttribute('viewBox', [0, 0, (icon.w || 24), (icon.h || 24)].join(' '));
        svg.appendChild(path);
        return svg.outerHTML;
    }
}

export default AppIcons;
