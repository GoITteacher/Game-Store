import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import gameTemplate from './templates/game-template.hbs';
import { DataBase } from './modules/mongodb/index.js';
const refs = {
  gameListEl: document.querySelector('.js-game-list'),
};

async function loadGames() {
  const games = await DataBase.getGames();
  refs.gameListEl.innerHTML = games.map(gameTemplate).join('');
}

loadGames();
