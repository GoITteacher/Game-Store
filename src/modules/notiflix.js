import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-bottom',
  distance: '130px',
  opacity: 0.8,
});

export function showError(message) {
  Notiflix.Notify.failure(message);
}
