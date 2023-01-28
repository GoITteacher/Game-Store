import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { loadFromLS } from './helpers';
import { setRating } from '../modules/stars';

// ============================================

const refs = {
  loadMoreInfo: document.querySelector('.js-btn-more-info'),
};

const CONSTANTS = {
  isFullInfo: false,
};

// ============================================

refs.loadMoreInfo.addEventListener('click', e => {});

// ============================================
let currentGame;
function onLoadPage() {
  currentGame = loadFromLS('currentGame');
  if (!currentGame) {
    window.location.pathname = '/';
  }
  setRating(4.7);
}
onLoadPage();
