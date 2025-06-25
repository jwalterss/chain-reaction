import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const SelectedWord: React.FC = () => {
  const { state, dispatch, isAssociatedWithCurrentWord } = useGame();
  const { selectedWord, currentWord, wordChain, selectedLetters } = state;

  // Check if word meets minimum length
  const isValidLength = selectedWord.length >= 3;

  // Check if associated with current word
  const isAssociated = isAssociatedWithCurrentWord(selectedWord);

  // Check if already used in this game
  const isAlreadyUsed = wordChain.some(
      node => node.word.toLowerCase() === selectedWord.toLowerCase()
  );

  // Overall validity check
  const isValid = isValidLength && isAssociated && !isAlreadyUsed;

  // Get color based on validity status (using actual color codes instead of CSS variables)
  const getTextColor = () => {
    if (!isValidLength) return "#4B5563"; // gray-600 equivalent
    if (isValid) return "#16A34A"; // success-600 equivalent
    return "#DC2626"; // error-600 equivalent
  };

  // Calculate strength from the game context, not directly from wordAssociations
  const getAssociationStrength = () => {
    if (!isValidLength || !isAssociated || isAlreadyUsed) return '';

    // Use score as a proxy for association strength
    const score = state.getWordScore ? state.getWordScore(selectedWord) : 0;

    if (score > 10) return 'Strong';
    if (score > 5) return 'Medium';
    return 'Weak';
  };

  const associationStrength = getAssociationStrength();

  return (
      <div className="text-center my-4">
        {/* Fixed height area for word display and buttons */}
        <div className="selected-word h-12 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedWord ? (
                <motion.span
                    key={selectedWord}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      color: getTextColor()
                    }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl md:text-2xl font-serif"
                >
                  {selectedWord}
                </motion.span>
            ) : (
                <motion.span
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-400 dark:text-gray-500 text-sm"
                >
                  Select letters to form a word
                </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed height area for buttons - replaces the word display area when buttons should show */}
        <div className="h-12 flex items-center justify-center gap-2 mt-2">
          <AnimatePresence mode="wait">
            {selectedLetters.length >= 3 ? (
                <motion.div
                    key="buttons"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2"
                >
                  <motion.button
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md shadow-md font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => dispatch({ type: 'SUBMIT_WORD' })}
                  >
                    Submit
                  </motion.button>
                  <motion.button
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md shadow-md font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}
                  >
                    Clear
                  </motion.button>
                </motion.div>
            ) : selectedWord && (
                <motion.div
                    key="feedback"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm"
                >
                  {isValidLength && isAlreadyUsed && (
                      <p className="text-warning-600 dark:text-warning-400">
                        Word already used
                      </p>
                  )}

                  {isValid && (
                      <p className="text-success-600 dark:text-success-400">
                        Valid word! Submit to continue.
                      </p>
                  )}
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
};

export default SelectedWord;