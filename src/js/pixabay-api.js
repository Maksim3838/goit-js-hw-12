import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52395439-1c1f05bbfb1dbdeee6be85271"; 

export async function getImages(query, page = 1, per_page = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; 
  } catch (error) {
    console.error("Помилка при отриманні зображень:", error);
    throw error;
  }
}
