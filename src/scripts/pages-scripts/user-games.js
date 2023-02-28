import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { DataBase } from '../../modules/database';
import { loadFromLS, redirect } from '../helpers';
import gamesTemplate from '../../templates/user-games.hbs';

const refs = {
  addGameBtn: document.querySelector('.js-add-game'),
  backdrop: document.querySelector('.backdrop'),
  createForm: document.querySelector('.js-create-form'),
  errorPage: document.querySelector('.js-error-page'),
  gamesListElem: document.querySelector('.js-cart-list'),
  addBtn: document.querySelector('.js-btn-add'),
};

// =========== MODAL =================================
function initModal() {
  refs.addGameBtn.addEventListener('click', openModal);
  refs.addBtn.addEventListener('click', openModal);

  function openModal() {
    document.body.classList.add('show');
    document.addEventListener('keydown', onClose);
  }

  function onClose(e) {
    if (e.key == 'Escape') {
      closeModal();
    }
  }
  function closeModal() {
    document.body.classList.remove('show');
    document.removeEventListener('keydown', onClose);
  }
  refs.backdrop.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  });
  function closeModal() {
    document.body.classList.remove('show');
  }
}
initModal();
// ====================================================

refs.createForm.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const game = {...DataBase.randomGame()};

  game.date_release = Date.now();
  for (let [key, value] of formData.entries()) {
    key = key.replace('game_','')
    game[key] = value;
  }

  const gameId = await DataBase.createGame(game);
  DataBase.addGameForUser(gameId);
  renderGames();
  document.body.classList.remove('show');
  e.target.reset();
});

renderGames();
async function renderGames() {
  
  const userGames = loadFromLS('user')?.games || [];

  const games = await DataBase.getGame(...userGames);
  if (games.length === 0) {
    refs.gamesListElem.innerHTML = '';
    refs.errorPage.classList.remove('hide');
    refs.addBtn.classList.add('hide');
    return;
  }
  refs.addBtn.classList.remove('hide');
  refs.errorPage.classList.add('hide');

  refs.gamesListElem.innerHTML = games.map(gamesTemplate).join('');
}

refs.gamesListElem.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  const liElem = e.target.closest('li');
  const gameId = liElem.dataset.id;

  if (e.target.nodeName === 'BUTTON') deleteGame(gameId);
  else {
    redirect('game-info.html', `?id=${gameId}`);
  }
});

function deleteGame(gameId) {
  DataBase.deleteGame(gameId);
  DataBase.removeGameFromUser(gameId);
  renderGames();
}
