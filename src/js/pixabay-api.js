const API_KEY = '52395439-1c1f05bbfb1dbdeee6be85271'; // заміни на свій ключ
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Помилка запиту до API');
    const data = await response.json();
    return data.hits; 
  } catch (error) {
    console.error(error);
    return [];
  }
}
