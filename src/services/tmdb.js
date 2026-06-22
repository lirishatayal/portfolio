const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function hasTmdbKey() {
  return Boolean(API_KEY);
}

export function posterUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path, size = 'w1280') {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

async function tmdbFetch(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API key missing. Add VITE_TMDB_API_KEY to your .env file.');
  }

  const search = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE}${endpoint}?${search}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.status_message || `TMDB request failed (${res.status})`);
  }

  return res.json();
}

export function discoverByMood(genreIds, page = 1) {
  return tmdbFetch('/discover/movie', {
    with_genres: genreIds.join(','),
    sort_by: 'popularity.desc',
    page: String(page),
    'vote_count.gte': '200',
  });
}

export function getTrending(page = 1) {
  return tmdbFetch('/trending/movie/week', { page: String(page) });
}

export function getPopular(page = 1) {
  return tmdbFetch('/movie/popular', { page: String(page) });
}

export function getTopRated(page = 1) {
  return tmdbFetch('/movie/top_rated', { page: String(page) });
}

export function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', {
    query,
    page: String(page),
    include_adult: 'false',
  });
}

export function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`);
}

export function getMovieCredits(id) {
  return tmdbFetch(`/movie/${id}/credits`);
}

export function getMovieVideos(id) {
  return tmdbFetch(`/movie/${id}/videos`);
}

export function getSimilarMovies(id, page = 1) {
  return tmdbFetch(`/movie/${id}/similar`, { page: String(page) });
}
