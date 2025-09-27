import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images = []) {
  if (!galleryContainer) return;

  const markup = images
    .map(
      img => `
<li class="gallery__item">
  <a class="gallery__link" href="${img.largeImageURL}">
    <img class="gallery__image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  </a>
</li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  if (!loader) return;
  loader.classList.add('is-visible');
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('is-visible');
}

export { galleryContainer as galleryEl, loadMoreBtn as loadMoreElement, loader as loaderElement };
