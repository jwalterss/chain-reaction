#!/usr/bin/env node

/**
 * Patch script to add associations for words that are creating dead ends
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const EXPANDED_FILE = path.join(__dirname, '..', 'src', 'data', 'expandedWordAssociations.ts');
const RATE_LIMIT_DELAY = 150; // ms between API calls
const MAX_ASSOCIATIONS_PER_WORD = 15;
const MIN_ASSOCIATION_SCORE = 300;

// Words that are creating dead ends
const DEAD_END_WORDS = [
  'opera', 'symphony', 'concerto', 'ballet', 'theater', 'theatre', 'music', 'song',
  'performance', 'stage', 'actor', 'actress', 'singer', 'artist', 'dance', 'show',
  'film', 'movie', 'cinema', 'drama', 'comedy', 'musical', 'orchestra', 'band',
  'guitar', 'piano', 'violin', 'instrument', 'sound', 'voice', 'audience'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchAssociations(word) {
  try {
    console.log(`Fetching associations for: ${word}`);
    
    const response = await fetch(`https://api.datamuse.com/words?rel_trg=${encodeURIComponent(word)}&max=${MAX_ASSOCIATIONS_PER_WORD}`);
    
    if (!response.ok) {
      console.warn(`Failed to fetch associations for "${word}": ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    const associations = data
      .filter(item => item.score >= MIN_ASSOCIATION_SCORE && item.word.length >= 3)
      .map(item => ({
        word: item.word.toLowerCase(),
        rarity: Math.min(0.9, Math.max(0.1, 1 - (item.score / 10000))),
        strength: Math.min(0.9, Math.max(0.3, item.score / 10000))
      }));
    
    console.log(`  Found ${associations.length} associations`);
    return associations;
    
  } catch (error) {
    console.error(`Error fetching associations for "${word}":`, error.message);
    return [];
  }
}

async function patchDeadEnds() {
  console.log('Patching dead end words...');
  
  // Read current file
  const fileContent = fs.readFileSync(EXPANDED_FILE, 'utf8');
  
  // Extract the existing associations
  const mapMatch = fileContent.match(/export const baseWordAssociations: WordAssociationsMap = ({[\s\S]*?});/);
  if (!mapMatch) {
    console.error('Could not find baseWordAssociations in file');
    return;
  }
  
  const existingAssociations = JSON.parse(mapMatch[1]);
  
  // Fetch new associations for dead end words
  for (const word of DEAD_END_WORDS) {
    if (existingAssociations[word] && existingAssociations[word].length > 1) {
      console.log(`Skipping ${word} - already has ${existingAssociations[word].length} associations`);
      continue;
    }
    
    const associations = await fetchAssociations(word);
    if (associations.length > 0) {
      existingAssociations[word] = associations;
    }
    
    await sleep(RATE_LIMIT_DELAY);
  }
  
  // Build bidirectional associations
  console.log('Building bidirectional associations...');
  Object.entries(existingAssociations).forEach(([word, associations]) => {
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
  
  console.log(`\n✅ Successfully patched word associations!`);
  console.log(`   Words: ${wordCount}`);
  console.log(`   Total associations: ${totalAssociations}`);
}

patchDeadEnds();