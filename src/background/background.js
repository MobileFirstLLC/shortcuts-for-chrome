import BackgroundApi from '../components/backgroundApi';
import ContextMenu from '../components/contextMenu';
import Analytics from '../components/analytics';
import {UA_ID} from "../config";

(() => new BackgroundApi())();
(() => new ContextMenu())();
(() => new Analytics(UA_ID))();
