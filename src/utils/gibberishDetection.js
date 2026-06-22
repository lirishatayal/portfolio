const KEYBOARD_MASH = ['asdf', 'qwerty', 'qwer', 'zxcv', 'qazwsx', 'hjkl'];
const KEYBOARD_MASH_BASES = ['asdf', 'qwert', 'qwerty', 'zxcv', 'zxcvb', 'qazwsx', 'hjkl'];

const SHORT_WORDS = new Set([
  'a', 'an', 'am', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'hi', 'hey',
  'if', 'in', 'is', 'it', 'me', 'my', 'no', 'ok', 'on', 'or', 'so', 'to',
  'up', 'us', 'we', 'why', 'who', 'how',
]);

const COMMON_WORDS = new Set(
  `
  about above after again all also and any are ask back been before being best
  better between both but can come could day did does doing done each even every
  experience explain first for from get give go good got had has have having
  help here high him his how if into its job just know like list little live
  long look made make many may me mean more most much must my name need new
  not now of off old on once one only or other our out over own part people
  place please project projects put really right said same say see she should
  show since skill skills so some something still such take tell than that the
  their them then there these they thing think this those through time too
  try two under up use very want was way well were what when where which while
  who why will with work would write year you your yours
  able access account across add address after ago along already always another
  around available awesome background based basic become behind below big bit
  blog book both build building built business call called career change chat
  check choose city clear click client close code coding come company connect
  contact continue cool copy create current custom data date dear degree
  deliver describe detail develop developer development different digital direct
  download early easy education email end enjoy especially etc even ever
  everyone everything example excited exciting explore favorite feature feel
  find fine focus follow form found free friend frontend full fun future game
  general get github give glad global goal great group grow happy hard hello
  hire hiring hope html idea image important include info information interest
  interested interesting interview introduce introduction join journey keep kind
  language large last latest learn learning least leave less let level life
  light like link linkedin little local location love main major make making
  manage many maybe mean means meet message might mind mobile more most move
  much must myself name near need never next nice note nothing notice now
  number offer often once online only open opportunity option others outside
  overview own page part particular pass past people perfect perhaps person
  phone place plan platform play please portfolio position possible post power
  prefer pretty probably problem process product professional profile program
  provide question quick quite reach read ready real really reason recent
  recommend related remember remote resume role run same save say search section
  see seem send senior sense service share short show side simple since site
  small so social software someone something sometimes soon sort sound source
  special specific stack stand start started still story strong stuff such
  suggest summary support sure system take talk team tech technical technology
  tell thank thanks thing think third this though thought three through time
  together too tool tools top total touch try turn type under understand until
  update use used useful user usually value very view visit want way website
  welcome well what when where which while who whole why will with within
  without word work working world would write written wrong year yes yet you
  young your yourself
  react javascript typescript html css tailwind next node npm git github api
  rest wordpress figma gsap three webgl ui ux seo cms jira bitbucket copilot
  cursor animation animations design system systems performance open source
  lirisha tayal delhi india cognizant z1
  `.trim().split(/\s+/),
);

const COMMON_BIGRAMS = new Set([
  'th', 'he', 'in', 'er', 'an', 're', 'on', 'at', 'en', 'nd', 'ti', 'es', 'or',
  'te', 'of', 'ed', 'is', 'it', 'al', 'ar', 'st', 'to', 'nt', 'ng', 'se', 'ha',
  'as', 'ou', 'io', 'le', 'co', 'me', 'de', 'hi', 'ri', 'ro', 'ic', 'ne', 'ea',
  'ra', 'ce', 'li', 'ch', 'll', 'be', 'ma', 'si', 'om', 'ur', 'el', 'ta', 'la',
  'ns', 'tr', 'di', 'ho', 'no', 'ee', 'ew', 'ow', 'ly', 've', 'us', 'un', 'im',
  'il', 'ly', 'gh', 'ck', 'ss', 'tt', 'pp', 'mm', 'nn', 'ff', 'rr', 'oo', 'ai',
  'ay', 'ey', 'ie', 'ea', 'ou', 'au', 'oi', 'oy',
]);

