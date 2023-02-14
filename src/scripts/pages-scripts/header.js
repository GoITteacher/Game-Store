import { isAuthorized, saveToLS } from '../helpers.js';
import { HOST } from '../constants.js';

const refs = {
  logIn: document.querySelector('.js-login'),
  logOut: document.querySelector('.js-logout'),
  cartList: document.querySelector('.js-cart-link'),
  wishList: document.querySelector('.js-wishlist-link'),
};

function checkAuth() {
  if (isAuthorized()) {
    refs.logIn.classList.add('hide');
    refs.logOut.classList.remove('hide');
    refs.cartList.classList.remove('hide');
    refs.wishList.classList.remove('hide');
  } else {
    refs.logIn.classList.remove('hide');
    refs.logOut.classList.add('hide');
    refs.cartList.classList.add('hide');
    refs.wishList.classList.add('hide');
  }
}

checkAuth();

refs.logOut.addEventListener('click', e => {
  e.preventDefault();
  saveToLS('isAuthorized', false);
  localStorage.removeItem('user');
  checkAuth();
});

refs.cartList.addEventListener('click', () => {
  window.location.pathname = { HOST };
});
