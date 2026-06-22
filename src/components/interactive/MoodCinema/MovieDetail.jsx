import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  Heart,
  AlertCircle,
} from 'lucide-react';
import MovieCard from './MovieCard';
import { DetailSkeleton, MovieGridSkeleton } from './Skeletons';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  posterUrl,
  backdropUrl,
} from '../../../services/tmdb';

export default function MovieDetail({ movieId, onBack, onSelectMovie, watchlist, onToggleSave }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSaved = watchlist.some((m) => m.id === movieId);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [details, credits, videos, similarRes] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
          getSimilarMovies(movieId),
        ]);

        if (cancelled) return;

        const trailer = videos.results?.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        ) ?? videos.results?.find((v) => v.site === 'YouTube');

        setMovie(details);
        setCast(credits.cast?.slice(0, 8) ?? []);
        setTrailerKey(trailer?.key ?? null);
        setSimilar(similarRes.results?.slice(0, 6) ?? []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (loading) {
    return (
      <div className="mc-detail">
        <button type="button" className="mc-back-btn" onClick={onBack} data-cursor="pointer">
          <ArrowLeft size={16} />
          Back
        </button>
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="mc-detail">
        <button type="button" className="mc-back-btn" onClick={onBack} data-cursor="pointer">
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="mc-status mc-status--error">
          <AlertCircle size={28} />
          <p>{error || 'Could not load movie details.'}</p>
        </div>
      </div>
    );
  }

  const backdrop = backdropUrl(movie.backdrop_path);
  const poster = posterUrl(movie.poster_path);
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;

  return (
    <motion.div
      className="mc-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <button type="button" className="mc-back-btn" onClick={onBack} data-cursor="pointer">
        <ArrowLeft size={16} />
        Back to browse
      </button>

      <div className="mc-detail-hero">
        {backdrop && (
          <img src={backdrop} alt="" className="mc-detail-backdrop" />
        )}
        <div className="mc-detail-hero-overlay" />
        <div className="mc-detail-hero-content">
          {poster && (
            <img src={poster} alt="" className="mc-detail-poster" />
          )}
          <div className="mc-detail-meta">
            <h2 className="mc-detail-title">{movie.title}</h2>
            {movie.tagline && <p className="mc-detail-tagline">{movie.tagline}</p>}
            <div className="mc-detail-stats">
              <span>
                <Star size={14} aria-hidden="true" />
                {movie.vote_average?.toFixed(1)}
              </span>
              {movie.release_date && (
                <span>
                  <Calendar size={14} aria-hidden="true" />
                  {movie.release_date.slice(0, 4)}
                </span>
              )}
              {runtime && (
                <span>
                  <Clock size={14} aria-hidden="true" />
                  {runtime}
                </span>
              )}
            </div>
            <div className="mc-detail-genres">
              {movie.genres?.map((g) => (
                <span key={g.id} className="mc-genre-tag">{g.name}</span>
              ))}
            </div>
            <button
              type="button"
              className={`mc-watchlist-btn ${isSaved ? 'mc-watchlist-btn--active' : ''}`}
              onClick={() => onToggleSave(movie)}
              data-cursor="pointer"
            >
              <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'In watchlist' : 'Save to watchlist'}
            </button>
          </div>
        </div>
      </div>

      <section className="mc-detail-section">
        <h3 className="mc-section-label">Overview</h3>
        <p className="mc-detail-overview">{movie.overview || 'No overview available.'}</p>
      </section>

      {trailerKey && (
        <section className="mc-detail-section">
          <h3 className="mc-section-label">Trailer</h3>
          <div className="mc-trailer-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {cast.length > 0 && (
        <section className="mc-detail-section">
          <h3 className="mc-section-label">Cast</h3>
          <div className="mc-cast-row">
            {cast.map((person) => (
              <div key={person.id} className="mc-cast-card">
                <div className="mc-cast-avatar">
                  {person.profile_path ? (
                    <img src={posterUrl(person.profile_path, 'w185')} alt="" />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
                <p className="mc-cast-name">{person.name}</p>
                <p className="mc-cast-role">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {similar.length > 0 && (
        <section className="mc-detail-section">
          <h3 className="mc-section-label">You may also like</h3>
          <div className="mc-movie-grid mc-movie-grid--compact">
            {similar.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                compact
                onSelect={onSelectMovie}
                isSaved={watchlist.some((w) => w.id === m.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
