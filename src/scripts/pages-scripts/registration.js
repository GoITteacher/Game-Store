import { showError } from '../../modules/notiflix';
import { HOST } from '../constants';
import { Auth } from '../../modules/auth';

const authFormElem = document.querySelector('.js-auth-form');

authFormElem.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const login = e.currentTarget.elements.login.value;
  const password = e.currentTarget.elements.password.value;
  const password2 = e.currentTarget.elements['check-password'].value;

  if (login.length < 4) {
    showError('Login length must be greater than 3!');
    return;
  }
  const isFreeLogin = await Auth.isFreeLogin(login);
  if (!isFreeLogin) {
    showError('Login already in use!');
    return;
  }
  if (password.length < 6) {
    showError('Password length must be greater than 3!');
    return;
  }
  if (password !== password2) {
    showError('Passwords do not match!');
    return;
  }

  const user = {
    login,
    email,
    password,
  };

  await Auth.createUser(user);
  //   window.location.pathname = `${HOST}`;
});
