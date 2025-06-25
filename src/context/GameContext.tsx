
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { format } from 'date-fns';
import seedrandom from 'seedrandom';
import {
  wordAssociations,
  getAssociationDetails,
  type WordAssociation,
} from '../data/expandedWordAssociations';
import {
  getWordsForGrid,
  isValidThematicWord,
  thematicWordBanks,
  getThematicWords,
} from '../data/thematicWordBanks';

// Type definitions
export type WordNode = {
  id: number;
  word: string;
  position: { x: number; y: number };
  isActive: boolean;
  score: number;
};

export type GameState = {
  isPlaying: boolean;
  isGameOver: boolean;
  score: number;
  timer: number;
  currentWord: string;
  baseWord: string; // The original thematic word that all others must relate to
  wordChain: WordNode[];
  letterGrid: string[];
  selectedLetters: number[];
  selectedWord: string;
  streakCount: number;
  startDate: string;
  dailyWord: string;
  lastPlayedDate: string | null;
};

type GameAction =
    | { type: 'START_GAME' }
    | { type: 'END_GAME' }
    | { type: 'TICK_TIMER' }
    | { type: 'SELECT_LETTER'; index: number }
    | { type: 'DESELECT_LETTER'; index: number }
    | { type: 'CLEAR_SELECTION' }
    | { type: 'SUBMIT_WORD' }
    | { type: 'RESET_GAME' };

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  isValidWord: (word: string) => boolean;
  isAssociatedWithCurrentWord: (word: string) => boolean;
  getWordScore: (word: string) => number;
  getAssociationDetails: (word1: string, word2: string) => WordAssociation | null;
  getPossibleAssociations: (word: string) => string[];
};

// Constants
const GAME_DURATION = 120; // 2 minutes in seconds
const DAILY_WORDS = Object.keys(thematicWordBanks); // Use words that have thematic banks

// Helper functions
const getTodayFormatted = () => format(new Date(), 'yyyy-MM-dd');

// Get a deterministic word for today based on date
const getDailyWord = (): string => {
  const today = getTodayFormatted();
  const rng = seedrandom(today);
  const index = Math.floor(rng() * DAILY_WORDS.length);
  return DAILY_WORDS[index];
};

// Calculate thematic score based on word length and chain progression
const calculateThematicScore = (wordLength: number, chainLength: number): number => {
  // Base score for word length
  let score = wordLength * 10;
  
  // Bonus for longer chains (progression gets harder)
  score += chainLength * 5;
  
  // Bonus for longer words
  if (wordLength >= 6) score += 20;
  if (wordLength >= 8) score += 40;
  
  return score;
};

// Generate letter grid optimized for thematic words
const generateThematicLetterGrid = (baseWord: string, chainLength: number, usedWords: string[]): string[] => {
  // Get thematic words that could be formed
  const thematicWords = getWordsForGrid(baseWord, chainLength, usedWords, 20);
  
  // If no thematic words available, fall back to basic grid
  if (thematicWords.length === 0) {
    const commonLetters = 'eariotnslcudpmhgbfywkvxzjq';
    return Array(36).fill('').map(() =>
        commonLetters[Math.floor(Math.random() * commonLetters.length)]
    );
  }
  
  // Count letter frequency across thematic words
  const letterFrequency = new Map<string, number>();
  thematicWords.forEach(word => {
    word.toLowerCase().split('').forEach(letter => {
      letterFrequency.set(letter, (letterFrequency.get(letter) || 0) + 1);
    });
  });
  
  // Build letters array with frequency-based distribution
  const letters: string[] = [];
  
  // Add letters based on thematic word frequency
  for (const [letter, frequency] of letterFrequency.entries()) {
    const timesToAdd = Math.min(4, Math.max(1, Math.ceil(frequency / 2)));
    for (let i = 0; i < timesToAdd; i++) {
      letters.push(letter);
    }
  }
  
  // Ensure essential letters are present
  const essentialLetters = ['a', 'e', 'i', 'o', 'u', 'r', 'n', 's', 't', 'l', 'd', 'g', 'c', 'm', 'p', 'b', 'f', 'h', 'v', 'w', 'y', 'k', 'j', 'x', 'q', 'z'];
  essentialLetters.forEach(letter => {
    if (!letters.includes(letter) && letters.length < 32) {
      letters.push(letter);
    }
  });
  
  // Fill remaining spaces with high-frequency letters
  const highFreqLetters = 'eariotnslcudpmhgbfywkjxqz';
  let freqIndex = 0;
  
  while (letters.length < 36) {
    const nextLetter = highFreqLetters[freqIndex % highFreqLetters.length];
    letters.push(nextLetter);
    freqIndex++;
  }
  
  // Shuffle for randomness
  return letters.sort(() => Math.random() - 0.5);
};

