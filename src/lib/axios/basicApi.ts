import axios from 'axios';

import { defaultConfig } from './defaultConfig';

export const basicAPI = axios.create(defaultConfig);
