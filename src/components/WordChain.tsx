import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

const WordChain: React.FC = () => {
  const { state } = useGame();
  const { wordChain } = state;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the latest word when the chain updates
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [wordChain]);

  if (wordChain.length <= 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div 
        ref={containerRef}
        className="flex space-x-2 overflow-x-auto pb-2 snap-x"
      >
        {wordChain.map((node, index) => (
          <React.Fragment key={node.id}>
            {index > 0 && (
              <div className="flex items-center text-gray-400 dark:text-gray-500">→</div>
            )}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`
                flex-shrink-0 snap-start px-3 py-2 rounded-md font-medium
                ${node.isActive 
                  ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span>{node.word}</span>
                {node.score > 0 && (
                  <span className="text-xs bg-white bg-opacity-20 rounded-full px-2 py-0.5">
                    +{node.score}
                  </span>
                )}
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WordChain;