// Legacy function for backward compatibility (now uses thematic approach) 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateLetterGrid = (word: string): string[] => {
  const associations = wordAssociations[word.toLowerCase()] || [];

  // If no associations found, return balanced letter distribution
  if (associations.length === 0) {
    const commonLetters = 'eariotnslcudpmhgbfywkvxzjq';
    return Array(36).fill('').map(() =>
        commonLetters[Math.floor(Math.random() * commonLetters.length)]
    );
  }

  // Include ALL associations for maximum word formation possibilities
  const allAssociations = [...associations];
  
  // For legacy compatibility, try to use thematic words if available
  const thematicWords = Object.keys(thematicWordBanks).includes(word.toLowerCase()) 
    ? getWordsForGrid(word.toLowerCase(), 1, [], 15)
    : [];
  
  let wordsToInclude = thematicWords.length > 0 
    ? thematicWords 
    : allAssociations.map(assoc => assoc.word);
  
  // Add common word variations for ALL words
  const wordVariations: string[] = [];
  wordsToInclude.forEach(word => {
    if (word.length <= 8) { // Expanded length limit
      // Add more variations
      wordVariations.push(word + 'ed');
      wordVariations.push(word + 'ing'); 
      wordVariations.push(word + 's');
      wordVariations.push(word + 'er');
      wordVariations.push(word + 'est');
      wordVariations.push(word + 'ly');
      wordVariations.push(word + 'ion');
      wordVariations.push(word + 'al');
      
      // Add prefixes too
      if (word.length <= 6) {
        wordVariations.push('un' + word);
        wordVariations.push('re' + word);
        wordVariations.push('pre' + word);
      }
    }
  });
  
  // Include all variations
  wordsToInclude = [...wordsToInclude, ...wordVariations];

  // Count letter frequency across ALL words
  const letterFrequency = new Map<string, number>();
  wordsToInclude.forEach(word => {
    word.toLowerCase().split('').forEach(letter => {
      letterFrequency.set(letter, (letterFrequency.get(letter) || 0) + 1);
    });
  });

  // Build comprehensive letters array
  const letters: string[] = [];
  
  // Add all letters from associations with frequency-based duplicates
  for (const [letter, frequency] of letterFrequency.entries()) {
    const timesToAdd = Math.min(4, Math.max(1, Math.ceil(frequency / 3)));
    for (let i = 0; i < timesToAdd; i++) {
      letters.push(letter);
    }
  }

  // Ensure all essential English letters are present (expanded set)
  const essentialLetters = ['a', 'e', 'i', 'o', 'u', 'r', 'n', 's', 't', 'l', 'd', 'g', 'c', 'm', 'p', 'b', 'f', 'h', 'v', 'w', 'y', 'k', 'j', 'x', 'q', 'z'];
  essentialLetters.forEach(letter => {
    if (!letters.includes(letter) && letters.length < 32) {
      letters.push(letter);
    }
  });

  // Fill remaining spaces with high-frequency letters for word formation
  const highFreqLetters = 'eariotnslcudpmhgbfywkjxqz';
  let freqIndex = 0;

  while (letters.length < 36) { // Expanded to 6x6 grid
    const nextLetter = highFreqLetters[freqIndex % highFreqLetters.length];
    letters.push(nextLetter);
    freqIndex++;
  }

  // Shuffle for randomness but ensure good distribution
  return letters.sort(() => Math.random() - 0.5);
};

