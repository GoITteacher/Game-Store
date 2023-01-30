import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './pages-scripts/library';

import { DatabaseAPI } from '../modules/database/database';
DatabaseAPI.createTable('games');
