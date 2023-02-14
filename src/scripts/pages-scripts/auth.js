import { showError } from '../../modules/notiflix';
import { HOST } from '../constants';
import { Auth } from '../../modules/auth';

const authFormElem = document.querySelector('.js-auth-form');

authFormElem.addEventListener('submit', async e => {
  e.preventDefault();
  const login = e.currentTarget.elements.login.value;
  const password = e.currentTarget.elements.password.value;

  const isCorrect = await Auth.isCorrectPassword(login, password);

  if (isCorrect) {
    Auth.authorized(login, password);
    window.location.pathname = `${HOST}`;
  } else {
    showError('Login or Password is not correct!');
  }
});
