const refs = {
  addGameBtn: document.querySelector('.js-add-game'),
  backdrop: document.querySelector('.backdrop'),
};

// =========== MODAL =================================
function initModal() {
  refs.addGameBtn.addEventListener('click', () => {
    openModal();
  });
  function openModal() {
    document.body.classList.add('show');
    document.addEventListener('keydown', onClose);
  }
  function onClose(e) {
    if (e.key == 'Escape') {
      closeModal();
    }
  }
  function closeModal() {
    document.body.classList.remove('show');
    document.removeEventListener('keydown', onClose);
  }
  refs.backdrop.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  });
  function closeModal() {
    document.body.classList.remove('show');
  }
}
initModal();
// ====================================================
