import axios from 'axios';

export async function getImage(value, currentPage) {
  const KEY = '45476779-a37d3eb685934422065bcfa30';
  const url = 'https://pixabay.com/api/';

  const params = {
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    page: currentPage,
    per_page: 14,
    safesearch: true,
  };

  const res = await axios.get(url, { params });
  return res.data;
}
