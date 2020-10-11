import Popup from './popup';
import Analytics from '../modules/analytics';
import {UA_ID} from "../config";

(() => new Popup())();
(() => new Analytics(UA_ID))();
