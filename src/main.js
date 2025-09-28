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

let query = '';
let page = 1;

form.addEventListener('submit', onSearch);
document.querySelector('.load-more').addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.error({ message: 'Введіть пошуковий запит!' });
    return;
  }

  page = 1; 
  clearGallery();
  hideLoadMoreButton();

  showLoader();
  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.warning({ message: 'Зображення не знайдені!' });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > page * 15) {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({ message: 'Сталася помилка при завантаженні.' });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  showLoader();
  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({ message: 'Більше результатів немає.' });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits <= page * 15) {
      hideLoadMoreButton();
      iziToast.info({ message: 'Ви переглянули всі результати.' });
    }

       const { height: cardHeight } =
      document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch {
    iziToast.error({ message: 'Не вдалося завантажити більше.' });
  } finally {
    hideLoader();
  }
}
