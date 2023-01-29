import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function initGallery(selector) {
  let gallery = new SimpleLightbox(selector, {
    captions: false,
    enableKeyboard: true,
  });
  gallery.refresh();
}

export function createGallery(images) {
  const galleryElem = document.querySelector('.game-gallery');
  let markup = '';
  for (let i = 0; images.length > 0 && i <= 10; i++) {
    if (images.length > 0) {
      if (i % 2 === 0) {
        markup += `
        <li class="${images.length > 1 ? 'duo-elem' : 'uno-elem'}">`;
        for (let j = 0; j < 2 && images.length > 0; j++) {
          markup += `<a class="gallery__item" href="${images[0]}">
              <img class="gallery__image" src="${images[0]}" alt="">
          </a>`;
          images.splice(0, 1);
        }
        markup += `</li>`;
      } else {
        markup += `
        <li class="uno-elem">
        <a href="${images[0]}">
            <img src="${images[0]}" alt="">
        </a>
        </li>
        `;
        images.splice(0, 1);
      }
    }
  }

  galleryElem.innerHTML = markup;
  initGallery('.game-gallery a');
}
