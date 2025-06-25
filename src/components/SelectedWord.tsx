import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const SelectedWord: React.FC = () => {
  const { state, isAssociatedWithCurrentWord } = useGame();
  const { selectedWord, currentWord, wordChain } = state;

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
        <AnimatePresence mode="wait">
          <motion.div
              key={selectedWord}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="selected-word h-12 flex flex-col items-center justify-center"
          >
            {selectedWord ? (
                <>
                  <motion.span
                      animate={{
                        color: getTextColor()
                      }}
                      className="text-xl md:text-2xl font-serif"
                  >
                    {selectedWord}
                  </motion.span>

                </>
            ) : (
                <span className="text-gray-400 dark:text-gray-500 text-sm">
              Select letters to form a word
            </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Feedback messages */}
        <AnimatePresence>
          {selectedWord && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm mt-1"
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
  );
};

export default SelectedWord;