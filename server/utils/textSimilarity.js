/**
 * CampusFind AI - Text & Semantic Preprocessing Utilities
 * Token normalization, stop words removal, synonym expansion, TF-IDF & Cosine/Jaccard similarity.
 */

// Common stop words to strip during preprocessing
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
  'cannot', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no',
  'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over',
  'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until',
  'up', 'very', 'was', 'wasn\'t', 'we', 'were', 'weren\'t', 'what', 'when', 'where', 'which', 'while', 'who',
  'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves', 'lost', 'found', 'near',
  'around', 'please', 'help', 'some', 'containing', 'contains'
]);

// Campus item domain synonym map
const SYNONYM_GROUPS = [
  ['phone', 'smartphone', 'mobile', 'cell', 'iphone', 'galaxy', 'android', 'device', 'cellular', 'handset', 'telephone'],
  ['wallet', 'purse', 'billfold', 'clutch', 'pouch', 'cardholder', 'moneyclip', 'cash', 'money'],
  ['bag', 'backpack', 'rucksack', 'knapsack', 'satchel', 'duffel', 'tote', 'sack', 'briefcase', 'bagpack'],
  ['glasses', 'spectacles', 'specs', 'eyewear', 'sunglasses', 'shades', 'frames', 'lens', 'goggles'],
  ['laptop', 'macbook', 'notebook', 'chromebook', 'thinkpad', 'computer', 'pc'],
  ['earphones', 'airpods', 'earbuds', 'headphones', 'headset', 'buds', 'airpod', 'earphone'],
  ['bottle', 'flask', 'thermos', 'hydroflask', 'canteen', 'waterbottle', 'cup', 'tumbler', 'sipper'],
  ['keys', 'key', 'keychain', 'fob', 'ring', 'housekey'],
  ['id', 'badge', 'card', 'identity', 'license', 'pass', 'smartcard', 'collegeid'],
  ['book', 'notebook', 'textbook', 'journal', 'binder', 'register', 'diary', 'copys'],
  ['jacket', 'coat', 'hoodie', 'sweater', 'sweatshirt', 'windbreaker', 'pullover', 'cardigan', 'blazer'],
  ['watch', 'smartwatch', 'applewatch', 'timepiece', 'wristband', 'fitbit', 'clock']
];

// Map word -> canonical representative word
const SYNONYM_MAP = new Map();
SYNONYM_GROUPS.forEach((group) => {
  const canonical = group[0];
  group.forEach((word) => SYNONYM_MAP.set(word.toLowerCase(), canonical));
});

/**
 * Preprocess and tokenize input text
 * @param {string} text 
 * @returns {Array<string>} Tokens
 */
function normalizeAndTokenize(text) {
  if (!text || typeof text !== 'string') return [];

  // Lowercase & remove non-alphanumeric except spaces
  const cleaned = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

  // Split into tokens
  const rawTokens = cleaned.split(/\s+/).filter((w) => w.length >= 2);

  // Remove stop words and map synonyms to canonical form
  const processedTokens = [];
  rawTokens.forEach((word) => {
    if (!STOP_WORDS.has(word)) {
      const canonical = SYNONYM_MAP.get(word) || word;
      processedTokens.push(canonical);
    }
  });

  return processedTokens;
}

/**
 * Calculate Jaccard and Cosine similarity score (0 to 100) between two text blocks
 * @param {string} text1 
 * @param {string} text2 
 * @returns {number} Score 0-100
 */
function calculateTextSemanticScore(text1, text2) {
  const tokens1 = normalizeAndTokenize(text1);
  const tokens2 = normalizeAndTokenize(text2);

  if (tokens1.length === 0 || tokens2.length === 0) return 0;

  // Count term frequencies
  const freq1 = {};
  const freq2 = {};

  tokens1.forEach((t) => (freq1[t] = (freq1[t] || 0) + 1));
  tokens2.forEach((t) => (freq2[t] = (freq2[t] || 0) + 1));

  const allTokens = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  let intersectionCount = 0;
  let unionSet = new Set([...tokens1, ...tokens2]);

  allTokens.forEach((token) => {
    const v1 = freq1[token] || 0;
    const v2 = freq2[token] || 0;

    if (v1 > 0 && v2 > 0) {
      intersectionCount++;
    }

    dotProduct += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });

  const cosineSim = (mag1 > 0 && mag2 > 0) ? dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2)) : 0;
  const jaccardSim = unionSet.size > 0 ? intersectionCount / unionSet.size : 0;

  // Combined weighted semantic similarity metric
  const combinedSim = cosineSim * 0.7 + jaccardSim * 0.3;

  return Math.min(Math.round(combinedSim * 100), 100);
}

/**
 * Compare two short string attributes (like brand, color, title)
 * @param {string} str1 
 * @param {string} str2 
 * @returns {number} Score 0-100
 */
function calculateAttributeSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 100;

  const canon1 = SYNONYM_MAP.get(s1) || s1;
  const canon2 = SYNONYM_MAP.get(s2) || s2;

  if (canon1 === canon2) return 100;
  if (s1.includes(s2) || s2.includes(s1)) return 85;

  // Word overlap
  const tokens1 = normalizeAndTokenize(s1);
  const tokens2 = normalizeAndTokenize(s2);
  const common = tokens1.filter((t) => tokens2.includes(t));

  if (common.length > 0) return 75;

  return 0;
}

module.exports = {
  STOP_WORDS,
  SYNONYM_MAP,
  normalizeAndTokenize,
  calculateTextSemanticScore,
  calculateAttributeSimilarity
};
