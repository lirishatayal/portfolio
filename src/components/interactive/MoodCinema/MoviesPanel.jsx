import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, AlertCircle, KeyRound } from 'lucide-react';
import {
  hasTmdbKey,
  discoverByMood,
  getTrending,
  getPopular,
  getTopRated,
  searchMovies,
} from '../../../services/tmdb';
import { useDebounce } from '../../../hooks/useDebounce';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';
import { MovieGridSkeleton } from './Skeletons';
import { getDemoMoviesForList } from '../../../data/demoMovies';

const MOVIE_LISTS = [
  { id: 'mood', label: 'For your mood' },
  { id: 'trending', label: 'Trending' },
  { id: 'popular', label: 'Popular' },
  { id: 'top', label: 'Top rated' },
  { id: 'watchlist', label: 'Watchlist' },
];

export default function MoviesPanel({ moodId, mood }) {
  const [activeList, setActiveList] = useState('mood');
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesError, setMoviesError] = useState(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 450);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchlist, setWatchlist] = useLocalStorage('mood-cinema-watchlist', []);

  const tmdbReady = hasTmdbKey();

  const loadMovies = useCallback(async (listId, currentMood) => {
    if (!tmdbReady) {
      setMoviesError(null);
      setMovies(getDemoMoviesForList(listId, currentMood.id));
      setMoviesLoading(false);
      return;
    }

    setMoviesLoading(true);
    setMoviesError(null);

    try {
      let data;
      if (listId === 'mood') {
        data = await discoverByMood(currentMood.genreIds);
      } else if (listId === 'trending') {
        data = await getTrending();
      } else if (listId === 'popular') {
        data = await getPopular();
      } else if (listId === 'top') {
        data = await getTopRated();
      } else {
        setMovies([]);
        setMoviesLoading(false);
        return;
      }
      setMovies(data.results?.slice(0, 12) ?? []);
    } catch (err) {
      setMoviesError(err.message);
      setMovies(getDemoMoviesForList(listId, currentMood.id));
    } finally {
      setMoviesLoading(false);
    }
  }, [tmdbReady]);

  useEffect(() => {
    if (activeList !== 'watchlist') {
      loadMovies(activeList, mood);
    }
  }, [activeList, moodId, mood, loadMovies]);

  useEffect(() => {
    if (!debouncedSearch.trim() || !tmdbReady) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    let cancelled = false;
    setSearchLoading(true);

    searchMovies(debouncedSearch.trim())
      .then((data) => {
        if (!cancelled) setSearchResults(data.results?.slice(0, 8) ?? []);
      })
      .catch(() => {
        if (!cancelled) setSearchResults([]);
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, tmdbReady]);

  const toggleWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [
        ...prev,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        },
      ];
    });
  }, [setWatchlist]);

  const displayMovies = activeList === 'watchlist' ? watchlist : movies;
  const showSearchResults = debouncedSearch.trim().length > 0;

  if (selectedMovieId && tmdbReady) {
    return (
      <MovieDetail
        movieId={selectedMovieId}
        onBack={() => setSelectedMovieId(null)}
        onSelectMovie={setSelectedMovieId}
        watchlist={watchlist}
        onToggleSave={toggleWatchlist}
      />
    );
  }

  const handleSelectMovie = (id) => {
    if (tmdbReady) {
      setSelectedMovieId(id);
    }
  };

  return (
    <div className="mc-tab-panel">
      {!tmdbReady && (
        <div className="mc-api-notice mc-api-notice--demo">
          <KeyRound size={20} />
          <div>
            <p className="mc-api-notice-title">Showing demo catalog</p>
            <p className="mc-api-notice-text">
              Add <code>VITE_TMDB_API_KEY</code> to <code>.env</code> for live search, trailers, and full details.
              Get a free key at themoviedb.org.
            </p>
          </div>
        </div>
      )}

      <div className="mc-search-wrap">
        <Search size={16} className="mc-search-icon" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tmdbReady ? 'Search any movie...' : 'Search requires TMDB API key'}
          className="mc-search-input"
          aria-label="Search movies"
          disabled={!tmdbReady}
        />
      </div>

      {showSearchResults && tmdbReady && (
        <div className="mc-search-results">
          <h4 className="mc-subsection-label">Search results</h4>
          {searchLoading ? (
            <MovieGridSkeleton count={4} />
          ) : searchResults.length > 0 ? (
            <div className="mc-movie-grid">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={handleSelectMovie}
                  isSaved={watchlist.some((m) => m.id === movie.id)}
                  onToggleSave={toggleWatchlist}
                />
              ))}
            </div>
          ) : (
            <p className="mc-empty-hint">No movies found for &ldquo;{debouncedSearch}&rdquo;</p>
          )}
        </div>
      )}

      <nav className="mc-list-tabs" aria-label="Movie lists">
        {MOVIE_LISTS.map((list) => (
          <button
            key={list.id}
            type="button"
            className={`mc-list-tab ${activeList === list.id ? 'mc-list-tab--active' : ''}`}
            onClick={() => setActiveList(list.id)}
            data-cursor="pointer"
          >
            {list.id === 'watchlist' && <Heart size={12} />}
            {list.label}
            {list.id === 'watchlist' && watchlist.length > 0 && (
              <span className="mc-list-tab-count">{watchlist.length}</span>
            )}
          </button>
        ))}
      </nav>

      {moviesError && (
        <div className="mc-status mc-status--error">
          <AlertCircle size={18} />
          <p>{moviesError}</p>
        </div>
      )}

      {moviesLoading && activeList !== 'watchlist' ? (
        <MovieGridSkeleton count={6} />
      ) : displayMovies.length > 0 ? (
        <motion.div
          key={activeList + moodId}
          className="mc-movie-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={handleSelectMovie}
              isSaved={watchlist.some((m) => m.id === movie.id)}
              onToggleSave={toggleWatchlist}
            />
          ))}
        </motion.div>
      ) : (
        <div className="mc-empty-state">
          {activeList === 'watchlist' ? (
            <>
              <Heart size={32} className="mc-empty-icon" />
              <p>Your watchlist is empty</p>
              <p className="mc-empty-hint">Tap the heart on any movie to save it here.</p>
            </>
          ) : (
            <p className="mc-empty-hint">No movies to show right now.</p>
          )}
        </div>
      )}
    </div>
  );
}
