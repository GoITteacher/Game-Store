import { isAuthorized, saveToLS } from '../helpers.js';
import { HOST } from '../constants.js';

const refs = {
  logIn: document.querySelector('.js-login'),
  logOut: document.querySelector('.js-logout'),
  cartList: document.querySelector('.js-cart-link'),
  wishList: document.querySelector('.js-wishlist-link'),
  storeLink: document.querySelector('.js-store-link'),
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
  if (window.location.pathname.includes('cart.html')) {
    const origin = window.location.origin;
    const newUrl = `${origin}${HOST}`;
    window.location.replace(newUrl);
  }
});

refs.cartList.addEventListener('click', () => {
  console.log(window.location);
  const origin = window.location.origin;
  const newUrl = `${origin}${HOST}cart.html?cart`;
  window.location.replace(newUrl);
});

function checkActiveLink() {
  const path = window.location.pathname;
  const search = window.location.search;

  if (search.includes('cart')) {
    refs.cartList.classList.add('active-link');
  } else if (search.includes('wishList')) {
    refs.cartList.classList.add('active-link');
  } else if (path.includes('game-info')) {
    // refs.storeLink.classList.add('active-link');
  } else {
    refs.storeLink.classList.add('active-link');
  }
}

checkActiveLink();
