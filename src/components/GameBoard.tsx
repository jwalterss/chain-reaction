import React from 'react';
import { useGame } from '../context/GameContext';
import LetterGrid from './LetterGrid';
import WordChain from './WordChain';
import SelectedWord from './SelectedWord';
import SubmitButton from './SubmitButton';

const GameBoard: React.FC = () => {
  const { state } = useGame();
  const { currentWord } = state;

  return (
    <div className="flex flex-col items-center space-y-2 sm:space-y-6 animate-fade-in px-2 sm:px-4">
      {/* Word chain visualization */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 sm:p-4 mb-2 sm:mb-4">
        <WordChain />
      </div>
      
      {/* Current active word */}
      <div className="text-center">
        <h2 className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-1">Current Word</h2>
        <div className="text-xl sm:text-3xl font-bold font-serif text-primary-600 dark:text-primary-400 mb-2 sm:mb-4">
          {currentWord}
        </div>
      </div>
      
      {/* Selected word display */}
      <SelectedWord />
      
      {/* Letter grid for selection */}
      <div className="w-full max-w-xs sm:max-w-lg mx-auto px-2">
        <LetterGrid />
      </div>
    </div>
  );
};

export default GameBoard;