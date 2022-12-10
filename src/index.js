import Notiflix, { Notify } from 'notiflix';
import NewsApiServise from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// console.log(NewsApiServise);

const newsApiServise = new NewsApiServise();

const form = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
const guard = document.querySelector('.js-guard');

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(loadMore, options);
const simpleLightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);
button.addEventListener('click', loadMore);

button.style.display = 'none';

function onSearch(evt) {
  evt.preventDefault();
  // button.classList.add('.is-hidden');

  newsApiServise.searchValue = evt.currentTarget.elements.searchQuery.value;
  // console.log(newsApiServise.searchValue);
  if (!newsApiServise.searchValue) {
    Notiflix.Notify.warning('Empty field');

    return;
  }
  newsApiServise.resetPage();
  clearGallery();
  newsApiServise.fetchImage().then(data => {
    if (!data.hits.length) {
      clearGallery();

      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (data.hits.length >= 40) {
      Notiflix.Notify.success(`Hooray! We found ${[data.totalHits]} images.`);
    }

    galleryEl.insertAdjacentHTML('afterbegin', createGallery(data.hits));
    simpleLightbox.refresh();
    button.style.display = 'block';
    observer.observe(guard);
  });
}

function createGallery(arr) {
  return arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
         <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

function loadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      newsApiServise.incrementPage();
      newsApiServise.fetchImage().then(data => {
        galleryEl.insertAdjacentHTML('beforeend', createGallery(data.hits));

        if (data.total === Number(data.totalHits)) {
          button.style.display = 'none';
          observer.unobserve(guard);
          Notiflix.Notify.success(
            "We're sorry, but you've reached the end of search results."
          );
        }
        simpleLightBox.refresh();
      });
    }
  });
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

// function onLoad() {
//   newsApiServise.fetchImage().then(data => {
//     galleryEl.insertAdjacentHTML('beforeend', createGallery(data.hits));

//     if (data.total === Number(data.totalHits)) {
//       button.style.display = 'none';
//       Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");

//            observer.unobserve(guard);
//     }

//   })
// }
