import axios from 'axios';

const API_KEY = '52395439-1c1f05bbfb1dbdeee6be85271';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка запиту:', error);
    throw error;
  }
}
