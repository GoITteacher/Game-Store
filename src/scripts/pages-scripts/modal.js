import '../../modules/components/select.js';
import ganresTemplate from '../../templates/select-template.hbs';

const backdrop = document.querySelector('.backdrop')
const ganres = ['Action','Adventure','RPG','Shooters','Strategies','Survival','Action',];
const ganresElem = document.querySelector('.js-ganres-list');

function onLoadModal(){
    ganresElem.innerHTML = ganresTemplate(ganres);
}

onLoadModal();

backdrop.addEventListener('click',(e)=>{
    if(e.target !== e.currentTarget)return;

    document.body.classList.remove('show');
})