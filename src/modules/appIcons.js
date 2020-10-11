import {SVGIconPaths} from '../config'

/**
 * Generates simple SVG icons dynamically
 * @module
 * @name AppIcons
 */
export default class AppIcons {

    /**
     * @description UI icons
     */
    static get icons() {
        return SVGIconPaths;
    }

    /**
     * @description Given some icon name, this function returns SVG element
     * @param {Object} icon - one of `appIcons.icons`
     * @param {String?} className - element class
     * @returns {string} - icon element as HTML
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
