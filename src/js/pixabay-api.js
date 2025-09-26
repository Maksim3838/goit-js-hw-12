const API_KEY = '52395439-1c1f05bbfb1dbdeee6be85271'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`);
    if (!response.ok) {
      throw new Error('Помилка запиту до API');
    }
    const data = await response.json();
    return data.hits; 
  } catch (error) {
    console.error(error);
    return [];
  }
}
