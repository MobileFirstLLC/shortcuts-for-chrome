import Background from './background';
import Analytics from '../modules/analytics';
import UpdateHandler from '../modules/onUpdate';
import {UA_ID} from '../config';

(() => new Analytics(UA_ID))();
(() => new Background())();
(() => new UpdateHandler())();
