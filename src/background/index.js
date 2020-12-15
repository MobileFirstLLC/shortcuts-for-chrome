import Background from './background';
import Analytics from '../modules/analytics';
import {UA_ID} from '../config';

(() => new Analytics(UA_ID))();
(() => new Background())();
