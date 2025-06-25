#!/usr/bin/env node

/**
 * Add interconnected word chains for better gameplay flow
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPANDED_FILE = path.join(__dirname, '..', 'src', 'data', 'expandedWordAssociations.ts');

// Define common word chains that should be well-connected
const WORD_CHAINS = [
  // Water/Nature chain
  ['water', 'stream', 'river', 'lake', 'ocean', 'sea', 'wave', 'tide', 'shore', 'beach', 'sand', 'rock', 'stone'],
  ['river', 'boat', 'ship', 'sail', 'wind', 'breeze', 'air', 'sky', 'cloud', 'rain', 'storm', 'thunder', 'lightning'],
  
  // Food chain
  ['food', 'eat', 'taste', 'flavor', 'sweet', 'sugar', 'honey', 'bee', 'flower', 'garden', 'plant', 'grow', 'seed'],
  ['cook', 'heat', 'fire', 'burn', 'flame', 'light', 'bright', 'sun', 'warm', 'summer', 'hot', 'cold', 'ice'],
  
  // Body/Health chain
  ['body', 'skin', 'touch', 'feel', 'sense', 'mind', 'think', 'brain', 'head', 'face', 'eye', 'see', 'look'],
  ['heart', 'beat', 'pulse', 'blood', 'flow', 'move', 'run', 'fast', 'speed', 'quick', 'time', 'clock', 'hour'],
  
  // House/Home chain
  ['home', 'house', 'room', 'door', 'open', 'close', 'window', 'glass', 'clear', 'clean', 'wash', 'water'],
  ['family', 'child', 'play', 'game', 'fun', 'happy', 'smile', 'laugh', 'joy', 'love', 'heart'],
  
  // Work/School chain
  ['work', 'job', 'office', 'desk', 'chair', 'sit', 'table', 'book', 'read', 'learn', 'study', 'school', 'teach'],
  ['paper', 'write', 'pen', 'ink', 'black', 'white', 'color', 'paint', 'art', 'draw', 'picture', 'image'],
  
  // Music/Arts chain
  ['music', 'song', 'sing', 'voice', 'sound', 'hear', 'listen', 'ear', 'head', 'hair', 'cut', 'sharp', 'knife'],
  ['dance', 'move', 'step', 'foot', 'walk', 'path', 'road', 'street', 'city', 'town', 'place', 'here', 'there'],
  
  // Animal chain
  ['animal', 'cat', 'dog', 'pet', 'love', 'care', 'help', 'give', 'hand', 'arm', 'strong', 'power', 'force'],
  ['bird', 'fly', 'wing', 'feather', 'light', 'weight', 'heavy', 'big', 'small', 'tiny', 'little', 'baby'],
  
  // Technology chain
  ['computer', 'screen', 'display', 'show', 'picture', 'camera', 'photo', 'memory', 'remember', 'past', 'old', 'new'],
  ['phone', 'call', 'talk', 'speak', 'word', 'language', 'english', 'speak', 'mouth', 'teeth', 'white', 'clean'],
  
  // Transportation chain
  ['car', 'drive', 'road', 'travel', 'trip', 'journey', 'adventure', 'explore', 'find', 'search', 'look', 'see'],
  ['train', 'track', 'rail', 'metal', 'iron', 'steel', 'strong', 'hard', 'solid', 'ground', 'earth', 'dirt'],
  
  // Clothing chain
  ['clothes', 'wear', 'dress', 'shirt', 'color', 'blue', 'green', 'red', 'yellow', 'bright', 'light', 'day', 'morning'],
  ['shoes', 'foot', 'walk', 'step', 'forward', 'ahead', 'future', 'tomorrow', 'next', 'after', 'later', 'time'],
  
  // Weather chain
  ['weather', 'rain', 'wet', 'dry', 'desert', 'sand', 'hot', 'sun', 'bright', 'yellow', 'gold', 'money', 'rich']
];

function addWordChainAssociations() {
  console.log('Adding interconnected word chains...');
  
  // Read current file
  const fileContent = fs.readFileSync(EXPANDED_FILE, 'utf8');
  
  // Extract the existing associations
  const mapMatch = fileContent.match(/export const baseWordAssociations: WordAssociationsMap = ({[\s\S]*?});/);
  if (!mapMatch) {
    console.error('Could not find baseWordAssociations in file');
    return;
  }
  
  const existingAssociations = JSON.parse(mapMatch[1]);
  
  // Add chain associations
  WORD_CHAINS.forEach((chain, chainIndex) => {
    console.log(`Processing chain ${chainIndex + 1}: ${chain.slice(0, 3).join(' → ')}...`);
    
    chain.forEach((word, wordIndex) => {
      if (!existingAssociations[word]) {
        existingAssociations[word] = [];
      }
      
      const existingWords = new Set(existingAssociations[word].map(a => a.word));
      
      // Connect to previous word in chain
      if (wordIndex > 0) {
        const prevWord = chain[wordIndex - 1];
        if (!existingWords.has(prevWord)) {
          existingAssociations[word].push({
            word: prevWord,
            rarity: 0.2, // Low rarity = common connection
            strength: 0.8 // High strength
          });
          existingWords.add(prevWord);
        }
      }
      
      // Connect to next word in chain
      if (wordIndex < chain.length - 1) {
        const nextWord = chain[wordIndex + 1];
        if (!existingWords.has(nextWord)) {
          existingAssociations[word].push({
            word: nextWord,
            rarity: 0.2, // Low rarity = common connection
            strength: 0.8 // High strength
          });
          existingWords.add(nextWord);
        }
      }
      
      // Connect to word 2 positions ahead/behind for more variety
      if (wordIndex > 1) {
        const prevWord2 = chain[wordIndex - 2];
        if (!existingWords.has(prevWord2)) {
          existingAssociations[word].push({
            word: prevWord2,
            rarity: 0.3, // Slightly less common
            strength: 0.6
          });
        }
      }
      
      if (wordIndex < chain.length - 2) {
        const nextWord2 = chain[wordIndex + 2];
        if (!existingWords.has(nextWord2)) {
          existingAssociations[word].push({
            word: nextWord2,
            rarity: 0.3, // Slightly less common
            strength: 0.6
          });
        }
      }
    });
  });
  
  // Build bidirectional associations
  console.log('Building bidirectional associations...');
  const wordsToProcess = Object.keys(existingAssociations);
  
  wordsToProcess.forEach(word => {
    const associations = existingAssociations[word];
    associations.forEach(association => {
      const targetWord = association.word;
      
      if (!existingAssociations[targetWord]) {
        existingAssociations[targetWord] = [];
      }
      
      const existingReverse = existingAssociations[targetWord].find(
        assoc => assoc.word === word
      );
      
      if (!existingReverse) {
        existingAssociations[targetWord].push({
          word: word,
          rarity: Math.min(association.rarity + 0.1, 0.9),
          strength: Math.max(association.strength - 0.1, 0.3)
        });
      }
    });
  });
  
  // Generate new file content
  const newContent = fileContent.replace(
    /export const baseWordAssociations: WordAssociationsMap = {[\s\S]*?};/,
    `export const baseWordAssociations: WordAssociationsMap = ${JSON.stringify(existingAssociations, null, 2)};`
  );
  
  // Update the comment with new stats
  const wordCount = Object.keys(existingAssociations).length;
  const totalAssociations = Object.values(existingAssociations).reduce((sum, arr) => sum + arr.length, 0);
  
  const finalContent = newContent.replace(
    /\/\/ Generated on: .*?\n\/\/ Total words: \d+/,
    `// Generated on: ${new Date().toISOString()}\n// Total words: ${wordCount}`
  );
  
  // Write the updated file
  fs.writeFileSync(EXPANDED_FILE, finalContent, 'utf8');
  
  console.log(`\n✅ Successfully added word chains!`);
  console.log(`   Words: ${wordCount}`);
  console.log(`   Total associations: ${totalAssociations}`);
  console.log(`   Added ${WORD_CHAINS.length} interconnected word chains`);
}

addWordChainAssociations();