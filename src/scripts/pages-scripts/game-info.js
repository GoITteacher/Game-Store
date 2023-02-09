import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { createGallery } from '../../modules/gallery';
import { formatDate, loadFromLS, saveToLS } from '../helpers';
import { setRating } from '../../modules/stars';
import { DataBase } from '../../modules/database';
import { HOST } from '../constants';

// ============================================

const refs = {
  loadMoreInfo: document.querySelector('.js-btn-more-info'),
};

const gamesElem = {
  gameTitle: document.querySelector('.js-game-title'),
  gameName: document.querySelector('.js-game-name'),
  gameDesc: document.querySelector('.js-game-desc'),
  gameDeveloper: document.querySelector('.js-game-developer'),
  gamePublisher: document.querySelector('.js-game-publisher'),
  gameRelease: document.querySelector('.js-game-release'),
  gamePlatform: document.querySelector('.js-game-platform'),
  gamePrice: document.querySelector('.js-game-price'),
};

const CONSTANTS = {
  isFullInfo: false,
};

// ============================================

refs.loadMoreInfo.addEventListener('click', e => {
  const infoElem = document.querySelector('.game-desc');
  const shadowElem = document.querySelector('.bottom-shadow');
  if (CONSTANTS.isFullInfo) {
    infoElem.style.maxHeight = '190px';
    shadowElem.classList.remove('hide');
    e.currentTarget.textContent = 'SHOW MORE';
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

  loadInfo(currentGame);
}
onLoadPage();

function loadInfo(game) {
  console.log(game);

  gamesElem.gameDesc.innerHTML = `<p>${game.desc
    .split('\n')
    .join('. </p><p>')}</p>`;

  gamesElem.gameTitle.textContent = game.name;
  gamesElem.gameName.textContent = game.name;
  gamesElem.gameDeveloper.textContent = game.author;
  gamesElem.gamePublisher.textContent = game.publisher;
  gamesElem.gamePlatform.textContent = game.os;
  gamesElem.gamePrice.textContent = game.price;
  gamesElem.gameRelease.textContent = formatDate(new Date(game.date_release));

  createGallery(game.images);
  setRating(game.rating || (Math.random() * 5).toFixed(1));
}

setTimeout(() => {
  window.addEventListener('wheel', event => {
    console.log('Scrolling...');
  });
}, 3000);
