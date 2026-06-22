import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import Button from '../ui/Button';

const CARD_SYMBOLS = ['🚀', '🌟', '🪐', '👾', '🛸', '💫', '🌙', '☄️'];

const INSTRUCTIONS = {
  memory: 'Flip two cards at a time to find matching pairs. Clear the board in as few moves as possible.',
  catch: 'Click falling stars before they disappear. Score as many as you can in 15 seconds.',
  reaction: 'Wait for the screen to turn green, then click as fast as you can. Your reaction time will be measured in milliseconds.',
};

function GameInstructions({ text }) {
  return (
    <p className="mgz-instructions">
      <Info size={14} className="mgz-instructions-icon" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

function ResultOverlay({ children, onClose }) {
  return (
    <motion.div
      className="mgz-result-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="mgz-result-card"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function getReactionFeedback(ms) {
  if (ms < 200) return 'Insane speed 🚀';
  if (ms < 300) return 'Great reflexes ⚡';
  if (ms < 400) return 'Good job 👍';
  return 'Keep practicing 💪';
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const initGame = useCallback(() => {
    const symbols = [...CARD_SYMBOLS.slice(0, 6), ...CARD_SYMBOLS.slice(0, 6)];
    const shuffled = symbols.sort(() => Math.random() - 0.5).map((s, i) => ({ id: i, symbol: s }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setShowResult(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const handleClick = (id) => {
    if (showResult || flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].symbol === cards[b].symbol) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          setTimeout(() => setShowResult(true), 400);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div>
      <div className="mgz-stats-bar">
        <span className="text-neon-cyan">Moves: {moves}</span>
        <button
          onClick={initGame}
          className="text-slate-400 hover:text-neon-cyan transition-colors"
          data-cursor="pointer"
        >
          Restart
        </button>
      </div>

      <div className="mgz-game-area p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
            return (
              <motion.button
                key={card.id}
                onClick={() => handleClick(card.id)}
                className="aspect-square rounded-xl glass relative cursor-pointer"
                style={{ perspective: 600 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="pointer"
              >
                <motion.div
                  className="w-full h-full flex items-center justify-center text-2xl rounded-xl"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-space-800 text-slate-500 font-mono"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    ?
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'rgba(0,240,255,0.08)',
                    }}
                  >
                    {card.symbol}
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <ResultOverlay onClose={() => setShowResult(false)}>
              <p className="mgz-result-heading">🎉 Congratulations!</p>
              <p className="mgz-result-time">
                {moves}
                <span className="mgz-result-unit">moves</span>
              </p>
              <p className="mgz-result-feedback">
                {moves <= 8 ? 'Outstanding memory! 🧠' : moves <= 12 ? 'Well done! 👏' : 'Nice work! 👍'}
              </p>
              <div className="mgz-result-actions">
                <Button variant="primary" size="md" onClick={initGame} className="w-full">
                  Play Again
                </Button>
              </div>
            </ResultOverlay>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CatchingGame({ onSwitchGame }) {
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing && timeLeft === 0 && score >= 0) {
      setShowResult(true);
      setBestScore((b) => Math.max(b, score));
    }
  }, [playing, timeLeft, score]);

  useEffect(() => {
    if (!playing) return;
    const spawner = setInterval(() => {
      setObjects((prev) => [
        ...prev.slice(-10),
        { id: Date.now() + Math.random(), x: Math.random() * 82 + 6, y: 0 },
      ]);
    }, 550);
    return () => clearInterval(spawner);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const mover = setInterval(() => {
      setObjects((prev) =>
        prev.map((o) => ({ ...o, y: o.y + 2.8 })).filter((o) => o.y < 95)
      );
    }, 50);
    return () => clearInterval(mover);
  }, [playing]);

  const catchObject = (id) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
    setScore((s) => s + 1);
  };

  const start = () => {
    setScore(0);
    setObjects([]);
    setTimeLeft(15);
    setPlaying(true);
    setShowResult(false);
  };

  return (
    <div>
      <div className="mgz-stats-bar">
        <span className="text-neon-cyan">Score: {score}</span>
        <span className="text-neon-purple">Time: {timeLeft}s</span>
      </div>

      <div className="mgz-game-area relative h-56 sm:h-64">
        {!playing && !showResult && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Button variant="primary" size="md" onClick={start} data-cursor="pointer">
              Start Game
            </Button>
          </div>
        )}

        {objects.map((obj) => (
          <motion.button
            key={obj.id}
            className="absolute text-2xl cursor-pointer select-none"
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
            onClick={() => catchObject(obj.id)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 1.4 }}
            data-cursor="pointer"
          >
            ⭐
          </motion.button>
        ))}

        <AnimatePresence>
          {showResult && (
            <ResultOverlay onClose={() => setShowResult(false)}>
              <p className="mgz-result-heading">🌟 Game Over</p>
              <p className="mgz-result-time">
                {score}
                <span className="mgz-result-unit">stars</span>
              </p>
              <p className="mgz-result-feedback">
                {score >= 15 ? 'Stellar performance! 🚀' : score >= 8 ? 'Great catching! ⚡' : 'Keep aiming! 💪'}
              </p>
              <div className="mgz-result-stats">
                <div>
                  Best
                  <strong>{Math.max(bestScore, score)}</strong>
                </div>
              </div>
              <div className="mgz-result-actions">
                <Button variant="primary" size="md" onClick={start} className="w-full">
                  Play Again
                </Button>
                {onSwitchGame && (
                  <Button variant="secondary" size="md" onClick={() => onSwitchGame('reaction')} className="w-full">
                    Try Another Game
                  </Button>
                )}
              </div>
            </ResultOverlay>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReactionTest({ onSwitchGame }) {
  const [state, setState] = useState('idle');
  const [times, setTimes] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [message, setMessage] = useState('Click to Start');
  const timeoutRef = useRef(null);

  const best = times.length ? Math.min(...times) : null;
  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => () => clearTimer(), []);

  const start = () => {
    clearTimer();
    setLastResult(null);
    setState('waiting');
    setMessage('Wait for green...');
    timeoutRef.current = setTimeout(() => {
      setState('ready');
      setStartTime(Date.now());
      setMessage('CLICK NOW!');
    }, 2000 + Math.random() * 3000);
  };

  const handleAreaClick = () => {
    if (state === 'result') return;

    if (state === 'idle') {
      start();
      return;
    }

    if (state === 'waiting') {
      clearTimer();
      setState('idle');
      setMessage('Too early! Click to try again.');
      return;
    }

    if (state === 'ready') {
      const time = Date.now() - startTime;
      setTimes((t) => [...t, time]);
      setLastResult(time);
      setState('result');
      setMessage('');
    }
  };

  const playAgain = () => {
    setLastResult(null);
    setState('idle');
    setMessage('Click to Start');
  };

  const btnClass = {
    idle: 'mgz-reaction-btn--idle',
    waiting: 'mgz-reaction-btn--waiting',
    ready: 'mgz-reaction-btn--ready',
    result: 'mgz-reaction-btn--idle',
  }[state];

  return (
    <div>
      {times.length > 0 && state !== 'result' && (
        <div className="mgz-stats-footer">
          <span>Best: {best}ms</span>
          <span>Avg: {avg}ms</span>
          <span>Attempts: {times.length}</span>
        </div>
      )}

      <div className="mgz-game-area">
        <motion.button
          type="button"
          onClick={handleAreaClick}
          className={`mgz-reaction-btn ${btnClass}`}
          whileTap={state !== 'result' ? { scale: 0.99 } : undefined}
          data-cursor="pointer"
        >
          {message}
        </motion.button>

        <AnimatePresence>
          {state === 'result' && lastResult !== null && (
            <ResultOverlay onClose={playAgain}>
              <p className="mgz-result-heading">⚡ Your Reaction Time</p>
              <p className="mgz-result-time">
                {lastResult}
                <span className="mgz-result-unit">ms</span>
              </p>
              <p className="mgz-result-feedback">{getReactionFeedback(lastResult)}</p>

              <div className="mgz-result-stats">
                <div>
                  Best
                  <strong>{Math.min(...times)}ms</strong>
                </div>
                <div>
                  Average
                  <strong>{avg}ms</strong>
                </div>
                <div>
                  Attempts
                  <strong>{times.length}</strong>
                </div>
              </div>

              <div className="mgz-result-actions">
                <Button variant="primary" size="md" onClick={playAgain} className="w-full">
                  Play Again
                </Button>
                {onSwitchGame && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => { playAgain(); onSwitchGame('memory'); }}
                    className="w-full"
                  >
                    Try Another Game
                  </Button>
                )}
              </div>
            </ResultOverlay>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const games = [
  { id: 'memory', label: 'Memory Cards', component: MemoryGame },
  { id: 'catch', label: 'Star Catcher', component: CatchingGame },
  { id: 'reaction', label: 'Reaction Test', component: ReactionTest },
];

export default function MiniGameZone() {
  const [active, setActive] = useState('memory');
  const activeGame = games.find((g) => g.id === active);
  const ActiveGame = activeGame?.component;

  const switchGame = (id) => setActive(id);

  return (
    <div className="mgz-root">
      <nav className="mgz-tabs" aria-label="Game selection">
        {games.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => setActive(game.id)}
            className={`mgz-tab ${active === game.id ? 'mgz-tab--active' : ''}`}
            aria-selected={active === game.id}
            data-cursor="pointer"
          >
            {game.label}
          </button>
        ))}
      </nav>

      <GameInstructions text={INSTRUCTIONS[active]} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {ActiveGame && (
            <ActiveGame
              {...(active !== 'memory' ? { onSwitchGame: switchGame } : {})}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
