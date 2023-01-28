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

refs.loadMoreInfo.addEventListener('click', e => {
  const infoElem = document.querySelector('.game-desc');
  const shadowElem = document.querySelector('.bottom-shadow');
  if (CONSTANTS.isFullInfo) {
    infoElem.style.maxHeight = '200px';
    shadowElem.classList.remove('hide');
  } else {
    infoElem.style.maxHeight = 'none';
    shadowElem.classList.add('hide');
  }

  CONSTANTS.isFullInfo = !CONSTANTS.isFullInfo;
});

// ============================================
let currentGame;
function onLoadPage() {
  currentGame = loadFromLS('currentGame');
  if (!currentGame) {
    window.location.pathname = '/Game-Store/';
  }
  setRating(4.7);
}
onLoadPage();
