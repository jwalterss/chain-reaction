import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useGame } from '../context/GameContext';
import { Menu, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { state } = useGame();
  const { streakCount } = state;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <h1 className="text-xl md:text-2xl font-bold font-serif text-primary-600 dark:text-primary-400">
            Chain Reaction
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {streakCount > 0 && (
            <div className="hidden md:flex items-center px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-full text-sm">
              <span className="mr-1">🔥</span> {streakCount} day streak
            </div>
          )}
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowRules(true)}
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button 
                className="flex items-center w-full py-2 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => {
                  setShowRules(true);
                  setIsMenuOpen(false);
                }}
              >
                <HelpCircle size={20} className="mr-2" />
                How to Play
              </button>
              
              {streakCount > 0 && (
                <div className="flex items-center py-2">
                  <span className="mr-2">🔥</span> {streakCount} day streak
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Rules modal - render in portal */}
      {showRules && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-start sm:items-center justify-center p-4 pt-8 sm:pt-4 overflow-y-auto"
            style={{ zIndex: 99999 }}
            onClick={() => setShowRules(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full max-h-[calc(100vh-4rem)] overflow-y-auto my-auto relative"
              style={{ zIndex: 100000 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">How to Play</h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowRules(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs sm:text-sm">Build chains of words related to today's theme!</p>
                
                <div>
                  <h3 className="font-bold mb-1 text-xs sm:text-sm">Rules:</h3>
                  <ul className="list-disc pl-3 sm:pl-4 space-y-0.5 text-xs sm:text-sm">
                    <li>Start with today's thematic word</li>
                    <li>Tap letters in any order to form words</li>
                    <li>All words must relate to the theme</li>
                    <li>Minimum 3 letters, no reusing words</li>
                    <li>2 minutes to build the longest chain</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-1 text-xs sm:text-sm">Scoring:</h3>
                  <ul className="list-disc pl-3 sm:pl-4 space-y-0.5 text-xs sm:text-sm">
                    <li>Longer words = more points</li>
                    <li>Chain length bonus</li>
                    <li>Thematic relevance required</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-1 text-xs sm:text-sm">Controls:</h3>
                  <ul className="list-disc pl-3 sm:pl-4 space-y-0.5 text-xs sm:text-sm">
                    <li>Tap any letters to select them</li>
                    <li>Tap last letter to deselect</li>
                    <li>Use Submit/Clear buttons</li>
                  </ul>
                </div>
                
                <button
                  className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium mt-4 text-sm sm:text-base"
                  onClick={() => setShowRules(false)}
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};

export default Header;