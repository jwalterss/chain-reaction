import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';

const Timer: React.FC = () => {
  const { state } = useGame();
  const { timer } = state;
  
  const [width, setWidth] = useState(100);
  
  // Convert timer to percentage for the progress bar
  useEffect(() => {
    const maxTime = 120; // 2 minutes in seconds
    const percentage = (timer / maxTime) * 100;
    setWidth(percentage);
  }, [timer]);
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const isLowTime = timer <= 10;
  
  return (
    <div className="flex flex-col items-center w-32">
      <div className="text-lg font-mono font-bold mb-1">
        {formatTime(timer)}
      </div>
      <div className="game-timer">
        <div 
          className={`timer-progress ${isLowTime ? 'timer-low' : ''}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;