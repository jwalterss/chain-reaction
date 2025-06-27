import wordAssociationsData from './wordAssociations.json';

export interface WordAssociation {
  word: string;
  difficulty: number; // 0-1, where 0.1 is easiest and 0.9+ is hardest
  category: string;
}

export interface WordAssociationsData {
  baseWord: string;
  totalWords: number;
  description: string;
  categories: { [key: string]: string };
  words: WordAssociation[];
}

export const wordAssociations: WordAssociationsData = wordAssociationsData;

// Helper functions for game logic
export function getWordsByDifficulty(minDifficulty: number, maxDifficulty: number): WordAssociation[] {
  return wordAssociations.words.filter(w => w.difficulty >= minDifficulty && w.difficulty <= maxDifficulty);
}

export function getWordsByCategory(category: string): WordAssociation[] {
  return wordAssociations.words.filter(w => w.category === category);
}

export function isValidWord(word: string): boolean {
  return wordAssociations.words.some(w => w.word.toLowerCase() === word.toLowerCase());
}

export function getWordInfo(word: string): WordAssociation | undefined {
  return wordAssociations.words.find(w => w.word.toLowerCase() === word.toLowerCase());
}

// Difficulty ranges for progressive gameplay
export const DIFFICULTY_RANGES = {
  BEGINNER: { min: 0.1, max: 0.3 },
  INTERMEDIATE: { min: 0.2, max: 0.5 },
  ADVANCED: { min: 0.3, max: 0.7 },
  EXPERT: { min: 0.4, max: 0.9 },
  MASTER: { min: 0.5, max: 1.0 }
};

// Get words based on chain length (progressive difficulty)
export function getWordsForChainLength(chainLength: number): WordAssociation[] {
  if (chainLength <= 3) return getWordsByDifficulty(DIFFICULTY_RANGES.BEGINNER.min, DIFFICULTY_RANGES.BEGINNER.max);
  if (chainLength <= 6) return getWordsByDifficulty(DIFFICULTY_RANGES.INTERMEDIATE.min, DIFFICULTY_RANGES.INTERMEDIATE.max);
  if (chainLength <= 9) return getWordsByDifficulty(DIFFICULTY_RANGES.ADVANCED.min, DIFFICULTY_RANGES.ADVANCED.max);
  if (chainLength <= 12) return getWordsByDifficulty(DIFFICULTY_RANGES.EXPERT.min, DIFFICULTY_RANGES.EXPERT.max);
  return getWordsByDifficulty(DIFFICULTY_RANGES.MASTER.min, DIFFICULTY_RANGES.MASTER.max);
}