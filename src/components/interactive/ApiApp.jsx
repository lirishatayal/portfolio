import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Cloud,
  Film,
  Quote,
  Loader2,
  AlertCircle,
  Info,
  Thermometer,
} from 'lucide-react';
import Button from '../ui/Button';
import { getMoodById } from '../../data/moods';
import MoodSelector from './MoodCinema/MoodSelector';
import QuotesPanel from './MoodCinema/QuotesPanel';
import MoviesPanel from './MoodCinema/MoviesPanel';

const tabs = [
  {
    id: 'weather',
    label: 'Weather',
    subtitle: 'Demo data',
    icon: Cloud,
    description:
      'A mock weather lookup — shows how I handle search input, loading spinners, errors, and animated results.',
    instruction:
      'Enter any city name, then press Search or Enter. You’ll get demo temperature, humidity, and wind data.',
    usesMood: false,
  },
  {
    id: 'quotes',
    label: 'Quotes',
    subtitle: 'By mood',
    icon: Quote,
    description:
      'Mood-matched inspirational quotes from the Quotable API — with typewriter animation, copy, share, and save.',
    instruction:
      'Pick your mood below — a new quote shuffles in automatically. Tap Shuffle anytime for another.',
    usesMood: true,
  },
  {
    id: 'movies',
    label: 'Movies',
    subtitle: 'TMDB live',
    icon: Film,
    description:
      'Live movie data from TMDB — mood-based picks, trending, search, trailers, cast, and a personal watchlist.',
    instruction:
      'Select a mood for curated picks, or browse Trending / Popular / Top rated. Tap any poster for full details.',
    usesMood: true,
  },
];

const mockWeather = {
  name: 'San Francisco',
  main: { temp: 18, humidity: 65 },
  weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 3.5 },
};

function TabInstructions({ text }) {
  return (
    <p className="mgz-instructions">
      <Info size={14} className="mgz-instructions-icon" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

function EmptyState({ icon: Icon, title, hint, suggestions }) {
  return (
    <div className="api-empty-state">
      <div className="api-empty-icon-wrap" aria-hidden="true">
        <Icon size={32} className="api-empty-icon" />
      </div>
      <h4 className="api-empty-title">{title}</h4>
      <p className="api-empty-hint">{hint}</p>
      {suggestions && <p className="api-empty-suggestions">{suggestions}</p>}
    </div>
  );
}

function ContentArea({ children }) {
  return <div className="api-content-area">{children}</div>;
}

function LoadingState() {
  return (
    <div className="api-status-state">
      <Loader2 className="animate-spin text-neon-cyan mb-3" size={32} />
      <p className="font-mono text-sm text-slate-400">Fetching data...</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="api-status-state">
      <AlertCircle className="text-red-400 mb-3" size={32} />
      <p className="font-mono text-sm text-red-400">{message}</p>
    </div>
  );
}

function WeatherPanel() {
  const [city, setCity] = useState('San Francisco');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const empty = {
    icon: Thermometer,
    title: 'Search for a city',
    hint: 'Results appear here with temperature, conditions, humidity, and wind speed.',
    suggestions: 'Try: London, Tokyo, or Paris',
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 1200));
    if (!city.trim()) {
      setError('Please enter a city name');
      setLoading(false);
      return;
    }
    setData({ ...mockWeather, name: city.trim() });
    setLoading(false);
  };

  return (
    <div className="api-tab-panel">
      <div className="api-search-row">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="api-search-input"
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          aria-label="Enter city name"
        />
        <Button
          variant="primary"
          size="sm"
          onClick={fetchWeather}
          className="api-search-btn"
          data-cursor="pointer"
        >
          <Search size={14} aria-hidden="true" />
          Search
        </Button>
      </div>

      <ContentArea>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          ) : error ? (
            <motion.div key="error" exit={{ opacity: 0 }}>
              <ErrorState message={error} />
            </motion.div>
          ) : data ? (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="api-result-card api-result-card--center"
            >
              <h3 className="font-display text-xl font-bold mb-1">{data.name}</h3>
              <p className="api-weather-temp">{Math.round(data.main.temp)}°C</p>
              <p className="font-mono text-sm text-slate-400 capitalize">{data.weather[0].description}</p>
              <div className="api-weather-stats">
                <span>Humidity: {data.main.humidity}%</span>
                <span>Wind: {data.wind.speed} m/s</span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <EmptyState {...empty} />
            </motion.div>
          )}
        </AnimatePresence>
      </ContentArea>
    </div>
  );
}

export default function ApiApp() {
  const [active, setActive] = useState('weather');
  const [moodId, setMoodId] = useState('happy');
  const [quoteShuffleKey, setQuoteShuffleKey] = useState(0);
  const current = tabs.find((t) => t.id === active);
  const mood = getMoodById(moodId);

  const handleMoodChange = (id) => {
    setMoodId(id);
    setQuoteShuffleKey((k) => k + 1);
  };

  const handleTabChange = (id) => {
    setActive(id);
    if (id === 'quotes') {
      setQuoteShuffleKey((k) => k + 1);
    }
  };

  useEffect(() => {
    const panel = document.querySelector('.modal-panel');
    if (active === 'movies') {
      panel?.classList.add('modal-panel--wide');
    } else {
      panel?.classList.remove('modal-panel--wide');
    }
    return () => panel?.classList.remove('modal-panel--wide');
  }, [active]);

  return (
    <div
      className="api-root mc-root"
      style={
        current?.usesMood
          ? {
              '--mc-gradient': mood.gradient,
              '--mc-glow': mood.glow,
              '--mc-surface': mood.surface,
              '--mc-border': mood.border,
            }
          : undefined
      }
    >
      {current?.usesMood && <div className="mc-bg-glow" aria-hidden="true" />}

      <p className="alab-intro type-body-sm text-slate-400">
        Three mini-apps showing how I build API-driven UIs — with loading states, error handling, and
        animated results. Pick a tab below to try one.
      </p>

      <nav className="mgz-tabs" aria-label="API explorer apps">
        {tabs.map(({ id, label, subtitle, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleTabChange(id)}
            className={`mgz-tab alab-tab ${active === id ? 'mgz-tab--active' : ''}`}
            aria-selected={active === id}
            data-cursor="pointer"
          >
            <span className="alab-tab-label">
              <Icon size={14} className="inline-block mr-1.5 -mt-0.5 opacity-80" aria-hidden="true" />
              {label}
            </span>
            <span className="alab-tab-sub">{subtitle}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={active === 'movies' ? '' : 'api-panel'}
        >
          <div className="alab-engine-desc">
            <p className="type-body-sm text-slate-300 leading-relaxed">{current?.description}</p>
          </div>

          <TabInstructions text={current?.instruction ?? ''} />

          {current?.usesMood && (
            <MoodSelector
              moodId={moodId}
              onChange={handleMoodChange}
              mood={mood}
              context={active === 'movies' ? 'movies' : 'quotes'}
            />
          )}

          {active === 'weather' && <WeatherPanel />}
          {active === 'quotes' && <QuotesPanel moodId={moodId} shuffleKey={quoteShuffleKey} />}
          {active === 'movies' && <MoviesPanel moodId={moodId} mood={mood} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
