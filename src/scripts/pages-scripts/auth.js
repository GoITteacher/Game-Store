import { showError } from '../../modules/notiflix';
import { HOST } from '../constants';
import { Auth } from '../../modules/auth';
import { redirect } from '../helpers';

const authFormElem = document.querySelector('.js-auth-form');

authFormElem.addEventListener('submit', async e => {
  e.preventDefault();
  const login = e.currentTarget.elements.login.value;
  const password = e.currentTarget.elements.password.value;

  const isCorrect = await Auth.isCorrectPassword(login, password);

  if (isCorrect) {
    Auth.authorized(login, password);
    redirect();
  } else {
    showError('Login or Password is not correct!');
  }
});
