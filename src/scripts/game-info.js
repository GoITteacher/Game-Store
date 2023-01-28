import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { createGallery } from '../modules/gallery';
import { loadFromLS, saveToLS } from './helpers';
import { setRating } from '../modules/stars';
import { DataBase } from '../modules/mongodb';
import { HOST } from './constants';

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
    e.currentTarget.textContent = 'SHOW LESS';
  } else {
    infoElem.style.maxHeight = 'none';
    shadowElem.classList.add('hide');
    e.currentTarget.textContent = 'SHOW LESS';
  }

  CONSTANTS.isFullInfo = !CONSTANTS.isFullInfo;
});

// ============================================
let currentGame;
async function onLoadPage() {
  let gameId = window.location.search.replace('?id=', '');
  currentGame = loadFromLS('currentGame');

  if (!currentGame && gameId == '') {
    window.location.pathname = HOST;
  } else if (!currentGame) {
    currentGame = await DataBase.getGame(gameId);
    saveToLS('currentGame', currentGame);
  } else {
    // TODO
    // window.location.search = `?id=${currentGame.id}`;
  }

  setRating(5);
  createGallery(currentGame.images);
}
onLoadPage();
