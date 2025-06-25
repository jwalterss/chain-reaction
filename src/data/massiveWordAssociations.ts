// Massive word associations database
// Contains thousands of words with comprehensive associations

export type WordAssociation = {
  word: string;
  rarity: number; // 0-1, higher means rarer
  strength: number; // 0-1, higher means stronger association
};

export type WordAssociationsMap = {
  [key: string]: WordAssociation[];
};

// Comprehensive word associations with massive vocabulary
export const baseWordAssociations: WordAssociationsMap = {
  // Common everyday words
  time: [
    { word: 'clock', rarity: 0.1, strength: 0.9 },
    { word: 'watch', rarity: 0.2, strength: 0.8 },
    { word: 'hour', rarity: 0.2, strength: 0.8 },
    { word: 'minute', rarity: 0.3, strength: 0.7 },
    { word: 'second', rarity: 0.3, strength: 0.7 },
    { word: 'day', rarity: 0.2, strength: 0.8 },
    { word: 'night', rarity: 0.3, strength: 0.7 },
    { word: 'week', rarity: 0.3, strength: 0.7 },
    { word: 'month', rarity: 0.3, strength: 0.7 },
    { word: 'year', rarity: 0.3, strength: 0.7 },
    { word: 'schedule', rarity: 0.4, strength: 0.6 },
    { word: 'deadline', rarity: 0.5, strength: 0.5 },
    { word: 'duration', rarity: 0.5, strength: 0.5 },
    { word: 'period', rarity: 0.4, strength: 0.6 },
    { word: 'moment', rarity: 0.4, strength: 0.6 },
    { word: 'instant', rarity: 0.5, strength: 0.5 },
    { word: 'future', rarity: 0.4, strength: 0.6 },
    { word: 'past', rarity: 0.4, strength: 0.6 },
    { word: 'present', rarity: 0.4, strength: 0.6 },
    { word: 'late', rarity: 0.3, strength: 0.7 },
    { word: 'early', rarity: 0.3, strength: 0.7 },
    { word: 'speed', rarity: 0.4, strength: 0.6 },
    { word: 'slow', rarity: 0.4, strength: 0.6 },
    { word: 'fast', rarity: 0.4, strength: 0.6 },
    { word: 'quick', rarity: 0.4, strength: 0.6 },
    { word: 'age', rarity: 0.4, strength: 0.6 },
    { word: 'era', rarity: 0.5, strength: 0.5 },
    { word: 'century', rarity: 0.5, strength: 0.5 },
    { word: 'decade', rarity: 0.5, strength: 0.5 },
    { word: 'eternal', rarity: 0.6, strength: 0.4 }
  ],

  life: [
    { word: 'living', rarity: 0.1, strength: 0.9 },
    { word: 'alive', rarity: 0.2, strength: 0.8 },
    { word: 'birth', rarity: 0.3, strength: 0.7 },
    { word: 'death', rarity: 0.3, strength: 0.7 },
    { word: 'existence', rarity: 0.4, strength: 0.6 },
    { word: 'experience', rarity: 0.3, strength: 0.7 },
    { word: 'journey', rarity: 0.4, strength: 0.6 },
    { word: 'adventure', rarity: 0.4, strength: 0.6 },
    { word: 'story', rarity: 0.3, strength: 0.7 },
    { word: 'memory', rarity: 0.4, strength: 0.6 },
    { word: 'dream', rarity: 0.3, strength: 0.7 },
    { word: 'hope', rarity: 0.3, strength: 0.7 },
    { word: 'love', rarity: 0.2, strength: 0.8 },
    { word: 'happiness', rarity: 0.3, strength: 0.7 },
    { word: 'joy', rarity: 0.3, strength: 0.7 },
    { word: 'sadness', rarity: 0.4, strength: 0.6 },
    { word: 'pain', rarity: 0.4, strength: 0.6 },
    { word: 'pleasure', rarity: 0.4, strength: 0.6 },
    { word: 'growth', rarity: 0.4, strength: 0.6 },
    { word: 'change', rarity: 0.3, strength: 0.7 },
    { word: 'evolution', rarity: 0.5, strength: 0.5 },
    { word: 'purpose', rarity: 0.4, strength: 0.6 },
    { word: 'meaning', rarity: 0.4, strength: 0.6 },
    { word: 'destiny', rarity: 0.5, strength: 0.5 },
    { word: 'fate', rarity: 0.5, strength: 0.5 },
    { word: 'choice', rarity: 0.4, strength: 0.6 },
    { word: 'decision', rarity: 0.4, strength: 0.6 },
    { word: 'opportunity', rarity: 0.4, strength: 0.6 },
    { word: 'challenge', rarity: 0.4, strength: 0.6 },
    { word: 'struggle', rarity: 0.4, strength: 0.6 }
  ],

  nature: [
    { word: 'tree', rarity: 0.1, strength: 0.9 },
    { word: 'forest', rarity: 0.2, strength: 0.8 },
    { word: 'flower', rarity: 0.2, strength: 0.8 },
    { word: 'grass', rarity: 0.2, strength: 0.8 },
    { word: 'mountain', rarity: 0.3, strength: 0.7 },
    { word: 'ocean', rarity: 0.3, strength: 0.7 },
    { word: 'river', rarity: 0.3, strength: 0.7 },
    { word: 'sky', rarity: 0.2, strength: 0.8 },
    { word: 'cloud', rarity: 0.3, strength: 0.7 },
    { word: 'sun', rarity: 0.2, strength: 0.8 },
    { word: 'moon', rarity: 0.3, strength: 0.7 },
    { word: 'star', rarity: 0.3, strength: 0.7 },
    { word: 'earth', rarity: 0.3, strength: 0.7 },
    { word: 'soil', rarity: 0.4, strength: 0.6 },
    { word: 'rock', rarity: 0.3, strength: 0.7 },
    { word: 'stone', rarity: 0.3, strength: 0.7 },
    { word: 'sand', rarity: 0.3, strength: 0.7 },
    { word: 'wind', rarity: 0.3, strength: 0.7 },
    { word: 'rain', rarity: 0.3, strength: 0.7 },
    { word: 'snow', rarity: 0.3, strength: 0.7 },
    { word: 'ice', rarity: 0.3, strength: 0.7 },
    { word: 'fire', rarity: 0.3, strength: 0.7 },
    { word: 'water', rarity: 0.2, strength: 0.8 },
    { word: 'air', rarity: 0.3, strength: 0.7 },
    { word: 'animal', rarity: 0.2, strength: 0.8 },
    { word: 'bird', rarity: 0.2, strength: 0.8 },
    { word: 'fish', rarity: 0.3, strength: 0.7 },
    { word: 'insect', rarity: 0.4, strength: 0.6 },
    { word: 'wildlife', rarity: 0.4, strength: 0.6 },
    { word: 'wilderness', rarity: 0.5, strength: 0.5 }
  ],

  // Technology and modern life
  computer: [
    { word: 'screen', rarity: 0.1, strength: 0.9 },
    { word: 'keyboard', rarity: 0.2, strength: 0.8 },
    { word: 'mouse', rarity: 0.2, strength: 0.8 },
    { word: 'software', rarity: 0.3, strength: 0.7 },
    { word: 'hardware', rarity: 0.3, strength: 0.7 },
    { word: 'internet', rarity: 0.2, strength: 0.8 },
    { word: 'website', rarity: 0.3, strength: 0.7 },
    { word: 'email', rarity: 0.3, strength: 0.7 },
    { word: 'data', rarity: 0.3, strength: 0.7 },
    { word: 'file', rarity: 0.3, strength: 0.7 },
    { word: 'program', rarity: 0.3, strength: 0.7 },
    { word: 'app', rarity: 0.3, strength: 0.7 },
    { word: 'code', rarity: 0.4, strength: 0.6 },
    { word: 'programming', rarity: 0.4, strength: 0.6 },
    { word: 'developer', rarity: 0.5, strength: 0.5 },
    { word: 'technology', rarity: 0.3, strength: 0.7 },
    { word: 'digital', rarity: 0.4, strength: 0.6 },
    { word: 'electronic', rarity: 0.4, strength: 0.6 },
    { word: 'processor', rarity: 0.4, strength: 0.6 },
    { word: 'memory', rarity: 0.4, strength: 0.6 },
    { word: 'storage', rarity: 0.4, strength: 0.6 },
    { word: 'network', rarity: 0.4, strength: 0.6 },
    { word: 'server', rarity: 0.5, strength: 0.5 },
    { word: 'database', rarity: 0.5, strength: 0.5 },
    { word: 'system', rarity: 0.3, strength: 0.7 },
    { word: 'laptop', rarity: 0.3, strength: 0.7 },
    { word: 'desktop', rarity: 0.4, strength: 0.6 },
    { word: 'tablet', rarity: 0.4, strength: 0.6 },
    { word: 'smartphone', rarity: 0.4, strength: 0.6 },
    { word: 'device', rarity: 0.3, strength: 0.7 }
  ],

  // Food and cooking
  food: [
    { word: 'eat', rarity: 0.1, strength: 0.9 },
    { word: 'taste', rarity: 0.2, strength: 0.8 },
    { word: 'cook', rarity: 0.2, strength: 0.8 },
    { word: 'meal', rarity: 0.2, strength: 0.8 },
    { word: 'restaurant', rarity: 0.3, strength: 0.7 },
    { word: 'kitchen', rarity: 0.3, strength: 0.7 },
    { word: 'recipe', rarity: 0.3, strength: 0.7 },
    { word: 'ingredient', rarity: 0.4, strength: 0.6 },
    { word: 'flavor', rarity: 0.3, strength: 0.7 },
    { word: 'spice', rarity: 0.4, strength: 0.6 },
    { word: 'sweet', rarity: 0.3, strength: 0.7 },
    { word: 'sour', rarity: 0.4, strength: 0.6 },
    { word: 'bitter', rarity: 0.4, strength: 0.6 },
    { word: 'salty', rarity: 0.4, strength: 0.6 },
    { word: 'delicious', rarity: 0.3, strength: 0.7 },
    { word: 'hungry', rarity: 0.3, strength: 0.7 },
    { word: 'full', rarity: 0.3, strength: 0.7 },
    { word: 'bread', rarity: 0.2, strength: 0.8 },
    { word: 'meat', rarity: 0.3, strength: 0.7 },
    { word: 'vegetable', rarity: 0.3, strength: 0.7 },
    { word: 'fruit', rarity: 0.3, strength: 0.7 },
    { word: 'cheese', rarity: 0.3, strength: 0.7 },
    { word: 'milk', rarity: 0.3, strength: 0.7 },
    { word: 'water', rarity: 0.2, strength: 0.8 },
    { word: 'juice', rarity: 0.3, strength: 0.7 },
    { word: 'coffee', rarity: 0.3, strength: 0.7 },
    { word: 'tea', rarity: 0.3, strength: 0.7 },
    { word: 'wine', rarity: 0.4, strength: 0.6 },
    { word: 'beer', rarity: 0.4, strength: 0.6 },
    { word: 'dessert', rarity: 0.4, strength: 0.6 }
  ],

  // Colors and visual
  color: [
    { word: 'red', rarity: 0.1, strength: 0.9 },
    { word: 'blue', rarity: 0.1, strength: 0.9 },
    { word: 'green', rarity: 0.1, strength: 0.9 },
    { word: 'yellow', rarity: 0.2, strength: 0.8 },
    { word: 'purple', rarity: 0.2, strength: 0.8 },
    { word: 'orange', rarity: 0.2, strength: 0.8 },
    { word: 'pink', rarity: 0.2, strength: 0.8 },
    { word: 'black', rarity: 0.1, strength: 0.9 },
    { word: 'white', rarity: 0.1, strength: 0.9 },
    { word: 'gray', rarity: 0.2, strength: 0.8 },
    { word: 'brown', rarity: 0.2, strength: 0.8 },
    { word: 'paint', rarity: 0.3, strength: 0.7 },
    { word: 'bright', rarity: 0.3, strength: 0.7 },
    { word: 'dark', rarity: 0.3, strength: 0.7 },
    { word: 'light', rarity: 0.3, strength: 0.7 },
    { word: 'shade', rarity: 0.4, strength: 0.6 },
    { word: 'hue', rarity: 0.5, strength: 0.5 },
    { word: 'tone', rarity: 0.4, strength: 0.6 },
    { word: 'spectrum', rarity: 0.5, strength: 0.5 },
    { word: 'rainbow', rarity: 0.4, strength: 0.6 },
    { word: 'vibrant', rarity: 0.4, strength: 0.6 },
    { word: 'dull', rarity: 0.4, strength: 0.6 },
    { word: 'vivid', rarity: 0.4, strength: 0.6 },
    { word: 'pale', rarity: 0.4, strength: 0.6 },
    { word: 'deep', rarity: 0.4, strength: 0.6 },
    { word: 'rich', rarity: 0.4, strength: 0.6 },
    { word: 'warm', rarity: 0.3, strength: 0.7 },
    { word: 'cool', rarity: 0.3, strength: 0.7 },
    { word: 'neutral', rarity: 0.5, strength: 0.5 },
    { word: 'pastel', rarity: 0.5, strength: 0.5 }
  ],

  // Music and sound
  music: [
    { word: 'song', rarity: 0.1, strength: 0.9 },
    { word: 'sound', rarity: 0.2, strength: 0.8 },
    { word: 'beat', rarity: 0.2, strength: 0.8 },
    { word: 'rhythm', rarity: 0.3, strength: 0.7 },
    { word: 'melody', rarity: 0.3, strength: 0.7 },
    { word: 'harmony', rarity: 0.4, strength: 0.6 },
    { word: 'note', rarity: 0.3, strength: 0.7 },
    { word: 'chord', rarity: 0.4, strength: 0.6 },
    { word: 'instrument', rarity: 0.3, strength: 0.7 },
    { word: 'piano', rarity: 0.3, strength: 0.7 },
    { word: 'guitar', rarity: 0.3, strength: 0.7 },
    { word: 'violin', rarity: 0.4, strength: 0.6 },
    { word: 'drum', rarity: 0.3, strength: 0.7 },
    { word: 'saxophone', rarity: 0.5, strength: 0.5 },
    { word: 'trumpet', rarity: 0.5, strength: 0.5 },
    { word: 'flute', rarity: 0.5, strength: 0.5 },
    { word: 'singer', rarity: 0.3, strength: 0.7 },
    { word: 'band', rarity: 0.3, strength: 0.7 },
    { word: 'orchestra', rarity: 0.4, strength: 0.6 },
    { word: 'concert', rarity: 0.3, strength: 0.7 },
    { word: 'performance', rarity: 0.4, strength: 0.6 },
    { word: 'album', rarity: 0.3, strength: 0.7 },
    { word: 'artist', rarity: 0.3, strength: 0.7 },
    { word: 'composer', rarity: 0.4, strength: 0.6 },
    { word: 'musician', rarity: 0.3, strength: 0.7 },
    { word: 'dance', rarity: 0.3, strength: 0.7 },
    { word: 'jazz', rarity: 0.4, strength: 0.6 },
    { word: 'rock', rarity: 0.3, strength: 0.7 },
    { word: 'classical', rarity: 0.4, strength: 0.6 },
    { word: 'pop', rarity: 0.3, strength: 0.7 }
  ],

  // Transportation and travel
  travel: [
    { word: 'journey', rarity: 0.2, strength: 0.8 },
    { word: 'trip', rarity: 0.2, strength: 0.8 },
    { word: 'vacation', rarity: 0.2, strength: 0.8 },
    { word: 'destination', rarity: 0.3, strength: 0.7 },
    { word: 'adventure', rarity: 0.3, strength: 0.7 },
    { word: 'explore', rarity: 0.3, strength: 0.7 },
    { word: 'discover', rarity: 0.4, strength: 0.6 },
    { word: 'map', rarity: 0.3, strength: 0.7 },
    { word: 'guide', rarity: 0.4, strength: 0.6 },
    { word: 'tourist', rarity: 0.4, strength: 0.6 },
    { word: 'sightseeing', rarity: 0.4, strength: 0.6 },
    { word: 'hotel', rarity: 0.3, strength: 0.7 },
    { word: 'airplane', rarity: 0.3, strength: 0.7 },
    { word: 'train', rarity: 0.3, strength: 0.7 },
    { word: 'car', rarity: 0.2, strength: 0.8 },
    { word: 'bus', rarity: 0.3, strength: 0.7 },
    { word: 'ship', rarity: 0.4, strength: 0.6 },
    { word: 'boat', rarity: 0.4, strength: 0.6 },
    { word: 'bicycle', rarity: 0.4, strength: 0.6 },
    { word: 'walk', rarity: 0.3, strength: 0.7 },
    { word: 'passport', rarity: 0.4, strength: 0.6 },
    { word: 'luggage', rarity: 0.4, strength: 0.6 },
    { word: 'ticket', rarity: 0.3, strength: 0.7 },
    { word: 'airport', rarity: 0.3, strength: 0.7 },
    { word: 'station', rarity: 0.4, strength: 0.6 },
    { word: 'country', rarity: 0.3, strength: 0.7 },
    { word: 'city', rarity: 0.2, strength: 0.8 },
    { word: 'culture', rarity: 0.4, strength: 0.6 },
    { word: 'language', rarity: 0.4, strength: 0.6 },
    { word: 'experience', rarity: 0.3, strength: 0.7 }
  ],

  // Sports and fitness
  sport: [
    { word: 'game', rarity: 0.1, strength: 0.9 },
    { word: 'play', rarity: 0.2, strength: 0.8 },
    { word: 'team', rarity: 0.2, strength: 0.8 },
    { word: 'player', rarity: 0.2, strength: 0.8 },
    { word: 'athlete', rarity: 0.3, strength: 0.7 },
    { word: 'competition', rarity: 0.3, strength: 0.7 },
    { word: 'tournament', rarity: 0.4, strength: 0.6 },
    { word: 'championship', rarity: 0.4, strength: 0.6 },
    { word: 'victory', rarity: 0.4, strength: 0.6 },
    { word: 'defeat', rarity: 0.4, strength: 0.6 },
    { word: 'win', rarity: 0.3, strength: 0.7 },
    { word: 'lose', rarity: 0.3, strength: 0.7 },
    { word: 'score', rarity: 0.3, strength: 0.7 },
    { word: 'goal', rarity: 0.3, strength: 0.7 },
    { word: 'ball', rarity: 0.2, strength: 0.8 },
    { word: 'field', rarity: 0.3, strength: 0.7 },
    { word: 'court', rarity: 0.3, strength: 0.7 },
    { word: 'stadium', rarity: 0.4, strength: 0.6 },
    { word: 'gym', rarity: 0.3, strength: 0.7 },
    { word: 'exercise', rarity: 0.3, strength: 0.7 },
    { word: 'fitness', rarity: 0.3, strength: 0.7 },
    { word: 'training', rarity: 0.3, strength: 0.7 },
    { word: 'coach', rarity: 0.3, strength: 0.7 },
    { word: 'referee', rarity: 0.4, strength: 0.6 },
    { word: 'fan', rarity: 0.3, strength: 0.7 },
    { word: 'football', rarity: 0.3, strength: 0.7 },
    { word: 'basketball', rarity: 0.3, strength: 0.7 },
    { word: 'baseball', rarity: 0.4, strength: 0.6 },
    { word: 'tennis', rarity: 0.3, strength: 0.7 },
    { word: 'swimming', rarity: 0.4, strength: 0.6 }
  ],

  // Weather and climate
  weather: [
    { word: 'sun', rarity: 0.1, strength: 0.9 },
    { word: 'rain', rarity: 0.1, strength: 0.9 },
    { word: 'snow', rarity: 0.2, strength: 0.8 },
    { word: 'wind', rarity: 0.2, strength: 0.8 },
    { word: 'cloud', rarity: 0.2, strength: 0.8 },
    { word: 'storm', rarity: 0.3, strength: 0.7 },
    { word: 'thunder', rarity: 0.3, strength: 0.7 },
    { word: 'lightning', rarity: 0.3, strength: 0.7 },
    { word: 'hurricane', rarity: 0.4, strength: 0.6 },
    { word: 'tornado', rarity: 0.5, strength: 0.5 },
    { word: 'hot', rarity: 0.2, strength: 0.8 },
    { word: 'cold', rarity: 0.2, strength: 0.8 },
    { word: 'warm', rarity: 0.2, strength: 0.8 },
    { word: 'cool', rarity: 0.3, strength: 0.7 },
    { word: 'temperature', rarity: 0.3, strength: 0.7 },
    { word: 'humid', rarity: 0.4, strength: 0.6 },
    { word: 'dry', rarity: 0.3, strength: 0.7 },
    { word: 'wet', rarity: 0.3, strength: 0.7 },
    { word: 'forecast', rarity: 0.4, strength: 0.6 },
    { word: 'climate', rarity: 0.4, strength: 0.6 },
    { word: 'season', rarity: 0.3, strength: 0.7 },
    { word: 'spring', rarity: 0.3, strength: 0.7 },
    { word: 'summer', rarity: 0.3, strength: 0.7 },
    { word: 'autumn', rarity: 0.3, strength: 0.7 },
    { word: 'winter', rarity: 0.3, strength: 0.7 },
    { word: 'breeze', rarity: 0.4, strength: 0.6 },
    { word: 'gust', rarity: 0.5, strength: 0.5 },
    { word: 'drizzle', rarity: 0.5, strength: 0.5 },
    { word: 'downpour', rarity: 0.5, strength: 0.5 },
    { word: 'sunshine', rarity: 0.3, strength: 0.7 }
  ],

  // Science and knowledge
  science: [
    { word: 'research', rarity: 0.2, strength: 0.8 },
    { word: 'experiment', rarity: 0.3, strength: 0.7 },
    { word: 'discovery', rarity: 0.3, strength: 0.7 },
    { word: 'theory', rarity: 0.3, strength: 0.7 },
    { word: 'hypothesis', rarity: 0.4, strength: 0.6 },
    { word: 'data', rarity: 0.3, strength: 0.7 },
    { word: 'analysis', rarity: 0.4, strength: 0.6 },
    { word: 'result', rarity: 0.3, strength: 0.7 },
    { word: 'conclusion', rarity: 0.4, strength: 0.6 },
    { word: 'laboratory', rarity: 0.4, strength: 0.6 },
    { word: 'scientist', rarity: 0.3, strength: 0.7 },
    { word: 'professor', rarity: 0.4, strength: 0.6 },
    { word: 'student', rarity: 0.3, strength: 0.7 },
    { word: 'knowledge', rarity: 0.3, strength: 0.7 },
    { word: 'education', rarity: 0.3, strength: 0.7 },
    { word: 'learning', rarity: 0.3, strength: 0.7 },
    { word: 'study', rarity: 0.2, strength: 0.8 },
    { word: 'book', rarity: 0.2, strength: 0.8 },
    { word: 'paper', rarity: 0.3, strength: 0.7 },
    { word: 'journal', rarity: 0.4, strength: 0.6 },
    { word: 'publication', rarity: 0.4, strength: 0.6 },
    { word: 'biology', rarity: 0.4, strength: 0.6 },
    { word: 'chemistry', rarity: 0.4, strength: 0.6 },
    { word: 'physics', rarity: 0.4, strength: 0.6 },
    { word: 'mathematics', rarity: 0.4, strength: 0.6 },
    { word: 'psychology', rarity: 0.4, strength: 0.6 },
    { word: 'medicine', rarity: 0.4, strength: 0.6 },
    { word: 'technology', rarity: 0.3, strength: 0.7 },
    { word: 'innovation', rarity: 0.4, strength: 0.6 },
    { word: 'invention', rarity: 0.4, strength: 0.6 }
  ],

  // Art and creativity
  art: [
    { word: 'paint', rarity: 0.2, strength: 0.8 },
    { word: 'draw', rarity: 0.2, strength: 0.8 },
    { word: 'create', rarity: 0.2, strength: 0.8 },
    { word: 'canvas', rarity: 0.3, strength: 0.7 },
    { word: 'brush', rarity: 0.3, strength: 0.7 },
    { word: 'color', rarity: 0.2, strength: 0.8 },
    { word: 'sculpture', rarity: 0.4, strength: 0.6 },
    { word: 'museum', rarity: 0.3, strength: 0.7 },
    { word: 'gallery', rarity: 0.3, strength: 0.7 },
    { word: 'artist', rarity: 0.2, strength: 0.8 },
    { word: 'painting', rarity: 0.2, strength: 0.8 },
    { word: 'drawing', rarity: 0.3, strength: 0.7 },
    { word: 'sketch', rarity: 0.4, strength: 0.6 },
    { word: 'design', rarity: 0.3, strength: 0.7 },
    { word: 'pattern', rarity: 0.4, strength: 0.6 },
    { word: 'style', rarity: 0.3, strength: 0.7 },
    { word: 'technique', rarity: 0.4, strength: 0.6 },
    { word: 'medium', rarity: 0.4, strength: 0.6 },
    { word: 'creative', rarity: 0.3, strength: 0.7 },
    { word: 'imagination', rarity: 0.4, strength: 0.6 },
    { word: 'inspiration', rarity: 0.4, strength: 0.6 },
    { word: 'expression', rarity: 0.4, strength: 0.6 },
    { word: 'beauty', rarity: 0.3, strength: 0.7 },
    { word: 'aesthetic', rarity: 0.5, strength: 0.5 },
    { word: 'masterpiece', rarity: 0.4, strength: 0.6 },
    { word: 'portrait', rarity: 0.4, strength: 0.6 },
    { word: 'landscape', rarity: 0.4, strength: 0.6 },
    { word: 'abstract', rarity: 0.5, strength: 0.5 },
    { word: 'realistic', rarity: 0.4, strength: 0.6 },
    { word: 'modern', rarity: 0.3, strength: 0.7 }
  ],

  // Entertainment and media
  movie: [
    { word: 'film', rarity: 0.1, strength: 0.9 },
    { word: 'cinema', rarity: 0.3, strength: 0.7 },
    { word: 'theater', rarity: 0.3, strength: 0.7 },
    { word: 'screen', rarity: 0.3, strength: 0.7 },
    { word: 'director', rarity: 0.3, strength: 0.7 },
    { word: 'actor', rarity: 0.2, strength: 0.8 },
    { word: 'actress', rarity: 0.3, strength: 0.7 },
    { word: 'character', rarity: 0.3, strength: 0.7 },
    { word: 'plot', rarity: 0.4, strength: 0.6 },
    { word: 'story', rarity: 0.2, strength: 0.8 },
    { word: 'scene', rarity: 0.3, strength: 0.7 },
    { word: 'dialogue', rarity: 0.4, strength: 0.6 },
    { word: 'script', rarity: 0.4, strength: 0.6 },
    { word: 'camera', rarity: 0.3, strength: 0.7 },
    { word: 'action', rarity: 0.3, strength: 0.7 },
    { word: 'drama', rarity: 0.3, strength: 0.7 },
    { word: 'comedy', rarity: 0.3, strength: 0.7 },
    { word: 'horror', rarity: 0.4, strength: 0.6 },
    { word: 'romance', rarity: 0.4, strength: 0.6 },
    { word: 'thriller', rarity: 0.4, strength: 0.6 },
    { word: 'adventure', rarity: 0.4, strength: 0.6 },
    { word: 'fantasy', rarity: 0.4, strength: 0.6 },
    { word: 'sequel', rarity: 0.4, strength: 0.6 },
    { word: 'premiere', rarity: 0.5, strength: 0.5 },
    { word: 'review', rarity: 0.4, strength: 0.6 },
    { word: 'critic', rarity: 0.4, strength: 0.6 },
    { word: 'award', rarity: 0.4, strength: 0.6 },
    { word: 'oscar', rarity: 0.5, strength: 0.5 },
    { word: 'box', rarity: 0.4, strength: 0.6 },
    { word: 'entertainment', rarity: 0.3, strength: 0.7 }
  ],

  // Business and work
  work: [
    { word: 'job', rarity: 0.1, strength: 0.9 },
    { word: 'career', rarity: 0.2, strength: 0.8 },
    { word: 'office', rarity: 0.2, strength: 0.8 },
    { word: 'employee', rarity: 0.3, strength: 0.7 },
    { word: 'employer', rarity: 0.3, strength: 0.7 },
    { word: 'boss', rarity: 0.3, strength: 0.7 },
    { word: 'manager', rarity: 0.3, strength: 0.7 },
    { word: 'colleague', rarity: 0.4, strength: 0.6 },
    { word: 'team', rarity: 0.2, strength: 0.8 },
    { word: 'project', rarity: 0.3, strength: 0.7 },
    { word: 'task', rarity: 0.3, strength: 0.7 },
    { word: 'meeting', rarity: 0.3, strength: 0.7 },
    { word: 'deadline', rarity: 0.4, strength: 0.6 },
    { word: 'schedule', rarity: 0.3, strength: 0.7 },
    { word: 'salary', rarity: 0.3, strength: 0.7 },
    { word: 'wage', rarity: 0.4, strength: 0.6 },
    { word: 'income', rarity: 0.3, strength: 0.7 },
    { word: 'profit', rarity: 0.4, strength: 0.6 },
    { word: 'business', rarity: 0.2, strength: 0.8 },
    { word: 'company', rarity: 0.2, strength: 0.8 },
    { word: 'corporation', rarity: 0.4, strength: 0.6 },
    { word: 'industry', rarity: 0.3, strength: 0.7 },
    { word: 'market', rarity: 0.3, strength: 0.7 },
    { word: 'customer', rarity: 0.3, strength: 0.7 },
    { word: 'client', rarity: 0.3, strength: 0.7 },
    { word: 'service', rarity: 0.3, strength: 0.7 },
    { word: 'product', rarity: 0.3, strength: 0.7 },
    { word: 'quality', rarity: 0.3, strength: 0.7 },
    { word: 'efficiency', rarity: 0.4, strength: 0.6 },
    { word: 'productivity', rarity: 0.4, strength: 0.6 }
  ],

  // Emotions and feelings
  happy: [
    { word: 'joy', rarity: 0.2, strength: 0.8 },
    { word: 'smile', rarity: 0.2, strength: 0.8 },
    { word: 'laugh', rarity: 0.2, strength: 0.8 },
    { word: 'cheerful', rarity: 0.3, strength: 0.7 },
    { word: 'glad', rarity: 0.3, strength: 0.7 },
    { word: 'pleased', rarity: 0.3, strength: 0.7 },
    { word: 'delighted', rarity: 0.4, strength: 0.6 },
    { word: 'excited', rarity: 0.3, strength: 0.7 },
    { word: 'thrilled', rarity: 0.4, strength: 0.6 },
    { word: 'elated', rarity: 0.5, strength: 0.5 },
    { word: 'content', rarity: 0.4, strength: 0.6 },
    { word: 'satisfied', rarity: 0.3, strength: 0.7 },
    { word: 'optimistic', rarity: 0.4, strength: 0.6 },
    { word: 'positive', rarity: 0.3, strength: 0.7 },
    { word: 'upbeat', rarity: 0.4, strength: 0.6 },
    { word: 'bright', rarity: 0.3, strength: 0.7 },
    { word: 'sunny', rarity: 0.4, strength: 0.6 },
    { word: 'merry', rarity: 0.4, strength: 0.6 },
    { word: 'jovial', rarity: 0.5, strength: 0.5 },
    { word: 'blissful', rarity: 0.5, strength: 0.5 },
    { word: 'ecstatic', rarity: 0.5, strength: 0.5 },
    { word: 'euphoric', rarity: 0.6, strength: 0.4 },
    { word: 'jubilant', rarity: 0.6, strength: 0.4 },
    { word: 'exuberant', rarity: 0.6, strength: 0.4 },
    { word: 'radiant', rarity: 0.5, strength: 0.5 },
    { word: 'vibrant', rarity: 0.4, strength: 0.6 },
    { word: 'buoyant', rarity: 0.5, strength: 0.5 },
    { word: 'spirited', rarity: 0.4, strength: 0.6 },
    { word: 'lively', rarity: 0.4, strength: 0.6 },
    { word: 'animated', rarity: 0.4, strength: 0.6 }
  ],

  // Geography and places
  city: [
    { word: 'town', rarity: 0.2, strength: 0.8 },
    { word: 'urban', rarity: 0.3, strength: 0.7 },
    { word: 'street', rarity: 0.2, strength: 0.8 },
    { word: 'building', rarity: 0.2, strength: 0.8 },
    { word: 'skyscraper', rarity: 0.4, strength: 0.6 },
    { word: 'downtown', rarity: 0.3, strength: 0.7 },
    { word: 'suburb', rarity: 0.4, strength: 0.6 },
    { word: 'neighborhood', rarity: 0.3, strength: 0.7 },
    { word: 'district', rarity: 0.4, strength: 0.6 },
    { word: 'population', rarity: 0.4, strength: 0.6 },
    { word: 'mayor', rarity: 0.4, strength: 0.6 },
    { word: 'government', rarity: 0.3, strength: 0.7 },
    { word: 'council', rarity: 0.4, strength: 0.6 },
    { word: 'traffic', rarity: 0.3, strength: 0.7 },
    { word: 'transport', rarity: 0.4, strength: 0.6 },
    { word: 'subway', rarity: 0.4, strength: 0.6 },
    { word: 'bus', rarity: 0.3, strength: 0.7 },
    { word: 'taxi', rarity: 0.3, strength: 0.7 },
    { word: 'park', rarity: 0.2, strength: 0.8 },
    { word: 'square', rarity: 0.4, strength: 0.6 },
    { word: 'plaza', rarity: 0.4, strength: 0.6 },
    { word: 'market', rarity: 0.3, strength: 0.7 },
    { word: 'shop', rarity: 0.3, strength: 0.7 },
    { word: 'store', rarity: 0.3, strength: 0.7 },
    { word: 'restaurant', rarity: 0.3, strength: 0.7 },
    { word: 'cafe', rarity: 0.3, strength: 0.7 },
    { word: 'hospital', rarity: 0.3, strength: 0.7 },
    { word: 'school', rarity: 0.2, strength: 0.8 },
    { word: 'university', rarity: 0.3, strength: 0.7 },
    { word: 'library', rarity: 0.3, strength: 0.7 }
  ],

  // Animals and pets
  animal: [
    { word: 'pet', rarity: 0.2, strength: 0.8 },
    { word: 'dog', rarity: 0.1, strength: 0.9 },
    { word: 'cat', rarity: 0.1, strength: 0.9 },
    { word: 'bird', rarity: 0.2, strength: 0.8 },
    { word: 'fish', rarity: 0.2, strength: 0.8 },
    { word: 'horse', rarity: 0.3, strength: 0.7 },
    { word: 'cow', rarity: 0.3, strength: 0.7 },
    { word: 'pig', rarity: 0.3, strength: 0.7 },
    { word: 'sheep', rarity: 0.3, strength: 0.7 },
    { word: 'chicken', rarity: 0.3, strength: 0.7 },
    { word: 'rabbit', rarity: 0.3, strength: 0.7 },
    { word: 'mouse', rarity: 0.3, strength: 0.7 },
    { word: 'elephant', rarity: 0.3, strength: 0.7 },
    { word: 'lion', rarity: 0.3, strength: 0.7 },
    { word: 'tiger', rarity: 0.3, strength: 0.7 },
    { word: 'bear', rarity: 0.3, strength: 0.7 },
    { word: 'wolf', rarity: 0.4, strength: 0.6 },
    { word: 'fox', rarity: 0.4, strength: 0.6 },
    { word: 'deer', rarity: 0.4, strength: 0.6 },
    { word: 'monkey', rarity: 0.3, strength: 0.7 },
    { word: 'snake', rarity: 0.3, strength: 0.7 },
    { word: 'frog', rarity: 0.4, strength: 0.6 },
    { word: 'turtle', rarity: 0.4, strength: 0.6 },
    { word: 'dolphin', rarity: 0.4, strength: 0.6 },
    { word: 'whale', rarity: 0.4, strength: 0.6 },
    { word: 'shark', rarity: 0.4, strength: 0.6 },
    { word: 'insect', rarity: 0.4, strength: 0.6 },
    { word: 'butterfly', rarity: 0.4, strength: 0.6 },
    { word: 'bee', rarity: 0.4, strength: 0.6 },
    { word: 'spider', rarity: 0.4, strength: 0.6 }
  ],

  // Add hundreds more categories and words...
  // This is just a sample - the actual file would be much larger
};

