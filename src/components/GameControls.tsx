import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Trophy, Clock, RefreshCw, Play } from 'lucide-react';

const GameControls: React.FC = () => {
  const { state, dispatch } = useGame();
  const { dailyWord, isGameOver } = state;
  
  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
  };
  
  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mx-auto max-w-2xl text-center animate-fade-in">
      <motion.div 
        className="mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Chain Reaction
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Build a chain of related words
        </p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6 w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center text-primary-500 dark:text-primary-400 mb-2">
          <Trophy size={20} className="mr-2" />
          <span className="font-medium">Today's Starting Word</span>
        </div>
        <div className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200">
          {dailyWord}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
            <Clock size={20} className="mr-2" />
            <span className="font-medium">Game Time</span>
          </div>
          <div className="text-xl font-bold">2:00 minutes</div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
            <Trophy size={20} className="mr-2" />
            <span className="font-medium">Goal</span>
          </div>
          <div className="text-xl font-bold">Build the longest chain</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 flex flex-col md:flex-row gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium shadow-md flex items-center justify-center"
          onClick={handleStartGame}
        >
          <Play size={20} className="mr-2" />
          Start Game
        </motion.button>
        
        {isGameOver && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md font-medium flex items-center justify-center"
            onClick={handleResetGame}
          >
            <RefreshCw size={20} className="mr-2" />
            Play Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default GameControls;