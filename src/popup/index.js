import Popup from './popup';
import Analytics from '../components/analytics';
import {UA_ID} from "../config";

(() => new Popup())();
(() => new Analytics(UA_ID))();
