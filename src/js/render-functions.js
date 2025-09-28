import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.gallery');
export const loadMoreElement = document.querySelector('.load-more');
export const loaderElement = document.querySelector('.loader');

let lightbox = null;

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  initLightbox();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
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

export function showLoader() {
  loaderElement.style.display = 'inline-block';
}

export function hideLoader() {
  loaderElement.style.display = 'none';
}

export function showLoadMoreButton() {
  loadMoreElement.style.display = 'inline-block';
}

export function hideLoadMoreButton() {
  loadMoreElement.style.display = 'none';
}
