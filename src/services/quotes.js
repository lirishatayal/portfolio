import { getMoodById } from '../data/moods';

const FALLBACK_QUOTES = {
  happy: [
    { _id: 'h1', content: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama' },
    { _id: 'h2', content: 'The most wasted of days is one without laughter.', author: 'E.E. Cummings' },
    { _id: 'h3', content: 'Keep your face always toward the sunshine—and shadows will fall behind you.', author: 'Walt Whitman' },
    { _id: 'h4', content: 'Joy is not in things; it is in us.', author: 'Richard Wagner' },
    { _id: 'h5', content: 'A day without laughter is a day wasted.', author: 'Charlie Chaplin' },
    { _id: 'h6', content: 'The best way to cheer yourself is to try to cheer someone else up.', author: 'Mark Twain' },
    { _id: 'h7', content: 'Let us be grateful to people who make us happy.', author: 'Marcel Proust' },
    { _id: 'h8', content: 'Happiness depends upon ourselves.', author: 'Aristotle' },
  ],
  sad: [
    { _id: 's1', content: 'The wound is the place where the Light enters you.', author: 'Rumi' },
    { _id: 's2', content: 'Tears are words that need to be written.', author: 'Paulo Coelho' },
    { _id: 's3', content: 'What hurts you, blesses you. Darkness is your candle.', author: 'Rumi' },
    { _id: 's4', content: 'The soul would have no rainbow had the eyes no tears.', author: 'John Vance Cheney' },
    { _id: 's5', content: 'Every man has his secret sorrows which the world knows not.', author: 'Henry Wadsworth Longfellow' },
    { _id: 's6', content: 'Sometimes you climb out of bed in the morning and you think, I\'m not going to make it.', author: 'Charles Bukowski' },
    { _id: 's7', content: 'Breathing is hard. When you cry so much, it makes you realize that breathing is hard.', author: 'David Levithan' },
    { _id: 's8', content: 'Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.', author: 'Christopher Morley' },
  ],
  motivated: [
    { _id: 'm1', content: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
    { _id: 'm2', content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
    { _id: 'm3', content: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
    { _id: 'm4', content: 'Don\'t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
    { _id: 'm5', content: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
    { _id: 'm6', content: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
    { _id: 'm7', content: 'Hardships often prepare ordinary people for an extraordinary destiny.', author: 'C.S. Lewis' },
    { _id: 'm8', content: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis' },
  ],
  romantic: [
    { _id: 'r1', content: 'We are most alive when we are in love.', author: 'John Updike' },
    { _id: 'r2', content: 'Love is composed of a single soul inhabiting two bodies.', author: 'Aristotle' },
    { _id: 'r3', content: 'The best thing to hold onto in life is each other.', author: 'Audrey Hepburn' },
    { _id: 'r4', content: 'To love and be loved is to feel the sun from both sides.', author: 'David Viscott' },
    { _id: 'r5', content: 'Love recognizes no barriers.', author: 'Maya Angelou' },
    { _id: 'r6', content: 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.', author: 'Dr. Seuss' },
    { _id: 'r7', content: 'Love is friendship that has caught fire.', author: 'Ann Landers' },
    { _id: 'r8', content: 'Where there is love there is life.', author: 'Mahatma Gandhi' },
  ],
  adventurous: [
    { _id: 'a1', content: 'Adventure is worthwhile in itself.', author: 'Amelia Earhart' },
    { _id: 'a2', content: 'Jobs fill your pocket, but adventures fill your soul.', author: 'Jaime Lyn Beatty' },
    { _id: 'a3', content: 'Life is either a daring adventure or nothing at all.', author: 'Helen Keller' },
    { _id: 'a4', content: 'The biggest adventure you can take is to live the life of your dreams.', author: 'Oprah Winfrey' },
    { _id: 'a5', content: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien' },
    { _id: 'a6', content: 'Adventure may hurt you but monotony will kill you.', author: 'Unknown' },
    { _id: 'a7', content: 'Go where you feel most alive.', author: 'Unknown' },
    { _id: 'a8', content: 'Blessed are the curious for they shall have adventures.', author: 'Lovelle Drachman' },
  ],
  thriller: [
    { _id: 't1', content: 'Courage is not the absence of fear, but the triumph over it.', author: 'Nelson Mandela' },
    { _id: 't2', content: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
    { _id: 't3', content: 'Fear is only as deep as the mind allows.', author: 'Japanese Proverb' },
    { _id: 't4', content: 'The only thing we have to fear is fear itself.', author: 'Franklin D. Roosevelt' },
    { _id: 't5', content: 'Do one thing every day that scares you.', author: 'Eleanor Roosevelt' },
    { _id: 't6', content: 'Life shrinks or expands in proportion to one\'s courage.', author: 'Anaïs Nin' },
    { _id: 't7', content: 'Bravery is being the only one who knows you\'re afraid.', author: 'Franklin P. Jones' },
    { _id: 't8', content: 'Everything you want is on the other side of fear.', author: 'Jack Canfield' },
  ],
};

function pickFallback(moodId, excludeId) {
  const pool = (FALLBACK_QUOTES[moodId] ?? FALLBACK_QUOTES.happy).filter(
    (q) => q._id !== excludeId
  );
  const choices = pool.length > 0 ? pool : FALLBACK_QUOTES[moodId] ?? FALLBACK_QUOTES.happy;
  return choices[Math.floor(Math.random() * choices.length)];
}

async function fetchFromQuotable(tags, excludeId, attempts = 3) {
  for (let i = 0; i < attempts; i += 1) {
    const res = await fetch(`https://api.quotable.io/random?tags=${tags}&maxLength=180`);
    if (!res.ok) throw new Error('Quote API unavailable');
    const data = await res.json();
    if (data._id !== excludeId) {
      return data;
    }
  }
  throw new Error('Could not fetch a new quote');
}

export async function fetchMoodQuote(moodId, { excludeId } = {}) {
  const mood = getMoodById(moodId);
  const tags = mood.quoteTags.join('|');

  try {
    const data = await fetchFromQuotable(tags, excludeId);
    return {
      id: data._id,
      content: data.content,
      author: data.author,
      mood: moodId,
    };
  } catch {
    const fallback = pickFallback(moodId, excludeId);
    return {
      id: `${fallback._id}-${Date.now()}`,
      content: fallback.content,
      author: fallback.author,
      mood: moodId,
      fallback: true,
    };
  }
}
