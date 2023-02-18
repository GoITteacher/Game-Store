import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import gamesTemplate from '../../templates/cart-list-item.hbs';
import { loadFromLS, redirect } from '../helpers.js';

const refs = {
  listElem: document.querySelector('.js-cart-list'),
  errorElem: document.querySelector('.js-error-page'),
};

function onLoadPage() {
  const search = window.location.search;
  let games;
  if (search.includes('cart')) {
    games = loadFromLS('cartList');
  } else {
    games = loadFromLS('wishList');
  }

  if (!games || !games.length) {
    refs.errorElem.classList.remove('hide');
    return;
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
