import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  galleryEl,
  loadMoreElement,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

let currentQuery = '';
let page = 1;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({ title: 'Увага', message: 'Введіть пошуковий запит' });
    return;
  }

  currentQuery = query;
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);
    const { hits = [], totalHits = 0 } = data;

    if (!hits.length) {
      iziToast.error({
        title: 'Нічого не знайдено',
        message: `За запитом "${currentQuery}" результатів немає`,
      });
      hideLoader();
      return;
    }

    createGallery(hits);
    iziToast.success({
      title: 'Знайдено',
      message: `Знайдено ${totalHits} зображень`,
    });

    if (totalHits > page * PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Помилка',
      message: err.message || 'Щось пішло не так',
    });
  } finally {
    hideLoader();
  }
}

if (loadMoreElement) {
  loadMoreElement.addEventListener('click', onLoadMore);
}

async function onLoadMore() {
  loadMoreElement.disabled = true;
  page += 1;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);
    const { hits = [], totalHits = 0 } = data;

    if (!hits.length) {
      iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
      return;
    }

    const prevLastCard = galleryEl.lastElementChild;
    createGallery(hits);

    if (totalHits > page * PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    
    if (prevLastCard) {
      const { height: cardHeight } = prevLastCard.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Помилка',
      message: err.message || 'Не вдалося завантажити дані',
    });
  } finally {
    hideLoader();
    loadMoreElement.disabled = false;
  }
}
