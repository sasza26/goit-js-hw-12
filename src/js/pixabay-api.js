import axios from 'axios';

export const returnPromise = (q, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '45476779-a37d3eb685934422065bcfa30',
      q,
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: '15',
    },
  });
};
