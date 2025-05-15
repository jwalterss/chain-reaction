type WordAssociation = {
  word: string;
  rarity: number; // 0-1, higher means rarer
  strength: number; // 0-1, higher means stronger association
};

type WordAssociationsMap = {
  [key: string]: WordAssociation[];
};

// Base associations with expanded connectivity
export const baseWordAssociations: WordAssociationsMap = {
  // Nature & Water related terms with expanded associations
  river: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'flow', rarity: 0.3, strength: 0.8 },
    { word: 'stream', rarity: 0.2, strength: 0.8 },
    { word: 'bank', rarity: 0.4, strength: 0.6 },
    { word: 'fish', rarity: 0.3, strength: 0.7 },
    { word: 'bridge', rarity: 0.5, strength: 0.5 },
    { word: 'current', rarity: 0.4, strength: 0.7 },
    { word: 'boat', rarity: 0.3, strength: 0.6 },
    { word: 'flood', rarity: 0.5, strength: 0.5 },
    { word: 'swim', rarity: 0.4, strength: 0.6 },
    { word: 'deep', rarity: 0.4, strength: 0.5 },
    { word: 'valley', rarity: 0.6, strength: 0.4 },
    { word: 'shore', rarity: 0.5, strength: 0.5 },
    { word: 'rapids', rarity: 0.7, strength: 0.6 },
    { word: 'lake', rarity: 0.3, strength: 0.6 },
  ],

  // Expanded water associations to avoid dead ends
  water: [
    { word: 'drink', rarity: 0.2, strength: 0.8 },
    { word: 'ocean', rarity: 0.3, strength: 0.7 },
    { word: 'lake', rarity: 0.3, strength: 0.7 },
    { word: 'rain', rarity: 0.2, strength: 0.8 },
    { word: 'wet', rarity: 0.1, strength: 0.9 },
    { word: 'flow', rarity: 0.3, strength: 0.7 },
    { word: 'clear', rarity: 0.4, strength: 0.6 },
    { word: 'fish', rarity: 0.3, strength: 0.7 },
    { word: 'ice', rarity: 0.4, strength: 0.6 },
    { word: 'swim', rarity: 0.3, strength: 0.7 },
    { word: 'river', rarity: 0.2, strength: 0.8 },
    { word: 'wave', rarity: 0.3, strength: 0.7 },
    { word: 'bottle', rarity: 0.3, strength: 0.7 },
    { word: 'blue', rarity: 0.3, strength: 0.6 },
    { word: 'clean', rarity: 0.4, strength: 0.6 },
    { word: 'boil', rarity: 0.4, strength: 0.6 },
    { word: 'splash', rarity: 0.4, strength: 0.7 },
    { word: 'steam', rarity: 0.5, strength: 0.6 },
    { word: 'thirst', rarity: 0.4, strength: 0.7 },
    { word: 'sink', rarity: 0.5, strength: 0.5 },
  ],

  // Add associations for everything related to water
  drink: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'cup', rarity: 0.3, strength: 0.7 },
    { word: 'glass', rarity: 0.3, strength: 0.7 },
    { word: 'thirst', rarity: 0.2, strength: 0.8 },
    { word: 'sip', rarity: 0.4, strength: 0.7 },
    { word: 'juice', rarity: 0.3, strength: 0.7 },
    { word: 'beer', rarity: 0.4, strength: 0.6 },
    { word: 'wine', rarity: 0.4, strength: 0.6 },
    { word: 'coffee', rarity: 0.3, strength: 0.7 },
    { word: 'tea', rarity: 0.3, strength: 0.7 },
    { word: 'bottle', rarity: 0.3, strength: 0.7 },
    { word: 'straw', rarity: 0.5, strength: 0.6 },
    { word: 'milk', rarity: 0.3, strength: 0.7 },
    { word: 'swallow', rarity: 0.5, strength: 0.6 },
    { word: 'gulp', rarity: 0.6, strength: 0.6 },
  ],

  wet: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'dry', rarity: 0.2, strength: 0.8 },
    { word: 'rain', rarity: 0.2, strength: 0.8 },
    { word: 'damp', rarity: 0.3, strength: 0.8 },
    { word: 'moist', rarity: 0.4, strength: 0.7 },
    { word: 'splash', rarity: 0.4, strength: 0.7 },
    { word: 'towel', rarity: 0.4, strength: 0.6 },
    { word: 'swim', rarity: 0.3, strength: 0.6 },
    { word: 'soak', rarity: 0.4, strength: 0.7 },
    { word: 'flood', rarity: 0.5, strength: 0.5 },
    { word: 'slippery', rarity: 0.5, strength: 0.6 },
    { word: 'puddle', rarity: 0.4, strength: 0.7 },
    { word: 'wash', rarity: 0.3, strength: 0.7 },
    { word: 'drip', rarity: 0.4, strength: 0.6 },
    { word: 'river', rarity: 0.4, strength: 0.5 },
  ],

  ocean: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'wave', rarity: 0.2, strength: 0.8 },
    { word: 'beach', rarity: 0.2, strength: 0.8 },
    { word: 'sea', rarity: 0.1, strength: 0.9 },
    { word: 'fish', rarity: 0.3, strength: 0.7 },
    { word: 'salt', rarity: 0.4, strength: 0.7 },
    { word: 'deep', rarity: 0.3, strength: 0.7 },
    { word: 'shark', rarity: 0.5, strength: 0.6 },
    { word: 'coral', rarity: 0.6, strength: 0.5 },
    { word: 'tide', rarity: 0.4, strength: 0.7 },
    { word: 'blue', rarity: 0.3, strength: 0.7 },
    { word: 'ship', rarity: 0.3, strength: 0.7 },
    { word: 'sail', rarity: 0.4, strength: 0.6 },
    { word: 'whale', rarity: 0.5, strength: 0.6 },
    { word: 'swim', rarity: 0.3, strength: 0.6 },
    { word: 'coast', rarity: 0.4, strength: 0.6 },
    { word: 'island', rarity: 0.4, strength: 0.6 },
    { word: 'surf', rarity: 0.5, strength: 0.6 },
    { word: 'dive', rarity: 0.5, strength: 0.6 },
    { word: 'pacific', rarity: 0.6, strength: 0.5 },
  ],

  // Associations for terms related to rain
  rain: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'drop', rarity: 0.2, strength: 0.8 },
    { word: 'wet', rarity: 0.2, strength: 0.8 },
    { word: 'cloud', rarity: 0.2, strength: 0.8 },
    { word: 'storm', rarity: 0.3, strength: 0.7 },
    { word: 'weather', rarity: 0.3, strength: 0.7 },
    { word: 'umbrella', rarity: 0.3, strength: 0.7 },
    { word: 'puddle', rarity: 0.4, strength: 0.7 },
    { word: 'thunder', rarity: 0.4, strength: 0.6 },
    { word: 'lightning', rarity: 0.4, strength: 0.6 },
    { word: 'drip', rarity: 0.5, strength: 0.6 },
    { word: 'pour', rarity: 0.4, strength: 0.7 },
    { word: 'shower', rarity: 0.3, strength: 0.7 },
    { word: 'flood', rarity: 0.5, strength: 0.6 },
    { word: 'rainbow', rarity: 0.5, strength: 0.5 },
    { word: 'wind', rarity: 0.4, strength: 0.5 },
    { word: 'splash', rarity: 0.5, strength: 0.5 },
    { word: 'forecast', rarity: 0.6, strength: 0.5 },
    { word: 'heavy', rarity: 0.5, strength: 0.5 },
    { word: 'season', rarity: 0.6, strength: 0.4 },
  ],

  // Additional connections for other elements
  fish: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'swim', rarity: 0.2, strength: 0.8 },
    { word: 'ocean', rarity: 0.2, strength: 0.8 },
    { word: 'river', rarity: 0.3, strength: 0.7 },
    { word: 'lake', rarity: 0.3, strength: 0.7 },
    { word: 'sea', rarity: 0.3, strength: 0.7 },
    { word: 'tank', rarity: 0.4, strength: 0.6 },
    { word: 'net', rarity: 0.4, strength: 0.6 },
    { word: 'hook', rarity: 0.4, strength: 0.6 },
    { word: 'catch', rarity: 0.3, strength: 0.7 },
    { word: 'scale', rarity: 0.5, strength: 0.5 },
    { word: 'gill', rarity: 0.6, strength: 0.5 },
    { word: 'food', rarity: 0.3, strength: 0.6 },
    { word: 'shark', rarity: 0.5, strength: 0.5 },
    { word: 'tuna', rarity: 0.5, strength: 0.5 },
    { word: 'salmon', rarity: 0.5, strength: 0.5 },
    { word: 'fin', rarity: 0.5, strength: 0.6 },
    { word: 'bait', rarity: 0.5, strength: 0.6 },
    { word: 'rod', rarity: 0.5, strength: 0.6 },
    { word: 'aquarium', rarity: 0.6, strength: 0.5 },
  ],

  lake: [
    { word: 'water', rarity: 0.1, strength: 0.9 },
    { word: 'fish', rarity: 0.2, strength: 0.8 },
    { word: 'boat', rarity: 0.3, strength: 0.7 },
    { word: 'swim', rarity: 0.3, strength: 0.7 },
    { word: 'shore', rarity: 0.4, strength: 0.6 },
    { word: 'river', rarity: 0.3, strength: 0.7 },
    { word: 'dock', rarity: 0.5, strength: 0.6 },
    { word: 'calm', rarity: 0.5, strength: 0.5 },
    { word: 'deep', rarity: 0.4, strength: 0.6 },
    { word: 'paddle', rarity: 0.5, strength: 0.6 },
    { word: 'canoe', rarity: 0.5, strength: 0.6 },
    { word: 'cabin', rarity: 0.6, strength: 0.5 },
    { word: 'picnic', rarity: 0.6, strength: 0.4 },
    { word: 'blue', rarity: 0.4, strength: 0.5 },
    { word: 'reflection', rarity: 0.6, strength: 0.5 },
    { word: 'bridge', rarity: 0.5, strength: 0.5 },
    { word: 'camp', rarity: 0.5, strength: 0.5 },
    { word: 'hike', rarity: 0.6, strength: 0.4 },
    { word: 'nature', rarity: 0.4, strength: 0.6 },
    { word: 'vacation', rarity: 0.6, strength: 0.4 },
  ],

  wave: [
    { word: 'ocean', rarity: 0.1, strength: 0.9 },
    { word: 'water', rarity: 0.2, strength: 0.8 },
    { word: 'surf', rarity: 0.3, strength: 0.8 },
    { word: 'beach', rarity: 0.3, strength: 0.7 },
    { word: 'sea', rarity: 0.2, strength: 0.8 },
    { word: 'tide', rarity: 0.4, strength: 0.7 },
    { word: 'crash', rarity: 0.5, strength: 0.6 },
    { word: 'hand', rarity: 0.4, strength: 0.5 },
    { word: 'hello', rarity: 0.5, strength: 0.5 },
    { word: 'goodbye', rarity: 0.5, strength: 0.5 },
    { word: 'sound', rarity: 0.5, strength: 0.5 },
    { word: 'radio', rarity: 0.6, strength: 0.4 },
    { word: 'motion', rarity: 0.5, strength: 0.5 },
    { word: 'ripple', rarity: 0.6, strength: 0.6 },
    { word: 'splash', rarity: 0.5, strength: 0.6 },
    { word: 'curl', rarity: 0.6, strength: 0.5 },
    { word: 'board', rarity: 0.5, strength: 0.5 },
    { word: 'particle', rarity: 0.7, strength: 0.4 },
    { word: 'flag', rarity: 0.6, strength: 0.4 },
    { word: 'tsunami', rarity: 0.7, strength: 0.5 },
  ],

  // Family related (previously defined with "room" connection)
  family: [
    { word: 'home', rarity: 0.1, strength: 0.9 },
    { word: 'love', rarity: 0.1, strength: 0.8 },
    { word: 'parents', rarity: 0.2, strength: 0.8 },
    { word: 'children', rarity: 0.2, strength: 0.8 },
    { word: 'members', rarity: 0.3, strength: 0.7 },
    { word: 'relatives', rarity: 0.3, strength: 0.7 },
    { word: 'siblings', rarity: 0.3, strength: 0.7 },
    { word: 'reunion', rarity: 0.5, strength: 0.6 },
    { word: 'tree', rarity: 0.4, strength: 0.5 },
    { word: 'dinner', rarity: 0.3, strength: 0.6 },
    { word: 'room', rarity: 0.3, strength: 0.5 },  // Critical association
    { word: 'house', rarity: 0.2, strength: 0.7 },
    { word: 'bond', rarity: 0.6, strength: 0.7 },
    { word: 'tradition', rarity: 0.5, strength: 0.6 },
    { word: 'holiday', rarity: 0.4, strength: 0.6 },
    { word: 'support', rarity: 0.4, strength: 0.7 },
    { word: 'together', rarity: 0.3, strength: 0.7 },
    { word: 'photo', rarity: 0.5, strength: 0.5 },
    { word: 'gather', rarity: 0.5, strength: 0.6 },
    { word: 'clan', rarity: 0.7, strength: 0.4 },
  ],

  // Room related terms with many associations
  room: [
    { word: 'house', rarity: 0.1, strength: 0.9 },
    { word: 'space', rarity: 0.2, strength: 0.8 },
    { word: 'home', rarity: 0.2, strength: 0.8 },
    { word: 'family', rarity: 0.3, strength: 0.7 },  // Critical association
    { word: 'living', rarity: 0.2, strength: 0.8 },
    { word: 'bedroom', rarity: 0.2, strength: 0.8 },
    { word: 'bathroom', rarity: 0.3, strength: 0.7 },
    { word: 'kitchen', rarity: 0.3, strength: 0.7 },
    { word: 'dining', rarity: 0.3, strength: 0.7 },
    { word: 'door', rarity: 0.3, strength: 0.7 },
    { word: 'window', rarity: 0.3, strength: 0.7 },
    { word: 'wall', rarity: 0.3, strength: 0.7 },
    { word: 'floor', rarity: 0.3, strength: 0.7 },
    { word: 'ceiling', rarity: 0.4, strength: 0.6 },
    { word: 'hotel', rarity: 0.4, strength: 0.6 },
    { word: 'furniture', rarity: 0.4, strength: 0.6 },
    { word: 'light', rarity: 0.4, strength: 0.6 },
    { word: 'carpet', rarity: 0.5, strength: 0.5 },
    { word: 'clean', rarity: 0.5, strength: 0.5 },
    { word: 'decorate', rarity: 0.6, strength: 0.5 },
  ],

  // Living related
  living: [
    { word: 'room', rarity: 0.2, strength: 0.8 },
    { word: 'life', rarity: 0.1, strength: 0.9 },
    { word: 'home', rarity: 0.3, strength: 0.7 },
    { word: 'space', rarity: 0.4, strength: 0.6 },
    { word: 'creature', rarity: 0.5, strength: 0.5 },
    { word: 'being', rarity: 0.5, strength: 0.5 },
    { word: 'house', rarity: 0.4, strength: 0.6 },
    { word: 'family', rarity: 0.4, strength: 0.6 },
    { word: 'couch', rarity: 0.5, strength: 0.5 },
    { word: 'area', rarity: 0.5, strength: 0.5 },
    { word: 'together', rarity: 0.5, strength: 0.5 },
    { word: 'breathe', rarity: 0.6, strength: 0.5 },
    { word: 'exist', rarity: 0.6, strength: 0.5 },
    { word: 'sofa', rarity: 0.5, strength: 0.5 },
    { word: 'survive', rarity: 0.6, strength: 0.5 },
    { word: 'active', rarity: 0.6, strength: 0.4 },
    { word: 'healthy', rarity: 0.6, strength: 0.4 },
    { word: 'growing', rarity: 0.6, strength: 0.4 },
    { word: 'thrive', rarity: 0.7, strength: 0.4 },
    { word: 'lifestyle', rarity: 0.6, strength: 0.4 },
  ],

  // More connections for common words
  door: [
    { word: 'room', rarity: 0.2, strength: 0.8 },
    { word: 'open', rarity: 0.1, strength: 0.9 },
    { word: 'close', rarity: 0.1, strength: 0.9 },
    { word: 'house', rarity: 0.2, strength: 0.8 },
    { word: 'lock', rarity: 0.3, strength: 0.7 },
    { word: 'knob', rarity: 0.4, strength: 0.7 },
    { word: 'handle', rarity: 0.4, strength: 0.6 },
    { word: 'entrance', rarity: 0.3, strength: 0.7 },
    { word: 'exit', rarity: 0.3, strength: 0.7 },
    { word: 'window', rarity: 0.4, strength: 0.6 },
    { word: 'knock', rarity: 0.4, strength: 0.6 },
    { word: 'wood', rarity: 0.5, strength: 0.5 },
    { word: 'hinge', rarity: 0.6, strength: 0.5 },
    { word: 'frame', rarity: 0.5, strength: 0.5 },
    { word: 'slam', rarity: 0.6, strength: 0.5 },
    { word: 'shut', rarity: 0.4, strength: 0.6 },
    { word: 'front', rarity: 0.4, strength: 0.6 },
    { word: 'back', rarity: 0.5, strength: 0.5 },
    { word: 'slide', rarity: 0.6, strength: 0.4 },
    { word: 'swing', rarity: 0.6, strength: 0.4 },
  ],

  open: [
    { word: 'close', rarity: 0.1, strength: 0.9 },
    { word: 'door', rarity: 0.2, strength: 0.8 },
    { word: 'shut', rarity: 0.3, strength: 0.7 },
    { word: 'window', rarity: 0.3, strength: 0.7 },
    { word: 'wide', rarity: 0.4, strength: 0.6 },
    { word: 'store', rarity: 0.4, strength: 0.6 },
    { word: 'mind', rarity: 0.5, strength: 0.5 },
    { word: 'box', rarity: 0.4, strength: 0.6 },
    { word: 'book', rarity: 0.4, strength: 0.6 },
    { word: 'eyes', rarity: 0.5, strength: 0.5 },
    { word: 'access', rarity: 0.5, strength: 0.5 },
    { word: 'free', rarity: 0.5, strength: 0.5 },
    { word: 'available', rarity: 0.5, strength: 0.5 },
    { word: 'jar', rarity: 0.6, strength: 0.4 },
    { word: 'bottle', rarity: 0.5, strength: 0.5 },
    { word: 'business', rarity: 0.5, strength: 0.5 },
    { word: 'hours', rarity: 0.6, strength: 0.4 },
    { word: 'lock', rarity: 0.5, strength: 0.5 },
    { word: 'space', rarity: 0.6, strength: 0.4 },
    { word: 'view', rarity: 0.6, strength: 0.4 },
  ],

  // Many more word associations would be defined here...
};

