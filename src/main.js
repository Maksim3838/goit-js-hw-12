import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');
const PER_PAGE = 15;

let query = '';
let page = 1;
let totalLoaded = 0;
let totalHits = 0;
let lightbox; 

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.error({ message: 'Введіть пошуковий запит!' });
    return;
  }

  page = 1;
  totalLoaded = 0;
  clearGallery();
  hideLoadMoreButton();

  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits || data.hits.length === 0) {
      iziToast.warning({ message: 'Зображення не знайдені!' });
      return;
    }

    createGallery(data.hits);
    totalLoaded += data.hits.length;

    initLightbox();

    if (totalLoaded < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({ message: "Досягнуто кінця результатів." });
    }

  } catch (error) {
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

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({ message: "Досягнуто кінця результатів." });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    totalLoaded += data.hits.length;

    initLightbox();

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "Досягнуто кінця результатів." });
    }

        const firstCard = document.querySelector('.gallery').firstElementChild;
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

  } catch (error) {
    iziToast.error({ message: 'Не вдалося завантажити більше.' });
  } finally {
    hideLoader();
  }
}

function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
