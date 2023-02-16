import '../../modules/components/select.js';
import ganresTemplate from '../../templates/select-template.hbs';

const ganres = ['Action','Adventure','RPG','Shooters','Strategies','Survival','Action',];
const ganresElem = document.querySelector('.js-ganres-list');

function onLoadModal(){
    ganresElem.innerHTML = ganresTemplate(ganres);
}

onLoadModal();