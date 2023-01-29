import gameTemplate from '../../templates/game-template.hbs';
import { DataBase } from '../../modules/database/index.js';
import { loadFromLS, saveToLS } from '../helpers';
import { HOST } from '../constants';

const refs = {
  gameListEl: document.querySelector('.js-game-list'),
};

async function loadGames() {
  const games = await DataBase.getGames();
  console.log(games);
  if (games.length) {
    refs.gameListEl.innerHTML = games.map(gameTemplate).join('');
  } else {
    refs.gameListEl.children[0].style.opacity = '1';
  }
}

loadGames();

refs.gameListEl.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  const gameEl = e.target.closest('[data-id]');
  const games = loadFromLS('allGames') || [];
  const currentGame = games.find(el => el.id === gameEl.dataset.id);
  console.log(currentGame);
  // TODO Якщо не знайшло такої гри то зробити запит на сервер

  saveToLS('currentGame', currentGame);
  window.location.pathname = `${HOST}game-info.html`;
});