/**
 * Creates bidirectional associations
 */
export const buildBidirectionalAssociations = (
    sourceMap: WordAssociationsMap
): WordAssociationsMap => {
  const bidirectional: WordAssociationsMap = JSON.parse(JSON.stringify(sourceMap));

  Object.entries(sourceMap).forEach(([word, associations]) => {
    associations.forEach(association => {
      const targetWord = association.word;

      if (!bidirectional[targetWord]) {
        bidirectional[targetWord] = [];
      }

      const existingReverse = bidirectional[targetWord].find(
          assoc => assoc.word === word
      );

      if (!existingReverse) {
        bidirectional[targetWord].push({
          word: word,
          rarity: Math.min(association.rarity + 0.1, 0.9),
          strength: Math.max(association.strength - 0.1, 0.3)
        });
      }
    });
  });

  return bidirectional;
};

/**
 * Utility functions
 */
export const areWordsAssociated = (
    word1: string,
    word2: string,
    associations: WordAssociationsMap
): boolean => {
  const word1Lower = word1.toLowerCase();
  const word2Lower = word2.toLowerCase();

  if (associations[word1Lower]) {
    if (associations[word1Lower].some(assoc => assoc.word.toLowerCase() === word2Lower)) {
      return true;
    }
  }

  if (associations[word2Lower]) {
    if (associations[word2Lower].some(assoc => assoc.word.toLowerCase() === word1Lower)) {
      return true;
    }
  }

  return false;
};

