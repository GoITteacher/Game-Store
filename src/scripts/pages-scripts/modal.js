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
  genresElem: document.querySelector('.js-genres-list')
};

function onLoadModal() {
  refs.genresElem.innerHTML = genresTemplate(genres);
}

onLoadModal();
