#!/usr/bin/env node

/**
 * Script to fetch word associations from Datamuse API and generate
 * an expanded word associations file for the Chain Reaction game
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'expandedWordAssociations.ts');
const RATE_LIMIT_DELAY = 100; // ms between API calls
const MAX_ASSOCIATIONS_PER_WORD = 15;
const MIN_ASSOCIATION_SCORE = 300; // Datamuse score threshold

// Common English words to start with (high-frequency, well-connected words)
const SEED_WORDS = [
  // Basic concepts
  'time', 'way', 'day', 'life', 'world', 'hand', 'eye', 'place', 'work', 'home',
  
  // Actions
  'make', 'take', 'get', 'see', 'come', 'go', 'know', 'think', 'say', 'look',
  'want', 'give', 'use', 'find', 'tell', 'ask', 'seem', 'feel', 'try', 'leave',
  'call', 'move', 'live', 'mean', 'show', 'turn', 'start', 'play', 'run', 'walk',
  
  // Objects
  'house', 'car', 'book', 'door', 'window', 'table', 'chair', 'phone', 'computer',
  'water', 'food', 'money', 'tree', 'flower', 'animal', 'cat', 'dog', 'bird',
  
  // Properties
  'good', 'bad', 'big', 'small', 'long', 'short', 'high', 'low', 'hot', 'cold',
  'new', 'old', 'young', 'fast', 'slow', 'strong', 'weak', 'light', 'dark',
  'red', 'blue', 'green', 'white', 'black', 'yellow', 'orange', 'purple',
  
  // Body parts
  'head', 'face', 'hair', 'eye', 'nose', 'mouth', 'ear', 'neck', 'arm', 'hand',
  'finger', 'leg', 'foot', 'heart', 'mind', 'body', 'skin', 'bone', 'blood',
  
  // Family & people
  'family', 'mother', 'father', 'parent', 'child', 'son', 'daughter', 'brother',
  'sister', 'friend', 'person', 'man', 'woman', 'boy', 'girl', 'baby',
  
  // Nature
  'sun', 'moon', 'star', 'sky', 'earth', 'ground', 'mountain', 'river', 'ocean',
  'sea', 'lake', 'forest', 'tree', 'grass', 'flower', 'rock', 'stone', 'sand',
  'fire', 'air', 'wind', 'rain', 'snow', 'ice', 'cloud', 'storm',
  
  // Food & drink
  'food', 'eat', 'drink', 'water', 'milk', 'bread', 'meat', 'fish', 'fruit',
  'apple', 'orange', 'banana', 'vegetable', 'potato', 'rice', 'sugar', 'salt',
  'coffee', 'tea', 'beer', 'wine', 'juice', 'cake', 'cheese', 'egg',
  
  // Places
  'city', 'town', 'country', 'state', 'street', 'road', 'building', 'store',
  'school', 'hospital', 'church', 'office', 'park', 'beach', 'garden', 'farm',
  
  // Time & seasons
  'year', 'month', 'week', 'day', 'hour', 'minute', 'morning', 'evening',
  'night', 'today', 'tomorrow', 'yesterday', 'spring', 'summer', 'fall', 'winter',
  
  // Current game words to expand
  'room', 'living', 'open', 'close', 'door', 'family', 'ocean', 'wave', 'fish',
  'lake', 'rain', 'wet', 'drink', 'river', 'flow', 'swim'
];

// Sleep function for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch associations for a word from Datamuse API
async function fetchAssociations(word) {
  try {
    console.log(`Fetching associations for: ${word}`);
    
    // Use Datamuse API "words triggered by" endpoint
    const response = await fetch(`https://api.datamuse.com/words?rel_trg=${encodeURIComponent(word)}&max=${MAX_ASSOCIATIONS_PER_WORD}`);
    
    if (!response.ok) {
      console.warn(`Failed to fetch associations for "${word}": ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    // Filter and transform the results
    const associations = data
      .filter(item => item.score >= MIN_ASSOCIATION_SCORE && item.word.length >= 3)
      .map(item => ({
        word: item.word.toLowerCase(),
        rarity: Math.min(0.9, Math.max(0.1, 1 - (item.score / 10000))), // Convert score to rarity
        strength: Math.min(0.9, Math.max(0.3, item.score / 10000)) // Convert score to strength
      }));
    
    console.log(`  Found ${associations.length} associations`);
    return associations;
    
  } catch (error) {
    console.error(`Error fetching associations for "${word}":`, error.message);
    return [];
  }
}

// Generate the complete word associations map
async function generateWordAssociations() {
  console.log('Starting word association generation...');
  console.log(`Processing ${SEED_WORDS.length} seed words`);
  
  const wordAssociations = {};
  const processedWords = new Set();
  
  // Process seed words
  for (const word of SEED_WORDS) {
    if (processedWords.has(word.toLowerCase())) continue;
    
    const associations = await fetchAssociations(word);
    if (associations.length > 0) {
      wordAssociations[word.toLowerCase()] = associations;
      processedWords.add(word.toLowerCase());
    }
    
    // Rate limiting
    await sleep(RATE_LIMIT_DELAY);
  }
  
  // Process secondary words (words found in associations)
  const secondaryWords = new Set();
  Object.values(wordAssociations).forEach(associations => {
    associations.forEach(assoc => {
      if (!processedWords.has(assoc.word) && !secondaryWords.has(assoc.word)) {
        secondaryWords.add(assoc.word);
      }
    });
  });
  
  console.log(`\nFound ${secondaryWords.size} secondary words to process`);
  
  // Process a subset of secondary words to avoid too many API calls
  const secondaryWordsArray = Array.from(secondaryWords).slice(0, 100);
  
  for (const word of secondaryWordsArray) {
    if (processedWords.has(word)) continue;
    
    const associations = await fetchAssociations(word);
    if (associations.length > 0) {
      wordAssociations[word] = associations;
      processedWords.add(word);
    }
    
    await sleep(RATE_LIMIT_DELAY);
  }
  
  console.log(`\nCompleted! Generated associations for ${Object.keys(wordAssociations).length} words`);
  return wordAssociations;
}

// Create bidirectional associations
function buildBidirectionalAssociations(sourceMap) {
  const bidirectional = JSON.parse(JSON.stringify(sourceMap));
  
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
}

// Generate the TypeScript file
function generateTypeScriptFile(wordAssociations) {
  const content = `// Auto-generated word associations from Datamuse API
// Generated on: ${new Date().toISOString()}
// Total words: ${Object.keys(wordAssociations).length}

export type WordAssociation = {
  word: string;
  rarity: number; // 0-1, higher means rarer
  strength: number; // 0-1, higher means stronger association
};

export type WordAssociationsMap = {
  [key: string]: WordAssociation[];
};

// Generated word associations map
export const baseWordAssociations: WordAssociationsMap = ${JSON.stringify(wordAssociations, null, 2)};

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

// Create and export the complete bidirectional word associations map
export const wordAssociations = buildBidirectionalAssociations(baseWordAssociations);
`;

  return content;
}

// Main execution
async function main() {
  try {
    // Create scripts directory if it doesn't exist
    const scriptsDir = path.dirname(__filename);
    if (!fs.existsSync(scriptsDir)) {
      fs.mkdirSync(scriptsDir, { recursive: true });
    }
    
    // Generate word associations
    const wordAssociations = await generateWordAssociations();
    
    // Build bidirectional associations
    const bidirectionalAssociations = buildBidirectionalAssociations(wordAssociations);
    
    // Generate TypeScript file
    const tsContent = generateTypeScriptFile(bidirectionalAssociations);
    
    // Write the file
    fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');
    
    console.log(`\n✅ Successfully generated word associations file:`);
    console.log(`   File: ${OUTPUT_FILE}`);
    console.log(`   Words: ${Object.keys(bidirectionalAssociations).length}`);
    console.log(`   Total associations: ${Object.values(bidirectionalAssociations).reduce((sum, arr) => sum + arr.length, 0)}`);
    
  } catch (error) {
    console.error('Error generating word associations:', error);
    process.exit(1);
  }
}

// Run if called directly
main();