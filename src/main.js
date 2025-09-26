import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearGallery();
  hideLoadMoreButton();

  currentQuery = input.value.trim();
  if (!currentQuery) {
    iziToast.warning({ title: 'Увага', message: 'Введіть пошуковий запит!' });
    return;
  }

  currentPage = 1; 

  showLoader();
  const images = await getImagesByQuery(currentQuery, currentPage, perPage);
  hideLoader();

  if (images.length === 0) {
    iziToast.error({ title: 'Помилка', message: 'За цим запитом нічого не знайдено' });
    return;
  }

  createGallery(images);
  if (images.length === perPage) showLoadMoreButton();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  const images = await getImagesByQuery(currentQuery, currentPage, perPage);
  hideLoader();

  if (images.length === 0) {
    iziToast.info({ title: 'Інфо', message: 'Більше зображень немає' });
    hideLoadMoreButton();
    return;
  }

  createGallery(images);

    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (images.length < perPage) hideLoadMoreButton();
});
