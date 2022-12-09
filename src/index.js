import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
// console.log(SimpleLightbox);

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31783956-987fac84295b9447f966969a6';

const form = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
let page = 1;
// console.log(gallery)
form.addEventListener('submit', onSearch);
button.addEventListener('click', onLoad);



function onSearch(evt) {
  evt.preventDefault();
  const {
    searchQuery: { value: SearchValue },
  } = evt.currentTarget.elements;

  if (!SearchValue) {
   Notiflix.Notify.warning('Empty field');

    return;
  }

  fetchImage(SearchValue,page).then(data =>createGallery(data.hits))
}

function fetchImage(value) {
      return fetch(
    
    `${BASE_URL}?key=${KEY}&q=${value}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(Notiflix.Notify.failure('Erroor'));
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}

function createGallery(arr) {
  const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })=>
//   const markup = arr.map(item =>
        `<div class="photo-card">
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
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
    // .join('');
    galleryEl.insertAdjacentHTML('beforebegin', markup);
}

function onLoad() { 
    page += 1;
    fetchImage(page).then(data=>console.log(data))
}