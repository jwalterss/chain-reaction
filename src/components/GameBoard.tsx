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
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      {/* Word chain visualization */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-4">
        <WordChain />
      </div>
      
      {/* Current active word */}
      <div className="text-center">
        <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-1">Current Word</h2>
        <div className="text-3xl font-bold font-serif text-primary-600 dark:text-primary-400 mb-4">
          {currentWord}
        </div>
      </div>
      
      {/* Selected word display */}
      <SelectedWord />
      
      {/* Submit button */}
      <SubmitButton />
      
      {/* Letter grid for selection */}
      <div className="w-full max-w-md mx-auto">
        <LetterGrid />
      </div>
    </div>
  );
};

export default GameBoard;