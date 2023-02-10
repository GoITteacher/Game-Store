import gameTemplate from '../../templates/game-template.hbs';
import { DataBase } from '../../modules/database/index.js';
import { loadFromLS, saveToLS } from '../helpers';
import { HOST } from '../constants';
const refs = {
  gameListEl: document.querySelector('.js-game-list'),
  navMenuElem: document.querySelector('.js-nav-menu'),
};

let GAMES = [
  {
    os: 'Windows',
    media: [
      'https://source.unsplash.com/1920x1080/?random=7370&game',
      'https://source.unsplash.com/1920x1080/?random=8505&game',
      'https://source.unsplash.com/1920x1080/?random=1553&game',
      'https://source.unsplash.com/1920x1080/?random=5662&game',
    ],
    sale: 74,
    name: 'Incredible Wooden Pants',
    desc: 'Odio occaecati commodi sapiente dolores. Molestiae accusantium porro eum quas praesentium consequuntur deleniti. Fuga mollitia incidunt atque. Minima nisi fugit sapiente. Ratione explicabo saepe occaecati. Et esse eveniet accusamus veritatis esse quod.\nAliquid quasi saepe vel harum molestiae rerum occaecati minima distinctio. Sit culpa tempore adipisci cumque consequuntur consequatur minus quaerat. Consectetur esse blanditiis provident a nulla quas esse quasi a. Sint pariatur possimus quia eveniet asperiores facere. Consequuntur quasi similique.\nTenetur quae earum vel in eius. Illum soluta accusantium aliquam sapiente dicta ullam reprehenderit. Nisi aut voluptatum qui quibusdam. Deleniti itaque dolorum architecto omnis tenetur. At et voluptate.\nVeritatis consectetur adipisci iste temporibus. Rem aut laudantium. Mollitia ab corrupti non voluptatem dolor.\nImpedit explicabo voluptas aut dignissimos. Maiores natus velit. Voluptas asperiores aperiam ea quaerat consequuntur repellendus officia maxime dignissimos. Asperiores nemo quae quaerat porro quod labore ab. Fuga id suscipit velit.\nRecusandae totam fugiat vel ducimus quos vel labore. Facilis cum commodi in corporis reiciendis assumenda nemo recusandae. Aperiam cum consectetur in exercitationem earum. Numquam doloribus suscipit reiciendis quidem saepe necessitatibus dolore sunt. Adipisci non amet beatae dignissimos a debitis consectetur corporis harum.',
    date_release: {},
    publisher: 'Collier - Donnelly',
    images: [
      'https://source.unsplash.com/1920x1080/?random=6108&game',
      'https://source.unsplash.com/1920x1080/?random=3416&game',
      'https://source.unsplash.com/1920x1080/?random=7382&game',
      'https://source.unsplash.com/1920x1080/?random=5074&game',
    ],
    homepage: 'http://salty-shop.info',
    price: 9737,
    id: 'ldhsnw8c',
    genres: ['Metal', 'Funk', 'Soul'],
    author: 'Shelly Altenwerth',
  },
];

async function loadGames() {
  const games = await DataBase.getGames(1);
  GAMES = games;
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
  const currentGame = GAMES.find(el => el.id === gameEl.dataset.id);
  // console.log(games, gameEl);
  // TODO Якщо не знайшло такої гри то зробити запит на сервер
  saveToLS('currentGame', currentGame);
  window.location.pathname = `${HOST || '/Game-Store/'}game-info.html`;
});

function renderGame(games, reset = true) {
  const elems = refs.navMenuElem.querySelectorAll('[name]');
  const gameSort = elems[1].value;

  if (gameSort != 'null') {
    reset = true;
    games = GAMES;
  }

  games = sortArray(games);

  if (reset) refs.gameListEl.innerHTML = '';
  if (games.length) {
    refs.gameListEl.insertAdjacentHTML(
      'beforeend',
      games.map(gameTemplate).join('')
    );
  } else {
    refs.gameListEl.innerHTML = '';
  }
}

refs.navMenuElem.addEventListener('change', e => {
  renderGame(GAMES);
});

let isActiveQuery = false;
document.addEventListener('scroll', onWindowScroll);
async function onWindowScroll(e) {
  const element = e.target.documentElement;
  const clientHeight = element.clientHeight;
  const scrollHeight = element.scrollHeight - clientHeight;
  const scrollTop = scrollHeight - element.scrollTop;
  if (scrollTop < 600 && !isActiveQuery) {
    isActiveQuery = true;
    const games = await DataBase.getGames(DataBase.page + 1);

    if (games.length !== 0) {
      isActiveQuery = false;
      GAMES.push(...games);
      console.log(GAMES);
      renderGame(games, false);
    } else document.removeEventListener('scroll', onWindowScroll);
  }
}

function sortArray(games) {
  const elems = refs.navMenuElem.querySelectorAll('[name]');
  const gameName = elems[0].value;
  const gameSort = elems[1].value;
  const gameGenre = elems[2].value;
  const gameRating = elems[3].value;
  if (gameName) games = games.filter(el => el.name.includes(gameName));
  if (gameGenre != 'null')
    games = games.filter(el => el.genres.includes(gameGenre));
  if (gameRating != 'null')
    games = games.filter(el => Math.round(+el.rating) === +gameRating);

  if (gameSort != 'null') {
    games = [...games].sort((a, b) => {
      if (gameSort === 'name') {
        return a[gameSort].localeCompare(b[gameSort]);
      } else {
        return Number(a[gameSort]) - Number(b[gameSort]);
      }
    });
  }

  return games;
}
