# Chain Reaction - Word Association Game

Chain Reaction is an engaging word association game where players build chains of related words by selecting letters from a dynamic grid. Starting with a daily word, players have 2 minutes to create the longest possible chain of associated words.

## Features

- Daily word challenges
- 2-minute gameplay sessions
- Dynamic 5x5 letter grid
- Word association validation
- Score tracking and streaks
- Shareable results
- Dark mode support
- Local progress saving

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd chain-reaction-game
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit the local server URL shown in the terminal

## How to Play

1. Start with the daily word
2. Select letters from the grid to form words associated with the current active word
3. Submit valid words to add them to your chain
4. Each valid word becomes the new active word
5. Build the longest possible chain within the 2-minute time limit

## Scoring

- Base points for each valid word
- Bonus points for longer words
- Extra points for rare word associations
- Streak bonuses for consecutive days played

## Development

- Built with React and TypeScript
- Styled using Tailwind CSS
- Animations with Framer Motion
- Local storage for progress saving

## License

MIT