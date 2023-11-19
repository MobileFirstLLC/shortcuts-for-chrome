/**
 * This index file gives a centralized module to import
 * extension's core functionality, without having to
 * worry about absolute physical locations.
 */
export {default as Background} from './background/index';
export {default as Popup} from './popup/index';
export {default as RecentLinks} from './shared/recent';
export {default as Storage} from './shared/storage';
export {MenuLinks} from './shared/links.json';
export {Config} from './shared/config';
