#!/usr/bin/env node

/**
 * Patch script to add associations for medical/scientific terms creating dead ends
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPANDED_FILE = path.join(__dirname, '..', 'src', 'data', 'expandedWordAssociations.ts');
const RATE_LIMIT_DELAY = 150;
const MAX_ASSOCIATIONS_PER_WORD = 15;
const MIN_ASSOCIATION_SCORE = 200; // Lower threshold for medical terms

// Medical/scientific terms that might be dead ends
const MEDICAL_TERMS = [
  'dermal', 'epidermal', 'cutaneous', 'dermatology', 'medical', 'clinical', 'tissue',
  'cellular', 'membrane', 'organ', 'anatomy', 'biology', 'physician', 'doctor',
  'treatment', 'therapy', 'medicine', 'health', 'disease', 'condition', 'syndrome',
  'diagnosis', 'symptom', 'infection', 'inflammation', 'allergy', 'allergic',
  'rash', 'eczema', 'psoriasis', 'acne', 'blemish', 'pore', 'follicle',
  'sebaceous', 'sweat', 'gland', 'hormone', 'cortisol', 'stress', 'immune'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchAssociations(word) {
  try {
    console.log(`Fetching associations for: ${word}`);
    
    // Try multiple endpoints for better coverage
    const endpoints = [
      `https://api.datamuse.com/words?rel_trg=${encodeURIComponent(word)}&max=${MAX_ASSOCIATIONS_PER_WORD}`,
      `https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=${MAX_ASSOCIATIONS_PER_WORD}`,
      `https://api.datamuse.com/words?rel_jjb=${encodeURIComponent(word)}&max=${MAX_ASSOCIATIONS_PER_WORD}`
    ];
    
    const allAssociations = new Set();
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          data
            .filter(item => item.score >= MIN_ASSOCIATION_SCORE && item.word.length >= 3 && item.word !== word)
            .forEach(item => {
              allAssociations.add(JSON.stringify({
                word: item.word.toLowerCase(),
                rarity: Math.min(0.9, Math.max(0.1, 1 - (item.score / 8000))), // Adjusted for medical terms
                strength: Math.min(0.9, Math.max(0.3, item.score / 8000))
              }));
            });
        }
        await sleep(50); // Short delay between endpoint calls
      } catch (e) {
        console.warn(`Failed endpoint for ${word}:`, e.message);
      }
    }
    
    const associations = Array.from(allAssociations)
      .map(str => JSON.parse(str))
      .slice(0, MAX_ASSOCIATIONS_PER_WORD);
    
    console.log(`  Found ${associations.length} associations`);
    return associations;
    
  } catch (error) {
    console.error(`Error fetching associations for "${word}":`, error.message);
    return [];
  }
}

async function patchMedicalTerms() {
  console.log('Patching medical/scientific terms...');
  
  // Read current file
  const fileContent = fs.readFileSync(EXPANDED_FILE, 'utf8');
  
  // Extract the existing associations
  const mapMatch = fileContent.match(/export const baseWordAssociations: WordAssociationsMap = ({[\s\S]*?});/);
  if (!mapMatch) {
    console.error('Could not find baseWordAssociations in file');
    return;
  }
  
  const existingAssociations = JSON.parse(mapMatch[1]);
  
  // Fetch new associations for medical terms
  for (const word of MEDICAL_TERMS) {
    if (existingAssociations[word] && existingAssociations[word].length > 2) {
      console.log(`Skipping ${word} - already has ${existingAssociations[word].length} associations`);
      continue;
    }
    
    const associations = await fetchAssociations(word);
    if (associations.length > 0) {
      // If word already exists, merge with existing associations
      if (existingAssociations[word]) {
        const existingWords = new Set(existingAssociations[word].map(a => a.word));
        const newAssociations = associations.filter(a => !existingWords.has(a.word));
        existingAssociations[word] = [...existingAssociations[word], ...newAssociations];
      } else {
        existingAssociations[word] = associations;
      }
    }
    
    await sleep(RATE_LIMIT_DELAY);
  }
  
  // Build bidirectional associations for new words
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
  
  console.log(`\n✅ Successfully patched medical terms!`);
  console.log(`   Words: ${wordCount}`);
  console.log(`   Total associations: ${totalAssociations}`);
}

patchMedicalTerms();