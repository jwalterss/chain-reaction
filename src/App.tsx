import React, { useEffect } from 'react';
import { GameProvider } from './context/GameContext';
import GameContainer from './components/GameContainer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Default to dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <GameProvider>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <GameContainer />
        </main>
        <Footer />
      </GameProvider>
    </div>
  );
}

export default App;