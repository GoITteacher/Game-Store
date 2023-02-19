import { showError } from '../../modules/notiflix';
import { HOST } from '../constants';
import { Auth } from '../../modules/auth';
import { redirect } from '../helpers';

const authFormElem = document.querySelector('.js-auth-form');

authFormElem.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const login = e.currentTarget.elements.login.value;
  const password = e.currentTarget.elements.password.value;
  const password2 = e.currentTarget.elements['check-password'].value;

  if (login.length < 4) {
    console.log('Login length must be greater than 3!');
    showError('Login length must be greater than 3!');
    return;
  }
  const isFreeLogin = await Auth.isFreeLogin(login);
  if (!isFreeLogin) {
    console.log('Login already in use!');
    showError('Login already in use!');
    return;
  }
  if (password.length < 6) {
    console.log('Password length must be greater than 3!');
    showError('Password length must be greater than 3!');
    return;
  }
  if (password !== password2) {
    console.log('Passwords do not match!');
    showError('Passwords do not match!');
    return;
  }

  const user = {
    login,
    email,
    password,
    games:[]
  };

  await Auth.createUser(user);
  setTimeout(() => {
    redirect('auth.html');
  }, 100);
});