/**
 * Creates bidirectional associations to ensure
 * that if A is associated with B, then B is also associated with A
 */
export const buildBidirectionalAssociations = (
    sourceMap: WordAssociationsMap
): WordAssociationsMap => {
  const bidirectional: WordAssociationsMap = JSON.parse(JSON.stringify(sourceMap));

  // For each word and its associations
  Object.entries(sourceMap).forEach(([word, associations]) => {
    // For each associated word
    associations.forEach(association => {
      const targetWord = association.word;

      // Create the target word entry if it doesn't exist
      if (!bidirectional[targetWord]) {
        bidirectional[targetWord] = [];
      }

      // Check if the reverse association already exists
      const existingReverse = bidirectional[targetWord].find(
          assoc => assoc.word === word
      );

      if (!existingReverse) {
        // Add the reverse association with slightly modified rarity/strength
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
 * Checks if two words have a valid association
 */
export const areWordsAssociated = (
    word1: string,
    word2: string,
    associations: WordAssociationsMap
): boolean => {
  const word1Lower = word1.toLowerCase();
  const word2Lower = word2.toLowerCase();

  // Check direct association
  if (associations[word1Lower]) {
    if (associations[word1Lower].some(assoc => assoc.word.toLowerCase() === word2Lower)) {
      return true;
    }
  }

  // Check reverse association
  if (associations[word2Lower]) {
    if (associations[word2Lower].some(assoc => assoc.word.toLowerCase() === word1Lower)) {
      return true;
    }
  }

  return false;
};

/**
 * Gets association details between two words if they exist
 */
export const getAssociationDetails = (
    word1: string,
    word2: string,
    associations: WordAssociationsMap
): WordAssociation | null => {
  const word1Lower = word1.toLowerCase();
  const word2Lower = word2.toLowerCase();

  // Check direct association
  if (associations[word1Lower]) {
    const direct = associations[word1Lower].find(
        assoc => assoc.word.toLowerCase() === word2Lower
    );
    if (direct) return direct;
  }

  // Check reverse association
  if (associations[word2Lower]) {
    const reverse = associations[word2Lower].find(
        assoc => assoc.word.toLowerCase() === word1Lower
    );
    if (reverse) {
      // Return a modified version for the reverse direction
      return {
        word: word1Lower,
        rarity: reverse.rarity,
        strength: reverse.strength
      };
    }
  }

  return null;
};

/**
 * Calculate score for a word based on length, rarity, and chain length
 */
export const calculateAssociationScore = (
    association: WordAssociation | null,
    wordLength: number,
    chainLength: number
): number => {
  if (!association) return 0;

  // Base score from word length
  let score = wordLength;

  // Add points based on association rarity (rarer = more points)
  score += Math.round(association.rarity * 5);

  // Add points based on association strength (stronger = more points)
  score += Math.round(association.strength * 3);

  // Chain length bonuses
  if (chainLength >= 5) score += 5;
  if (chainLength >= 10) score += 10;
  if (chainLength >= 15) score += 15;
  if (chainLength >= 20) score += 20;

  return score;
};

// Create and export the complete bidirectional word associations map
export const wordAssociations = buildBidirectionalAssociations(baseWordAssociations);