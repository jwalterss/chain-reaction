import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { format } from 'date-fns';
import seedrandom from 'seedrandom';
import {
  wordAssociations,
  areWordsAssociated,
  getAssociationDetails,
  calculateAssociationScore,
  type WordAssociation,
  type WordAssociationsMap
} from '../data/wordAssociations';

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
const DAILY_WORDS = Object.keys(wordAssociations).filter(word =>
    // Filter to words that have at least 8 associations
    wordAssociations[word] && wordAssociations[word].length >= 8
);

// Helper functions
const getTodayFormatted = () => format(new Date(), 'yyyy-MM-dd');

// Get a deterministic word for today based on date
const getDailyWord = (): string => {
  const today = getTodayFormatted();
  const rng = seedrandom(today);
  const index = Math.floor(rng() * DAILY_WORDS.length);
  return DAILY_WORDS[index];
};

// Generate an improved grid of letters that includes many possible associations
const generateLetterGrid = (word: string): string[] => {
  const associations = wordAssociations[word.toLowerCase()] || [];

  // If no associations found, return random letters
  if (associations.length === 0) {
    return Array(25).fill('').map(() =>
        'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
    );
  }

  // Sort associations by strength to prioritize stronger associations
  const sortedAssociations = [...associations].sort((a, b) => b.strength - a.strength);

  // Take the top associations to include in the grid
  // Ensure we include at least 3-5 strong associations to avoid dead ends
  const targetAssociationCount = Math.min(5, sortedAssociations.length);
  const targetAssociations = sortedAssociations.slice(0, targetAssociationCount);

  // Always include letters for at least 3 different association words
  const wordsToInclude = targetAssociations.map(assoc => assoc.word);

  // Create a set of all unique letters needed for these words
  const requiredLetters = new Set<string>();
  wordsToInclude.forEach(word => {
    word.toLowerCase().split('').forEach(letter => requiredLetters.add(letter));
  });

  // Convert to array and ensure we don't exceed 25 cells
  let letters = Array.from(requiredLetters);

  // If we have too many letters, prioritize the most important words
  if (letters.length > 25) {
    // Just get the most important associations
    requiredLetters.clear();
    for (let i = 0; i < Math.min(3, wordsToInclude.length); i++) {
      wordsToInclude[i].toLowerCase().split('').forEach(letter =>
          requiredLetters.add(letter)
      );

      // Break early if we're approaching 25 letters
      if (requiredLetters.size >= 20) break;
    }
    letters = Array.from(requiredLetters);
  }

  // Fill remaining spaces with common letters to help form more words
  const commonLetters = 'eariotnslcudpmhgbfywkvxzjq'; // Ordered by frequency
  let commonIndex = 0;

  while (letters.length < 25) {
    const nextLetter = commonLetters[commonIndex % commonLetters.length];
    if (!letters.includes(nextLetter)) {
      letters.push(nextLetter);
    }
    commonIndex++;
  }

  // Shuffle the letters for the grid
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

    // Only restore state if it's from today
    if (parsed.startDate === today) {
      return parsed;
    }

    // For a new day, save streak data
    return {
      isPlaying: false,
      isGameOver: false,
      score: 0,
      timer: GAME_DURATION,
      currentWord: dailyWord,
      wordChain: [
        {
          id: 0,
          word: dailyWord,
          position: { x: 50, y: 50 },
          isActive: true,
          score: 0,
        },
      ],
      letterGrid: generateLetterGrid(dailyWord),
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
    wordChain: [
      {
        id: 0,
        word: dailyWord,
        position: { x: 50, y: 50 },
        isActive: true,
        score: 0,
      },
    ],
    letterGrid: generateLetterGrid(dailyWord),
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
      // Get the current active word
      const currentWordIndex = state.wordChain.findIndex(node => node.isActive);
      const currentWord = state.wordChain[currentWordIndex]?.word || '';

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

      // Check if words are associated
      if (!areWordsAssociated(currentWord, state.selectedWord, wordAssociations)) {
        return {
          ...state,
          selectedLetters: [],
          selectedWord: '',
        };
      }

      // Get association details for scoring
      const association = getAssociationDetails(currentWord, state.selectedWord, wordAssociations);

      // Calculate score for this word
      const wordScore = calculateAssociationScore(
          association,
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

      // Generate new letter grid based on the new word
      const newLetterGrid = generateLetterGrid(state.selectedWord);

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
        wordChain: [
          {
            id: 0,
            word: dailyWord,
            position: { x: 50, y: 50 },
            isActive: true,
            score: 0,
          },
        ],
        letterGrid: generateLetterGrid(dailyWord),
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
        Object.keys(wordAssociations).includes(word.toLowerCase());
  };

  const isAssociatedWithCurrentWord = (word: string): boolean => {
    if (!word || word.length < 3) return false;

    const currentNode = state.wordChain.find(node => node.isActive);
    if (!currentNode) return false;

    return areWordsAssociated(currentNode.word, word, wordAssociations);
  };

  const getWordScore = (word: string): number => {
    if (!word || word.length < 3) return 0;

    const currentNode = state.wordChain.find(node => node.isActive);
    if (!currentNode) return 0;

    const association = getAssociationDetails(currentNode.word, word, wordAssociations);
    return calculateAssociationScore(association, word.length, state.wordChain.length);
  };

  const getAssociationDetails = (word1: string, word2: string): WordAssociation | null => {
    if (!word1 || !word2) return null;
    return getAssociationDetails(word1, word2, wordAssociations);
  };

  // NEW FUNCTION: Get all possible associations for a word
  // Useful for debugging and potentially for hints
  const getPossibleAssociations = (word: string): string[] => {
    if (!word) return [];

    const wordLower = word.toLowerCase();
    const directAssociations = wordAssociations[wordLower]?.map(a => a.word) || [];

    // Also find reverse associations (words that have this as an association)
    const reverseAssociations: string[] = [];
    Object.entries(wordAssociations).forEach(([otherWord, associations]) => {
      if (otherWord !== wordLower &&
          associations.some(a => a.word.toLowerCase() === wordLower)) {
        reverseAssociations.push(otherWord);
      }
    });

    return [...new Set([...directAssociations, ...reverseAssociations])];
  };

  return (
      <GameContext.Provider
          value={{
            state,
            dispatch,
            isValidWord,
            isAssociatedWithCurrentWord,
            getWordScore,
            getAssociationDetails,
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