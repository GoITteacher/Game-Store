import { isAuthorized, redirect, saveToLS } from '../helpers.js';
import { HOST } from '../constants.js';

const refs = {
  logIn: document.querySelector('.js-login'),
  logOut: document.querySelector('.js-logout'),
  cartList: document.querySelector('.js-cart-link'),
  wishList: document.querySelector('.js-wishlist-link'),
  storeLink: document.querySelector('.js-store-link'),
  userGamesLink: document.querySelector('.js-users-games'),
};

function checkAuth() {
  if (isAuthorized()) {
    refs.logIn.classList.add('hide');
    refs.logOut.classList.remove('hide');
    refs.cartList.classList.remove('hide');
    refs.wishList.classList.remove('hide');
    refs.userGamesLink.classList.remove('hide');
  } else {
    refs.logIn.classList.remove('hide');
    refs.logOut.classList.add('hide');
    refs.cartList.classList.add('hide');
    refs.wishList.classList.add('hide');
    refs.userGamesLink.classList.add('hide');
  }
}

checkAuth();

refs.logOut.addEventListener('click', e => {
  e.preventDefault();
  saveToLS('isAuthorized', false);
  localStorage.removeItem('user');
  localStorage.clear();
  checkAuth();
  if (window.location.pathname.includes('cart.html')) {
    redirect();
  }
});

refs.cartList.addEventListener('click', () => {
  redirect('cart.html', '?cart');
});
refs.wishList.addEventListener('click', () => {
  redirect('cart.html', '?wishlist');
});
refs.userGamesLink.addEventListener('click', () => {
  redirect('user-games.html');
});
refs.storeLink.addEventListener('click', () => {
  redirect();
});

function checkActiveLink() {
  const path = window.location.pathname;
  const search = window.location.search;

  if (search.includes('cart')) {
    refs.cartList.classList.add('active-link');
  } else if (search.includes('wishlist')) {
    refs.wishList.classList.add('active-link');
  } else if (path.includes('game-info')) {
    // refs.storeLink.classList.add('active-link');
  } else if (path.includes('user-games')) {
    refs.userGamesLink.classList.add('active-link');
  } else {
    refs.storeLink.classList.add('active-link');
  }
}

checkActiveLink();
