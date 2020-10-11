import BackgroundApi from '../modules/backgroundApi';
import ContextMenu from '../modules/contextMenu';
import Analytics from '../modules/analytics';
import {UA_ID} from "../config";

(() => new BackgroundApi())();
(() => new ContextMenu())();
(() => new Analytics(UA_ID))();
