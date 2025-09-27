async function onLoadMore() {
  page += 1;
  loadMoreElement.disabled = true;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page, PER_PAGE);
    const { hits = [], totalHits = 0 } = data;

    if (!hits.length) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results."
      });
      return;
    }

    createGallery(hits);

    if (totalHits <= page * PER_PAGE) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    const firstCard = document.querySelector('.gallery .gallery__item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2, 
        behavior: 'smooth',
      });
    }

  } catch (err) {
    console.error(err);
    iziToast.error({ title: 'Помилка', message: err.message || 'Щось пішло не так' });
  } finally {
    hideLoader();
    loadMoreElement.disabled = false;
  }
}
