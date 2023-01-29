export function setRating(rating) {
  const starList = document.querySelector('.star-rating__live');
  for (let i = 0; i < Math.floor(rating); i++) {
    starList.children[i].classList.add('star-rating__item_active');
  }

  document.querySelector('.star-rating__avg').textContent = rating;
}
