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
      <div className="w-full p-1 sm:p-2">
        {/* Responsive grid that fills container */}
        <div className={`
          grid gap-1 sm:gap-2 w-full max-w-full
          ${gridSize === 6 ? 'grid-cols-6' : 'grid-cols-5'}
        `}>
          {grid.flat().map((cell, index) => {
            const rowIndex = Math.floor(index / gridSize);
            const colIndex = index % gridSize;

            return (
                <motion.div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`
                letter-tile aspect-square flex items-center justify-center 
                rounded-lg text-lg sm:text-2xl lg:text-3xl font-bold
                min-h-[3rem] sm:min-h-[4rem] lg:min-h-[5rem]
                ${cell.selected
                        ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-lg ring-2 ring-primary-300 dark:ring-primary-400'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg'}
                ${cell.used ? 'opacity-50' : 'opacity-100'}
                transition-all duration-200 ease-in-out
                cursor-pointer touch-manipulation
              `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <span className="uppercase select-none">{cell.letter}</span>
                  {cell.selected && (
                      <span className="absolute bottom-0 right-0 text-xs font-bold bg-white text-primary-600 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {getSelectionOrder(rowIndex, colIndex)}
                </span>
                  )}
                </motion.div>
            );
          })}
        </div>

      </div>
  );
};

export default LetterGrid;