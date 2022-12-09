   const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31783956-987fac84295b9447f966969a6';

export default class NewFetch { 
 
    constructor() { 
        
    }   

fetchImage(SearchValue) {
      return fetch(
    
    `${BASE_URL}?key=${KEY}&q=${SearchValue}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(Notiflix.Notify.failure('Erroor'));
      }
      return resp.json();
    })
    .catch(err => console.log(err));
} 
}
