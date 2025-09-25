const API_KEY = '52395439-1c1f05bbfb1dbdeee6be85271'; 
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15; 

export async function getImagesByQuery(query, page = 1) {
  if (!query || typeof query !== 'string') {
    throw new Error('Query must be a non-empty string');
  }
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Pixabay API error: ${response.status}`);
  }
  const data = await response.json();
    return data;
}
