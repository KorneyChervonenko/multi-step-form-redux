'use strict';
console.clear();
console.log('script started...');

import { CONFIG } from './config.mjs';

console.log(Object.values(CONFIG.plans).at(0));
