import { loadFromLS } from './helpers';

let currentGame;

function onLoadPage() {
  currentGame = loadFromLS('currentGame');
  if (!currentGame) {
    window.location.pathname = '/';
  }
}

onLoadPage();