// Get initial game state
const getInitialState = (): GameState => {
  const today = getTodayFormatted();
  const dailyWord = getDailyWord();

  // Check for saved state
  const savedState = localStorage.getItem('chainReactionGameState');
  if (savedState) {
    const parsed = JSON.parse(savedState);

    // Only restore state if it's from today AND has the correct grid size AND has baseWord
    if (parsed.startDate === today && parsed.letterGrid?.length === 36) {
      // Ensure baseWord is set (for backward compatibility)
      if (!parsed.baseWord) {
        parsed.baseWord = parsed.dailyWord || dailyWord;
      }
      return parsed;
    }
    
    // If grid size is wrong, clear old state and start fresh
    if (parsed.letterGrid?.length !== 36) {
      console.log('Clearing old game state due to grid size change');
      localStorage.removeItem('chainReactionGameState');
    }

    // For a new day, save streak data
    return {
      isPlaying: false,
      isGameOver: false,
      score: 0,
      timer: GAME_DURATION,
      currentWord: dailyWord,
      baseWord: dailyWord, // Set the thematic base word
      wordChain: [
        {
          id: 0,
          word: dailyWord,
          position: { x: 50, y: 50 },
          isActive: true,
          score: 0,
        },
      ],
      letterGrid: generateThematicLetterGrid(dailyWord, 1, [dailyWord]),
      selectedLetters: [],
      selectedWord: '',
      streakCount: calculateStreak(parsed.lastPlayedDate, today, parsed.streakCount),
      startDate: today,
      dailyWord,
      lastPlayedDate: parsed.lastPlayedDate,
    };
  }

  // New game with no previous state
  return {
    isPlaying: false,
    isGameOver: false,
    score: 0,
    timer: GAME_DURATION,
    currentWord: dailyWord,
    baseWord: dailyWord, // Set the thematic base word
    wordChain: [
      {
        id: 0,
        word: dailyWord,
        position: { x: 50, y: 50 },
        isActive: true,
        score: 0,
      },
    ],
    letterGrid: generateThematicLetterGrid(dailyWord, 1, [dailyWord]),
    selectedLetters: [],
    selectedWord: '',
    streakCount: 0,
    startDate: today,
    dailyWord,
    lastPlayedDate: null,
  };
};

