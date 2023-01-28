import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { loadFromLS, saveToLS } from './helpers';
import { setRating } from '../modules/stars';
import { DataBase } from '../modules/mongodb';

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
async function onLoadPage() {
  const gameId = +window.location.search.replace('?id=', '');
  currentGame = loadFromLS('currentGame');

  if (!currentGame && !gameId) {
    window.location.pathname = '/Game-Store/';
  } else if (!currentGame) {
    currentGame = await DataBase.getGame(gameId);
    saveToLS('currentGame', currentGame);
  }

  setRating(5);
}

onLoadPage();