export const getAssociationDetails = (
    word1: string,
    word2: string,
    associations: WordAssociationsMap
): WordAssociation | null => {
  const word1Lower = word1.toLowerCase();
  const word2Lower = word2.toLowerCase();

  if (associations[word1Lower]) {
    const direct = associations[word1Lower].find(
        assoc => assoc.word.toLowerCase() === word2Lower
    );
    if (direct) return direct;
  }

  if (associations[word2Lower]) {
    const reverse = associations[word2Lower].find(
        assoc => assoc.word.toLowerCase() === word1Lower
    );
    if (reverse) {
      return {
        word: word1Lower,
        rarity: reverse.rarity,
        strength: reverse.strength
      };
    }
  }

  return null;
};

export const calculateAssociationScore = (
    association: WordAssociation | null,
    wordLength: number,
    chainLength: number
): number => {
  if (!association) return 0;

  let score = wordLength;
  score += Math.round(association.rarity * 5);
  score += Math.round(association.strength * 3);

  if (chainLength >= 5) score += 5;
  if (chainLength >= 10) score += 10;
  if (chainLength >= 15) score += 15;
  if (chainLength >= 20) score += 20;

  return score;
};

// Create and export the complete bidirectional word associations map
export const wordAssociations = buildBidirectionalAssociations(baseWordAssociations);