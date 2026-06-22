export function MovieCardSkeleton() {
  return (
    <div className="mc-movie-card mc-movie-card--skeleton" aria-hidden="true">
      <div className="mc-skeleton mc-skeleton--poster" />
      <div className="mc-skeleton mc-skeleton--title" />
      <div className="mc-skeleton mc-skeleton--meta" />
    </div>
  );
}

export function MovieGridSkeleton({ count = 6 }) {
  return (
    <div className="mc-movie-grid">
      {Array.from({ length: count }, (_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function QuoteSkeleton() {
  return (
    <div className="mc-quote mc-quote--skeleton" aria-hidden="true">
      <div className="mc-skeleton mc-skeleton--quote-line" />
      <div className="mc-skeleton mc-skeleton--quote-line mc-skeleton--short" />
      <div className="mc-skeleton mc-skeleton--author" />
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mc-detail-skeleton" aria-hidden="true">
      <div className="mc-skeleton mc-skeleton--backdrop" />
      <div className="mc-skeleton mc-skeleton--detail-title" />
      <div className="mc-skeleton mc-skeleton--detail-text" />
      <div className="mc-skeleton mc-skeleton--detail-text mc-skeleton--short" />
    </div>
  );
}
