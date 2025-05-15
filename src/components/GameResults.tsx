import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, Trophy, ChevronRight } from 'lucide-react';

const GameResults: React.FC = () => {
  const { state, dispatch } = useGame();
  const { score, wordChain, dailyWord } = state;
  
  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  const handleShare = () => {
    // Create a shareable text with emojis and score
    const date = new Date().toLocaleDateString();
    const chainLength = wordChain.length;
    
    let shareText = `🔄 Chain Reaction ${date}\n`;
    shareText += `🔤 Started with: ${dailyWord}\n`;
    shareText += `⛓️ Chain length: ${chainLength}\n`;
    shareText += `🏆 Score: ${score}\n`;
    shareText += `🎮 Play at: chainreaction.game`;
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert('Results copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy results to clipboard');
      });
  };
  
  return (
    <div className="results-container bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in">
      <motion.h2 
        className="text-2xl md:text-3xl font-bold font-serif mb-4 text-gray-800 dark:text-gray-100"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Game Over!
      </motion.h2>
      
      <motion.div 
        className="flex items-center justify-center gap-2 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Trophy className="text-accent-500" size={24} />
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {score} points
        </span>
      </motion.div>
      
      <motion.div
        className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Your Word Chain</h3>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {wordChain.map((node, index) => (
            <div key={node.id} className="flex items-center">
              <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                {node.word}
              </span>
              {index < wordChain.length - 1 && (
                <ChevronRight size={16} className="text-gray-400 mx-1" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Chain Length</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{wordChain.length}</div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Daily Word</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{dailyWord}</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-col md:flex-row gap-4 justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium shadow-md flex items-center justify-center"
          onClick={handlePlayAgain}
        >
          <RefreshCw size={20} className="mr-2" />
          Play Again
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-md font-medium shadow-md flex items-center justify-center"
          onClick={handleShare}
        >
          <Share2 size={20} className="mr-2" />
          Share Results
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameResults;