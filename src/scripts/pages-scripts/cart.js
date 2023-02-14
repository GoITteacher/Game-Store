import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import gamesTemplate from '../../templates/cart-list-item.hbs';
import { loadFromLS, redirect } from '../helpers.js';

const refs = {
  listElem: document.querySelector('.js-cart-list'),
};

function onLoadPage() {
  const search = window.location.search;
  let games;
  if (search.includes('cart')) {
    games = loadFromLS('cartList');
  } else {
    games = loadFromLS('wishList');
  }

  refs.listElem.innerHTML = games.map(gamesTemplate).join('');
}

onLoadPage();

refs.listElem.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  const elem = e.target.closest('li[data-id]');
  localStorage.removeItem('currentGame');
  redirect('game-info.html', `?id=${elem.dataset.id}`);
});
