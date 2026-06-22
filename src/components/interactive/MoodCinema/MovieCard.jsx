import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { posterUrl } from '../../../services/tmdb';

export default function MovieCard({ movie, onSelect, isSaved, onToggleSave, compact = false }) {
  const poster = posterUrl(movie.poster_path, compact ? 'w342' : 'w500');
  const year = movie.release_date?.slice(0, 4) ?? '—';
  const rating = movie.vote_average?.toFixed(1) ?? '—';

  return (
    <motion.article
      className={`mc-movie-card ${compact ? 'mc-movie-card--compact' : ''}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        className="mc-movie-card-hit"
        onClick={() => onSelect(movie.id)}
        data-cursor="pointer"
        aria-label={`View details for ${movie.title}`}
      >
        <div className="mc-movie-poster-wrap">
          {poster ? (
            <img src={poster} alt="" className="mc-movie-poster" loading="lazy" />
          ) : (
            <div className="mc-movie-poster mc-movie-poster--empty">🎬</div>
          )}
          <span className="mc-movie-rating">
            <Star size={12} aria-hidden="true" />
            {rating}
          </span>
        </div>
        <h4 className="mc-movie-title">{movie.title}</h4>
        <p className="mc-movie-year">{year}</p>
      </button>

      {onToggleSave && (
        <button
          type="button"
          className={`mc-save-btn ${isSaved ? 'mc-save-btn--active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(movie);
          }}
          aria-label={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
          data-cursor="pointer"
        >
          <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      )}
    </motion.article>
  );
}
