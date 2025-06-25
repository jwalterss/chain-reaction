import React from 'react';
import { useGame } from '../context/GameContext';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameResults from './GameResults';
import Timer from './Timer';

const GameContainer: React.FC = () => {
  const { state } = useGame();
  const { isPlaying, isGameOver, score } = state;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto min-h-screen py-2 sm:py-4">
      {/* Game header with score */}
      <div className="w-full flex justify-between items-center mb-2 sm:mb-4 px-2 sm:px-4">
        <div className="text-lg sm:text-2xl font-bold">
          <span className="text-gray-600 dark:text-gray-300">Score: </span>
          <span className="text-primary-600 dark:text-primary-400">{score}</span>
        </div>
        {isPlaying && <Timer />}
      </div>

      {/* Main game area */}
      <div className="w-full flex-1">
        {!isPlaying && !isGameOver ? (
          <GameControls />
        ) : isGameOver ? (
          <GameResults />
        ) : (
          <GameBoard />
        )}
      </div>
    </div>
  );
};

export default GameContainer;