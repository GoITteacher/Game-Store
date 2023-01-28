import gameTemplate from '../templates/game-template.hbs';
import { DataBase } from '../modules/mongodb/index.js';
import { loadFromLS, saveToLS } from './helpers';

const refs = {
  gameListEl: document.querySelector('.js-game-list'),
};

async function loadGames() {
  const games = await DataBase.getGames();
  refs.gameListEl.innerHTML = games.map(gameTemplate).join('');
}

loadGames();

refs.gameListEl.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  const gameEl = e.target.closest('[data-id]');
  const games = loadFromLS('allGames') || [];
  const currentGame = games.find(el => +el.id === +gameEl.dataset.id);

  // TODO Якщо не знайшло такої гри то зробити запит на сервер

  saveToLS('currentGame', currentGame);
  window.location.pathname = `/Game-Store/game-info.html`;
});
