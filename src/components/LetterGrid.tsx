import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

interface Cell {
  letter: string;
  row: number;
  col: number;
  selected: boolean;
  used: boolean;
}

const LetterGrid: React.FC = () => {
  const { state, dispatch } = useGame();
  const { letterGrid, selectedLetters } = state;

  // Convert flat array to 2D grid
  const [grid, setGrid] = useState<Cell[][]>([]);
  
  // Determine grid size based on letter count
  const gridSize = letterGrid?.length === 36 ? 6 : 5;
  const expectedLetters = gridSize * gridSize;

  // Fill grid when letterGrid changes
  useEffect(() => {
    if (!letterGrid || letterGrid.length < expectedLetters) {
      console.log('Letter grid mismatch:', letterGrid?.length, 'expected:', expectedLetters);
      return;
    }

    const newGrid: Cell[][] = [];
    for (let i = 0; i < gridSize; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        row.push({
          letter: letterGrid[index],
          row: i,
          col: j,
          selected: selectedLetters.includes(index),
          used: false, // Will be updated based on game state
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [letterGrid, selectedLetters, expectedLetters, gridSize]);

  // Handle cell click/touch with no restrictions
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const index = rowIndex * gridSize + colIndex;

    // If already selected, allow deselecting the last letter
    if (selectedLetters.includes(index)) {
      if (selectedLetters[selectedLetters.length - 1] === index) {
        dispatch({ type: 'DESELECT_LETTER', index });
      }
      return;
    }

    // Allow selection of any letter, regardless of position
    dispatch({ type: 'SELECT_LETTER', index });
  };

  // Get selection order for display
  const getSelectionOrder = (rowIndex: number, colIndex: number) => {
    const index = rowIndex * gridSize + colIndex;
    const position = selectedLetters.indexOf(index);
    return position !== -1 ? position + 1 : null;
  };

  return (
      <div className="mx-auto max-w-lg p-2 sm:p-4">
        {/* Expanded 6x6 grid with optimal sizing */}
        <div className={`grid ${gridSize === 6 ? 'grid-cols-6' : 'grid-cols-5'} gap-1 justify-center`}>
          {grid.flat().map((cell, index) => {
            const rowIndex = Math.floor(index / gridSize);
            const colIndex = index % gridSize;

            return (
                <motion.div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`
                letter-tile w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center 
                rounded-lg text-lg sm:text-2xl font-bold shadow-md
                ${cell.selected
                        ? 'bg-primary-500 dark:bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'}
                ${cell.used ? 'opacity-50' : 'opacity-100'}
                transition-all duration-200 ease-in-out
              `}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: cell.selected ? 1.1 : 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                      delay: index * 0.02
                    }}
                    whileHover={{ scale: cell.selected ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <span className="uppercase">{cell.letter}</span>
                  {cell.selected && (
                      <span className="absolute bottom-0 right-0 text-xs sm:text-xs font-bold bg-white text-primary-600 rounded-full w-4 h-4 flex items-center justify-center">
                  {getSelectionOrder(rowIndex, colIndex)}
                </span>
                  )}
                </motion.div>
            );
          })}
        </div>

        {/* Button to submit word */}
        {selectedLetters.length >= 3 && (
            <div className="flex justify-center mt-2 sm:mt-6 gap-2">
              <motion.button
                  className="px-3 py-1 sm:px-6 sm:py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md shadow-md font-medium text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch({ type: 'SUBMIT_WORD' })}
              >
                Submit Word
              </motion.button>
              <motion.button
                  className="px-3 py-1 sm:px-6 sm:py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md shadow-md font-medium text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}
              >
                Clear
              </motion.button>
            </div>
        )}
      </div>
  );
};

export default LetterGrid;