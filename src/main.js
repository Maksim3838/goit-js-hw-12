import { getImagesByQuery } from './pixabay-api.js';
import { createGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more'); 
const loader = document.querySelector('.loader');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;
let loadedHits = 0;

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage, perPage, true);
    hideLoader();

    if (hits.length > 0) {
      createGallery(hits);
      loadedHits += hits.length;

      const firstCard = document.querySelector('.gallery').firstElementChild;
      if (firstCard) {
        const { height: cardHeight } = firstCard.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
      }
    }

    if (hits.length === 0 || loadedHits >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
      title: 'Помилка',
      message: 'Сталася помилка при завантаженні зображень',
    });
  }
});
