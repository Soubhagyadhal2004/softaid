
// NLP (Natural Language Processing) utilities

// Lowercasing
export const lowercase = (text: string): string => {
  return text.toLowerCase();
};

// Tokenization
export const tokenize = (text: string): string[] => {
  return text.toLowerCase().split(/\W+/).filter(token => token.length > 0);
};

// Stop words list
export const stopWords = new Set([
  "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", 
  "with", "about", "in", "is", "am", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "shall", "will", "should", "would",
  "may", "might", "must", "can", "could", "i", "you", "he", "she", "it", "we", "they",
  "me", "him", "her", "us", "them", "my", "your", "his", "its", "our", "their",
  "mine", "yours", "hers", "ours", "theirs", "this", "that", "these", "those",
  "of", "from", "as", "so", "such", "get", "getting", "got", "having"
]);

// Remove stop words
export const removeStopWords = (tokens: string[]): string[] => {
  return tokens.filter(token => !stopWords.has(token));
};

// Basic stemming function (simplified Porter stemmer logic)
export const stem = (word: string): string => {
  // Handle some common medical term suffixes
  if (word.endsWith("ing")) return word.slice(0, -3);
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  if (word.endsWith("ed")) return word.slice(0, -2);
  if (word.endsWith("es")) return word.slice(0, -2);
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("aches")) return word.slice(0, -2);
  return word;
};

// Apply stemming to each token
export const stemTokens = (tokens: string[]): string[] => {
  return tokens.map(token => stem(token));
};

// Text preprocessing pipeline
export const preprocessText = (text: string): string[] => {
  const lowercased = lowercase(text);
  const tokens = tokenize(lowercased);
  const withoutStopWords = removeStopWords(tokens);
  const stemmed = stemTokens(withoutStopWords);
  return stemmed;
};

// Calculate Levenshtein distance for fuzzy matching
export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

// Calculate similarity ratio for two strings
export const similarityRatio = (a: string, b: string): number => {
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
};
