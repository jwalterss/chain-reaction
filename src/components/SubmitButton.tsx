import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

const SubmitButton: React.FC = () => {
  const { state, dispatch, isAssociatedWithCurrentWord } = useGame();
  const { selectedWord, wordChain } = state;
  
  const isValidWord = selectedWord.length >= 3;
  const isAssociated = isAssociatedWithCurrentWord(selectedWord);
  const isAlreadyUsed = wordChain.some(node => node.word === selectedWord);
  
  const canSubmit = isValidWord && isAssociated && !isAlreadyUsed;
  
  const handleSubmit = () => {
    if (canSubmit) {
      dispatch({ type: 'SUBMIT_WORD' });
    } else {
      // Clear the selection if not valid
      dispatch({ type: 'CLEAR_SELECTION' });
    }
  };
  
  const handleClear = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };
  
  if (!selectedWord) {
    return null;
  }
  
  return (
    <div className="flex space-x-3 my-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-4 py-2 rounded-md font-medium transition-all
          ${canSubmit
            ? 'bg-success-500 hover:bg-success-600 text-white shadow-md'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
          }
        `}
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        Submit
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-md font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
        onClick={handleClear}
      >
        Clear
      </motion.button>
    </div>
  );
};

export default SubmitButton;