const RARE_STARTS = /^(hd|bd|gd|bf|df|fg|gj|hj|jf|jk|kj|jq|mj|nj|pj|qf|qj|vj|wf|xd|xq|xz|zd|bq|cq|dq|fq|gq|jq|kq|vq|xq|zq|dw|fw|gw|hw|jw|kw|mw|nw|pw|qw|rw|tw|vw|ww|xw|zw|dz|fz|gz|hz|jz|kz|lz|mz|nz|pz|qz|rz|tz|vz|wz|xz|zz)/;

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function sortedChars(text) {
  return text.toLowerCase().split('').sort().join('');
}

function isKeyboardMash(word) {
  const lower = word.toLowerCase();
  if (KEYBOARD_MASH.some((m) => lower.includes(m))) return true;

  const sig = sortedChars(lower);
  return KEYBOARD_MASH_BASES.some((mash) => sig === sortedChars(mash));
}

function isKeyboardWalk(word) {
  const lower = word.toLowerCase();
  if (lower.length < 4) return false;

  for (const row of KEYBOARD_ROWS) {
    let run = 1;
    for (let i = 1; i < lower.length; i += 1) {
      const prev = row.indexOf(lower[i - 1]);
      const curr = row.indexOf(lower[i]);
      if (prev !== -1 && curr !== -1 && Math.abs(prev - curr) === 1) {
        run += 1;
        if (run >= 4) return true;
      } else {
        run = 1;
      }
    }
  }

  return false;
}

function maxConsonantRun(word) {
  const runs = word.match(/[^aeiouy]+/g) || [];
  return runs.length ? Math.max(...runs.map((run) => run.length)) : 0;
}

function countCommonBigrams(word) {
  let count = 0;
  for (let i = 0; i < word.length - 1; i += 1) {
    if (COMMON_BIGRAMS.has(word.slice(i, i + 2))) count += 1;
  }
  return count;
}

function isKnownWord(word) {
  return SHORT_WORDS.has(word) || COMMON_WORDS.has(word);
}

function hasEnglishShape(word) {
  const vowels = (word.match(/[aeiouy]/g) || []).length;
  if (vowels === 0) return false;

  const ratio = vowels / word.length;
  if (ratio < 0.18 || ratio > 0.72) return false;
  if (maxConsonantRun(word) > 3) return false;
  if (RARE_STARTS.test(word)) return false;
  if (/(.)\1{2,}/.test(word)) return false;

  const minBigrams = word.length <= 4 ? 1 : Math.max(1, Math.floor(word.length / 4));
  if (countCommonBigrams(word) < minBigrams) return false;

  return true;
}

function isGibberishWord(word) {
  const lower = word.toLowerCase().replace(/[^a-z']/g, '');
  if (!lower) return true;
  if (lower.length <= 2) return false;
  if (isKnownWord(lower)) return false;

  if (isKeyboardMash(lower)) return true;
  if (isKeyboardWalk(lower)) return true;
  if (/(.)\1{2,}/.test(lower)) return true;

  const vowels = (lower.match(/[aeiouy]/g) || []).length;
  if (lower.length >= 3 && vowels === 0) return true;
  if (lower.length >= 4 && vowels / lower.length < 0.15) return true;

  if (lower.length >= 3 && !hasEnglishShape(lower)) return true;

  return false;
}

export function looksLikeTypo(text) {
  const words = text.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;

  const knownCount = words.filter((word) => isKnownWord(word.replace(/[^a-z']/g, ''))).length;

  if (words.length > 1 && knownCount >= Math.ceil(words.length / 2)) {
    return words.every((word) => isGibberishWord(word));
  }

  return words.some((word) => isGibberishWord(word));
}
