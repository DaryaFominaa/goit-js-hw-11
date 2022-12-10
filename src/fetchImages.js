import axios from 'axios';

export default class NewsApiServise {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }

  async fetchImage() {
    try {
      const BASE_URL = 'https://pixabay.com/api/';
      const KEY = '31783956-987fac84295b9447f966969a6';
      const response = await axios.get(
        `${BASE_URL}?key=${KEY}&q=${this.searchValue}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
      );
      //   if (!resp.ok) {
      //     throw new Error();
      //   }
      const data = response.data;
      this.incrementPage();
      return data;
    } catch (err) {
      return console.log(err);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchValue;
  }

  set query(newQuery) {
    this.searchValue = newQuery;
  }
}