// Calculate streak based on last played date
function calculateStreak(lastPlayed: string | null, today: string, currentStreak: number): number {
  if (!lastPlayed) return 0;

  const lastDate = new Date(lastPlayed);
  const todayDate = new Date(today);
  const yesterday = new Date(todayDate);
  yesterday.setDate(yesterday.getDate() - 1);

  // If last played was yesterday, continue streak
  if (format(lastDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
    return currentStreak + 1;
  }

  // If last played was today, maintain streak
  if (format(lastDate, 'yyyy-MM-dd') === today) {
    return currentStreak;
  }

  // Otherwise, reset streak
  return 0;
}

// Game reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        isGameOver: false,
        timer: GAME_DURATION,
        lastPlayedDate: getTodayFormatted(),
      };

    case 'END_GAME':
      return {
        ...state,
        isPlaying: false,
        isGameOver: true,
      };

    case 'TICK_TIMER':
      if (state.timer <= 0) {
        return {
          ...state,
          isPlaying: false,
          isGameOver: true,
          timer: 0,
        };
      }
      return {
        ...state,
        timer: state.timer - 1,
      };

    case 'SELECT_LETTER': {
      const { index } = action;

      // Ignore if already selected
      if (state.selectedLetters.includes(index)) {
        return state;
      }

      // CRITICAL CHANGE: No adjacency requirements
      // Allow selection of any letter, regardless of position

      // Add to selection and update selected word
      const newSelectedLetters = [...state.selectedLetters, index];
      const selectedWord = newSelectedLetters
          .map(i => state.letterGrid[i].toLowerCase())
          .join('');

      return {
        ...state,
        selectedLetters: newSelectedLetters,
        selectedWord,
      };
    }

    case 'DESELECT_LETTER': {
      const { index } = action;

      // If not found or not the last letter, ignore
      const letterPosition = state.selectedLetters.indexOf(index);
      if (letterPosition === -1 || letterPosition !== state.selectedLetters.length - 1) {
        return state;
      }

      // Remove the last letter from selection
      const newSelectedLetters = state.selectedLetters.slice(0, -1);
      const selectedWord = newSelectedLetters
          .map(i => state.letterGrid[i].toLowerCase())
          .join('');

      return {
        ...state,
        selectedLetters: newSelectedLetters,
        selectedWord,
      };
    }

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedLetters: [],
        selectedWord: '',
      };

    case 'SUBMIT_WORD': {

      // Check validity conditions
      if (
          !state.selectedWord ||
          state.selectedWord.length < 3 ||
          state.wordChain.some(node => node.word.toLowerCase() === state.selectedWord.toLowerCase())
      ) {
        return {
          ...state,
          selectedLetters: [],
          selectedWord: '',
        };
      }

      // Check if word is thematically valid (relates to the base word)
      if (!isValidThematicWord(state.baseWord, state.selectedWord)) {
        return {
          ...state,
          selectedLetters: [],
          selectedWord: '',
        };
      }

      // Calculate thematic score
      const wordScore = calculateThematicScore(
          state.selectedWord.length,
          state.wordChain.length
      );

      // Create new word node
      // Calculate position in a circular pattern around the center
      const angleStep = (2 * Math.PI) / Math.max(8, state.wordChain.length);
      const angle = state.wordChain.length * angleStep;
      const radius = 30 + Math.min(10, state.wordChain.length); // Grow slightly with chain length
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      const newNode: WordNode = {
        id: state.wordChain.length,
        word: state.selectedWord,
        position: { x, y },
        isActive: true,
        score: wordScore,
      };

      // Update chain - mark all previous nodes as inactive
      const updatedChain = state.wordChain.map(node => ({
        ...node,
        isActive: false,
      }));

      // Add new node to chain
      updatedChain.push(newNode);

      // Generate new letter grid based on thematic words
      const usedWords = [...state.wordChain.map(node => node.word), state.selectedWord];
      const newLetterGrid = generateThematicLetterGrid(state.baseWord, state.wordChain.length + 1, usedWords);

      return {
        ...state,
        wordChain: updatedChain,
        currentWord: state.selectedWord,
        letterGrid: newLetterGrid,
        selectedLetters: [],
        selectedWord: '',
        score: state.score + wordScore,
      };
    }

    case 'RESET_GAME': {
      const today = getTodayFormatted();
      const dailyWord = getDailyWord();

      return {
        isPlaying: false,
        isGameOver: false,
        score: 0,
        timer: GAME_DURATION,
        currentWord: dailyWord,
        baseWord: dailyWord, // Set the thematic base word
        wordChain: [
          {
            id: 0,
            word: dailyWord,
            position: { x: 50, y: 50 },
            isActive: true,
            score: 0,
          },
        ],
        letterGrid: generateThematicLetterGrid(dailyWord, 1, [dailyWord]),
        selectedLetters: [],
        selectedWord: '',
        streakCount: state.streakCount, // Preserve streak
        startDate: today,
        dailyWord,
        lastPlayedDate: state.lastPlayedDate, // Preserve last played date
      };
    }

    default:
      return state;
  }
};

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Game provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chainReactionGameState', JSON.stringify(state));
  }, [state]);

  // Timer functionality
  useEffect(() => {
    let timerId: number | undefined;

    if (state.isPlaying && !state.isGameOver) {
      timerId = window.setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [state.isPlaying, state.isGameOver]);

  // End game when timer runs out
  useEffect(() => {
    if (state.timer <= 0 && state.isPlaying) {
      dispatch({ type: 'END_GAME' });
    }
  }, [state.timer, state.isPlaying]);

  // Helper functions exposed in context
  const isValidWord = (word: string): boolean => {
    return word.length >= 3 &&
        isValidThematicWord(state.baseWord, word);
  };

  const isAssociatedWithCurrentWord = (word: string): boolean => {
    if (!word || word.length < 3) return false;

    // In thematic mode, all words must relate to the base word, not just the current word
    return isValidThematicWord(state.baseWord, word);
  };

  const getWordScore = (word: string): number => {
    if (!word || word.length < 3) return 0;

    return calculateThematicScore(word.length, state.wordChain.length);
  };

  const getAssociationDetailsLocal = (word1: string, word2: string): WordAssociation | null => {
    if (!word1 || !word2) return null;
    return getAssociationDetails(word1, word2, wordAssociations);
  };

  // Get all possible thematic words for the current base word
  // Useful for debugging and potentially for hints
  const getPossibleAssociations = (): string[] => {
    // In thematic mode, get all words that relate to the base word
    const usedWords = state.wordChain.map(node => node.word);
    const thematicWords = getThematicWords(state.baseWord, state.wordChain.length, usedWords);
    return thematicWords.map(tw => tw.word);
  };

  return (
      <GameContext.Provider
          value={{
            state,
            dispatch,
            isValidWord,
            isAssociatedWithCurrentWord,
            getWordScore,
            getAssociationDetails: getAssociationDetailsLocal,
            getPossibleAssociations,
          }}
      >
        {children}
      </GameContext.Provider>
  );
};

// Custom hook for using the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};