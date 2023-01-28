import { Fancybox } from '@fancyapps/ui';

export function initGallery(selector) {
  Fancybox.bind(selector, {
    toolbar: false,

    Carousel: {
      Navigation: {
        prevTpl:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5l-7 7 7 7"/><path d="M4 12h16"/></svg>',
        nextTpl:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
      },
    },
  });
}

export function createGallery(images) {
  const galleryElem = document.querySelector('.game-gallery');
  let markup = '';
  for (let i = 0; images.length > 0 && i <= 10; i++) {
    console.log(images);
    if (images.length > 0) {
      if (i % 2 === 0) {
        markup += `
        <li class="${images.length > 1 ? 'duo-elem' : 'uno-elem'}">`;
        for (let j = 0; j < 2 && images.length > 0; j++) {
          markup += `<a href="${images[0]}">
              <img src="${images[0]}" alt="">
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
  initGallery('game-gallery a');
}
