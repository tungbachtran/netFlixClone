const BASE_URL = 'https://phimapi.com/v1/api';

export const movieAPI = {
  getMoviesByCategory: async (category, limit = 6) => {
    try {
      const response = await fetch(`${BASE_URL}/danh-sach/phim-le?category=${category}&limit=${limit}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return null;
    }
  },

  getMovieDetail: async (slug) => {
    try {
      const response = await fetch(`https://phimapi.com/phim/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie detail:', error);
      return null;
    }
  },

  searchMovies: async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/tim-kiem?keyword=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return null;
    }
  }
};
