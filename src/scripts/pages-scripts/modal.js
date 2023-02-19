import '../../modules/components/select.js';
import genresTemplate from '../../templates/select-template.hbs';

const genres = [
  'Action',
  'Adventure',
  'RPG',
  'Shooters',
  'Strategies',
  'Survival',
  'Action',
];

const refs = {
  genresElem: document.querySelector('.js-genres-list'),
  form: document.querySelector('js-create-form'),
};

function onLoadModal() {
  refs.genresElem.innerHTML = genresTemplate(genres);
}

onLoadModal();

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const game = {};

  for (let [key, value] of formData.entries()) {
    game[key] = value;
  }

  console.log(game);
});
