import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

// Setup axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page }
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page }
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
