import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { createGallery } from '../../modules/gallery';
import { formatDate, loadFromLS, saveToLS, isAuthorized } from '../helpers';
import { setRating } from '../../modules/stars';
import { DataBase } from '../../modules/database';
import { HOST } from '../constants';
import specTemplate from '../../templates/spec-template.hbs';

// ============================================

const refs = {
  loadMoreInfo: document.querySelector('.js-btn-more-info'),
  buyBtnElem: document.querySelector('.js-buy-btn'),
  cartBtnElem: document.querySelector('.js-cart-btn'),
  washListBtnElem: document.querySelector('.js-washlist-btn'),
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
  minSpec: document.querySelector('.js-min-specs'),
  recommendSpec: document.querySelector('.js-recommend-specs'),
};

const CONSTANTS = {
  isFullInfo: false,
  isAuthorized: loadFromLS('isAuthorized'),
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
  restyleButtons(game);
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

  if (game.specs) {
    const min = game.specs.minimum;
    const recommend = game.specs.recommend;

    for (const [key, value] of Object.entries(min)) {
      const template = specTemplate({ key, value });
      gamesElem.minSpec.insertAdjacentHTML('beforeend', template);

      let recTemplate;
      if (recommend[key]) {
        recTemplate = specTemplate({ key, value: recommend[key] });
      } else {
        recTemplate = specTemplate({ key: '', value: '' });
      }
      gamesElem.recommendSpec.insertAdjacentHTML('beforeend', recTemplate);
    }
  }

  createGallery(game.images);
  setRating(game.rating || (Math.random() * 5).toFixed(1));
}
// ============================================

refs.cartBtnElem.addEventListener('click', () => {
  if (!isAuthorized()) {
  }
  let cartList = loadFromLS('cartList') || [];
  const game = loadFromLS('currentGame') || {};

  if (cartList.find(el => el.id === game.id)) {
    cartList = cartList.filter(el => el.id !== game.id);
    saveToLS('cartList', cartList);
  } else {
    cartList.push(game);
    saveToLS('cartList', cartList);
  }

  restyleButtons(game);
});

refs.washListBtnElem.addEventListener('click', () => {
  let washList = loadFromLS('washList') || [];
  const game = loadFromLS('currentGame') || {};

  if (washList.find(el => el.id === game.id)) {
    washList = washList.filter(el => el.id !== game.id);
    saveToLS('washList', washList);
  } else {
    washList.push(game);
    saveToLS('washList', washList);
  }

  restyleButtons(game);
});

function restyleButtons(game) {
  const cartList = loadFromLS('cartList') || [];
  const washList = loadFromLS('washList') || [];

  if (!game) game = loadFromLS('currentGame');
  if (!game) return;

  if (cartList.find(el => el.id === game.id)) {
    refs.cartBtnElem.textContent = 'Remove from Cart';
  } else {
    refs.cartBtnElem.textContent = 'Add to Cart';
  }

  if (washList.find(el => el.id === game.id)) {
    refs.washListBtnElem.textContent = 'Remove from WashList';
  } else {
    refs.washListBtnElem.textContent = 'Add to WashList';
  }
}
