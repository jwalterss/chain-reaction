// Thematic word banks for the Chain Reaction game
// Each base word has a large collection of related words

export type ThematicWord = {
  word: string;
  difficulty: 'easy' | 'medium' | 'hard'; // Controls when they appear
  category: string; // Sub-category within the theme
};

export type ThematicWordBank = {
  [baseWord: string]: ThematicWord[];
};

export const thematicWordBanks: ThematicWordBank = {
  water: [
    // Basic water words (easy)
    { word: 'wet', difficulty: 'easy', category: 'state' },
    { word: 'dry', difficulty: 'easy', category: 'opposite' },
    { word: 'rain', difficulty: 'easy', category: 'weather' },
    { word: 'river', difficulty: 'easy', category: 'bodies' },
    { word: 'lake', difficulty: 'easy', category: 'bodies' },
    { word: 'ocean', difficulty: 'easy', category: 'bodies' },
    { word: 'sea', difficulty: 'easy', category: 'bodies' },
    { word: 'stream', difficulty: 'easy', category: 'bodies' },
    { word: 'pond', difficulty: 'easy', category: 'bodies' },
    { word: 'pool', difficulty: 'easy', category: 'bodies' },
    { word: 'drink', difficulty: 'easy', category: 'action' },
    { word: 'swim', difficulty: 'easy', category: 'action' },
    { word: 'splash', difficulty: 'easy', category: 'action' },
    { word: 'flow', difficulty: 'easy', category: 'action' },
    { word: 'pour', difficulty: 'easy', category: 'action' },
    { word: 'boat', difficulty: 'easy', category: 'transport' },
    { word: 'ship', difficulty: 'easy', category: 'transport' },
    { word: 'fish', difficulty: 'easy', category: 'life' },
    { word: 'wave', difficulty: 'easy', category: 'movement' },
    { word: 'tide', difficulty: 'easy', category: 'movement' },
    
    // Medium difficulty
    { word: 'current', difficulty: 'medium', category: 'movement' },
    { word: 'depth', difficulty: 'medium', category: 'measurement' },
    { word: 'surface', difficulty: 'medium', category: 'physical' },
    { word: 'liquid', difficulty: 'medium', category: 'state' },
    { word: 'moisture', difficulty: 'medium', category: 'state' },
    { word: 'steam', difficulty: 'medium', category: 'state' },
    { word: 'vapor', difficulty: 'medium', category: 'state' },
    { word: 'ice', difficulty: 'medium', category: 'state' },
    { word: 'frozen', difficulty: 'medium', category: 'state' },
    { word: 'boil', difficulty: 'medium', category: 'action' },
    { word: 'evaporate', difficulty: 'medium', category: 'action' },
    { word: 'freeze', difficulty: 'medium', category: 'action' },
    { word: 'thaw', difficulty: 'medium', category: 'action' },
    { word: 'flood', difficulty: 'medium', category: 'disaster' },
    { word: 'drought', difficulty: 'medium', category: 'disaster' },
    { word: 'tsunami', difficulty: 'medium', category: 'disaster' },
    { word: 'waterfall', difficulty: 'medium', category: 'features' },
    { word: 'rapids', difficulty: 'medium', category: 'features' },
    { word: 'whirlpool', difficulty: 'medium', category: 'features' },
    { word: 'spring', difficulty: 'medium', category: 'source' },
    { word: 'well', difficulty: 'medium', category: 'source' },
    { word: 'reservoir', difficulty: 'medium', category: 'storage' },
    { word: 'aquarium', difficulty: 'medium', category: 'container' },
    { word: 'fountain', difficulty: 'medium', category: 'features' },
    
    // Hard difficulty
    { word: 'hydration', difficulty: 'hard', category: 'biological' },
    { word: 'aquatic', difficulty: 'hard', category: 'scientific' },
    { word: 'hydraulic', difficulty: 'hard', category: 'scientific' },
    { word: 'precipitation', difficulty: 'hard', category: 'weather' },
    { word: 'condensation', difficulty: 'hard', category: 'scientific' },
    { word: 'transpiration', difficulty: 'hard', category: 'biological' },
    { word: 'osmosis', difficulty: 'hard', category: 'scientific' },
    { word: 'salinity', difficulty: 'hard', category: 'measurement' },
    { word: 'viscosity', difficulty: 'hard', category: 'measurement' },
    { word: 'turbulence', difficulty: 'hard', category: 'movement' },
    { word: 'crystalline', difficulty: 'hard', category: 'structure' },
    { word: 'molecule', difficulty: 'hard', category: 'scientific' },
    { word: 'hydrogen', difficulty: 'hard', category: 'chemistry' },
    { word: 'oxygen', difficulty: 'hard', category: 'chemistry' },
  ],

  exam: [
    // Easy
    { word: 'test', difficulty: 'easy', category: 'assessment' },
    { word: 'quiz', difficulty: 'easy', category: 'assessment' },
    { word: 'study', difficulty: 'easy', category: 'preparation' },
    { word: 'learn', difficulty: 'easy', category: 'preparation' },
    { word: 'school', difficulty: 'easy', category: 'location' },
    { word: 'student', difficulty: 'easy', category: 'people' },
    { word: 'teacher', difficulty: 'easy', category: 'people' },
    { word: 'grade', difficulty: 'easy', category: 'result' },
    { word: 'pass', difficulty: 'easy', category: 'result' },
    { word: 'fail', difficulty: 'easy', category: 'result' },
    { word: 'paper', difficulty: 'easy', category: 'format' },
    { word: 'question', difficulty: 'easy', category: 'content' },
    { word: 'answer', difficulty: 'easy', category: 'content' },
    { word: 'book', difficulty: 'easy', category: 'materials' },
    { word: 'pencil', difficulty: 'easy', category: 'tools' },
    { word: 'desk', difficulty: 'easy', category: 'furniture' },
    { word: 'classroom', difficulty: 'easy', category: 'location' },
    { word: 'homework', difficulty: 'easy', category: 'preparation' },
    { word: 'reading', difficulty: 'easy', category: 'activity' },
    { word: 'writing', difficulty: 'easy', category: 'activity' },
    
    // Medium
    { word: 'assessment', difficulty: 'medium', category: 'evaluation' },
    { word: 'evaluation', difficulty: 'medium', category: 'evaluation' },
    { word: 'knowledge', difficulty: 'medium', category: 'concept' },
    { word: 'understanding', difficulty: 'medium', category: 'concept' },
    { word: 'memory', difficulty: 'medium', category: 'cognitive' },
    { word: 'concentration', difficulty: 'medium', category: 'cognitive' },
    { word: 'preparation', difficulty: 'medium', category: 'process' },
    { word: 'revision', difficulty: 'medium', category: 'process' },
    { word: 'practice', difficulty: 'medium', category: 'process' },
    { word: 'performance', difficulty: 'medium', category: 'result' },
    { word: 'achievement', difficulty: 'medium', category: 'result' },
    { word: 'certificate', difficulty: 'medium', category: 'credential' },
    { word: 'diploma', difficulty: 'medium', category: 'credential' },
    { word: 'degree', difficulty: 'medium', category: 'credential' },
    { word: 'qualification', difficulty: 'medium', category: 'credential' },
    { word: 'curriculum', difficulty: 'medium', category: 'academic' },
    { word: 'syllabus', difficulty: 'medium', category: 'academic' },
    { word: 'semester', difficulty: 'medium', category: 'time' },
    { word: 'academic', difficulty: 'medium', category: 'concept' },
    { word: 'scholarship', difficulty: 'medium', category: 'achievement' },
    
    // Hard
    { word: 'comprehensive', difficulty: 'hard', category: 'type' },
    { word: 'standardized', difficulty: 'hard', category: 'type' },
    { word: 'diagnostic', difficulty: 'hard', category: 'type' },
    { word: 'formative', difficulty: 'hard', category: 'type' },
    { word: 'summative', difficulty: 'hard', category: 'type' },
    { word: 'psychometric', difficulty: 'hard', category: 'measurement' },
    { word: 'validity', difficulty: 'hard', category: 'measurement' },
    { word: 'reliability', difficulty: 'hard', category: 'measurement' },
    { word: 'criterion', difficulty: 'hard', category: 'standard' },
    { word: 'rubric', difficulty: 'hard', category: 'evaluation' },
    { word: 'proctored', difficulty: 'hard', category: 'supervision' },
    { word: 'invigilation', difficulty: 'hard', category: 'supervision' },
  ],

  music: [
    // Easy
    { word: 'song', difficulty: 'easy', category: 'composition' },
    { word: 'sing', difficulty: 'easy', category: 'action' },
    { word: 'play', difficulty: 'easy', category: 'action' },
    { word: 'listen', difficulty: 'easy', category: 'action' },
    { word: 'sound', difficulty: 'easy', category: 'audio' },
    { word: 'loud', difficulty: 'easy', category: 'volume' },
    { word: 'quiet', difficulty: 'easy', category: 'volume' },
    { word: 'piano', difficulty: 'easy', category: 'instrument' },
    { word: 'guitar', difficulty: 'easy', category: 'instrument' },
    { word: 'drums', difficulty: 'easy', category: 'instrument' },
    { word: 'violin', difficulty: 'easy', category: 'instrument' },
    { word: 'band', difficulty: 'easy', category: 'group' },
    { word: 'singer', difficulty: 'easy', category: 'person' },
    { word: 'artist', difficulty: 'easy', category: 'person' },
    { word: 'concert', difficulty: 'easy', category: 'event' },
    { word: 'dance', difficulty: 'easy', category: 'movement' },
    { word: 'rhythm', difficulty: 'easy', category: 'element' },
    { word: 'beat', difficulty: 'easy', category: 'element' },
    { word: 'melody', difficulty: 'easy', category: 'element' },
    { word: 'note', difficulty: 'easy', category: 'element' },
    
    // Medium
    { word: 'harmony', difficulty: 'medium', category: 'element' },
    { word: 'chord', difficulty: 'medium', category: 'element' },
    { word: 'scale', difficulty: 'medium', category: 'theory' },
    { word: 'tempo', difficulty: 'medium', category: 'timing' },
    { word: 'pitch', difficulty: 'medium', category: 'sound' },
    { word: 'octave', difficulty: 'medium', category: 'theory' },
    { word: 'symphony', difficulty: 'medium', category: 'composition' },
    { word: 'orchestra', difficulty: 'medium', category: 'group' },
    { word: 'conductor', difficulty: 'medium', category: 'person' },
    { word: 'composer', difficulty: 'medium', category: 'person' },
    { word: 'recording', difficulty: 'medium', category: 'production' },
    { word: 'studio', difficulty: 'medium', category: 'location' },
    { word: 'amplifier', difficulty: 'medium', category: 'equipment' },
    { word: 'microphone', difficulty: 'medium', category: 'equipment' },
    { word: 'acoustic', difficulty: 'medium', category: 'type' },
    { word: 'electric', difficulty: 'medium', category: 'type' },
    { word: 'classical', difficulty: 'medium', category: 'genre' },
    { word: 'jazz', difficulty: 'medium', category: 'genre' },
    { word: 'rock', difficulty: 'medium', category: 'genre' },
    { word: 'blues', difficulty: 'medium', category: 'genre' },
    
    // Hard
    { word: 'counterpoint', difficulty: 'hard', category: 'theory' },
    { word: 'modulation', difficulty: 'hard', category: 'theory' },
    { word: 'improvisation', difficulty: 'hard', category: 'technique' },
    { word: 'virtuosity', difficulty: 'hard', category: 'skill' },
    { word: 'crescendo', difficulty: 'hard', category: 'dynamics' },
    { word: 'diminuendo', difficulty: 'hard', category: 'dynamics' },
    { word: 'staccato', difficulty: 'hard', category: 'articulation' },
    { word: 'legato', difficulty: 'hard', category: 'articulation' },
    { word: 'syncopation', difficulty: 'hard', category: 'rhythm' },
    { word: 'polyrhythm', difficulty: 'hard', category: 'rhythm' },
    { word: 'chromatic', difficulty: 'hard', category: 'theory' },
    { word: 'diatonic', difficulty: 'hard', category: 'theory' },
  ],

  // Add more thematic word banks...
  food: [
    // Easy - Basic foods and actions
    { word: 'eat', difficulty: 'easy', category: 'action' },
    { word: 'cook', difficulty: 'easy', category: 'action' },
    { word: 'bite', difficulty: 'easy', category: 'action' },
    { word: 'chew', difficulty: 'easy', category: 'action' },
    { word: 'drink', difficulty: 'easy', category: 'action' },
    { word: 'taste', difficulty: 'easy', category: 'sense' },
    { word: 'smell', difficulty: 'easy', category: 'sense' },
    { word: 'hunger', difficulty: 'easy', category: 'feeling' },
    { word: 'thirst', difficulty: 'easy', category: 'feeling' },
    
    // Flavors
    { word: 'sweet', difficulty: 'easy', category: 'flavor' },
    { word: 'salty', difficulty: 'easy', category: 'flavor' },
    { word: 'bitter', difficulty: 'easy', category: 'flavor' },
    { word: 'sour', difficulty: 'easy', category: 'flavor' },
    { word: 'spicy', difficulty: 'easy', category: 'flavor' },
    { word: 'hot', difficulty: 'easy', category: 'temperature' },
    { word: 'cold', difficulty: 'easy', category: 'temperature' },
    { word: 'warm', difficulty: 'easy', category: 'temperature' },
    
    // Basic foods
    { word: 'bread', difficulty: 'easy', category: 'carbs' },
    { word: 'rice', difficulty: 'easy', category: 'carbs' },
    { word: 'pasta', difficulty: 'easy', category: 'carbs' },
    { word: 'pizza', difficulty: 'easy', category: 'meal' },
    { word: 'soup', difficulty: 'easy', category: 'meal' },
    { word: 'salad', difficulty: 'easy', category: 'meal' },
    { word: 'sandwich', difficulty: 'easy', category: 'meal' },
    
    // Proteins
    { word: 'meat', difficulty: 'easy', category: 'protein' },
    { word: 'chicken', difficulty: 'easy', category: 'meat' },
    { word: 'beef', difficulty: 'easy', category: 'meat' },
    { word: 'pork', difficulty: 'easy', category: 'meat' },
    { word: 'fish', difficulty: 'easy', category: 'protein' },
    { word: 'egg', difficulty: 'easy', category: 'protein' },
    { word: 'beans', difficulty: 'easy', category: 'protein' },
    
    // Fruits
    { word: 'fruit', difficulty: 'easy', category: 'plant' },
    { word: 'apple', difficulty: 'easy', category: 'fruit' },
    { word: 'banana', difficulty: 'easy', category: 'fruit' },
    { word: 'orange', difficulty: 'easy', category: 'fruit' },
    { word: 'grape', difficulty: 'easy', category: 'fruit' },
    { word: 'berry', difficulty: 'easy', category: 'fruit' },
    { word: 'lemon', difficulty: 'easy', category: 'fruit' },
    { word: 'peach', difficulty: 'easy', category: 'fruit' },
    
    // Vegetables
    { word: 'vegetable', difficulty: 'easy', category: 'plant' },
    { word: 'carrot', difficulty: 'easy', category: 'vegetable' },
    { word: 'potato', difficulty: 'easy', category: 'vegetable' },
    { word: 'tomato', difficulty: 'easy', category: 'vegetable' },
    { word: 'onion', difficulty: 'easy', category: 'vegetable' },
    { word: 'lettuce', difficulty: 'easy', category: 'vegetable' },
    { word: 'corn', difficulty: 'easy', category: 'vegetable' },
    { word: 'pepper', difficulty: 'easy', category: 'vegetable' },
    
    // Dairy
    { word: 'milk', difficulty: 'easy', category: 'dairy' },
    { word: 'cheese', difficulty: 'easy', category: 'dairy' },
    { word: 'butter', difficulty: 'easy', category: 'dairy' },
    { word: 'cream', difficulty: 'easy', category: 'dairy' },
    { word: 'yogurt', difficulty: 'easy', category: 'dairy' },
    
    // Beverages
    { word: 'water', difficulty: 'easy', category: 'beverage' },
    { word: 'juice', difficulty: 'easy', category: 'beverage' },
    { word: 'coffee', difficulty: 'easy', category: 'beverage' },
    { word: 'tea', difficulty: 'easy', category: 'beverage' },
    { word: 'soda', difficulty: 'easy', category: 'beverage' },
    
    // Desserts
    { word: 'cake', difficulty: 'easy', category: 'dessert' },
    { word: 'cookie', difficulty: 'easy', category: 'dessert' },
    { word: 'candy', difficulty: 'easy', category: 'dessert' },
    { word: 'ice', difficulty: 'easy', category: 'dessert' },
    { word: 'pie', difficulty: 'easy', category: 'dessert' },
    
    // Kitchen items
    { word: 'plate', difficulty: 'easy', category: 'utensil' },
    { word: 'bowl', difficulty: 'easy', category: 'utensil' },
    { word: 'cup', difficulty: 'easy', category: 'utensil' },
    { word: 'fork', difficulty: 'easy', category: 'utensil' },
    { word: 'knife', difficulty: 'easy', category: 'utensil' },
    { word: 'spoon', difficulty: 'easy', category: 'utensil' },
    
    // Medium difficulty
    { word: 'recipe', difficulty: 'medium', category: 'cooking' },
    { word: 'ingredient', difficulty: 'medium', category: 'cooking' },
    { word: 'seasoning', difficulty: 'medium', category: 'spice' },
    { word: 'marinade', difficulty: 'medium', category: 'cooking' },
    { word: 'roast', difficulty: 'medium', category: 'cooking' },
    { word: 'bake', difficulty: 'medium', category: 'cooking' },
    { word: 'fry', difficulty: 'medium', category: 'cooking' },
    { word: 'grill', difficulty: 'medium', category: 'cooking' },
    { word: 'steam', difficulty: 'medium', category: 'cooking' },
    { word: 'boil', difficulty: 'medium', category: 'cooking' },
    { word: 'simmer', difficulty: 'medium', category: 'cooking' },
    { word: 'saute', difficulty: 'medium', category: 'cooking' },
    
    // More complex foods
    { word: 'steak', difficulty: 'medium', category: 'meat' },
    { word: 'salmon', difficulty: 'medium', category: 'fish' },
    { word: 'tuna', difficulty: 'medium', category: 'fish' },
    { word: 'shrimp', difficulty: 'medium', category: 'seafood' },
    { word: 'lobster', difficulty: 'medium', category: 'seafood' },
    { word: 'crab', difficulty: 'medium', category: 'seafood' },
    { word: 'bacon', difficulty: 'medium', category: 'meat' },
    { word: 'turkey', difficulty: 'medium', category: 'meat' },
    { word: 'lamb', difficulty: 'medium', category: 'meat' },
    
    // International foods
    { word: 'sushi', difficulty: 'medium', category: 'international' },
    { word: 'taco', difficulty: 'medium', category: 'international' },
    { word: 'curry', difficulty: 'medium', category: 'international' },
    { word: 'noodle', difficulty: 'medium', category: 'international' },
    { word: 'dumpling', difficulty: 'medium', category: 'international' },
    { word: 'burrito', difficulty: 'medium', category: 'international' },
    
    // Spices and herbs
    { word: 'garlic', difficulty: 'medium', category: 'spice' },
    { word: 'ginger', difficulty: 'medium', category: 'spice' },
    { word: 'basil', difficulty: 'medium', category: 'herb' },
    { word: 'oregano', difficulty: 'medium', category: 'herb' },
    { word: 'thyme', difficulty: 'medium', category: 'herb' },
    { word: 'rosemary', difficulty: 'medium', category: 'herb' },
    { word: 'cilantro', difficulty: 'medium', category: 'herb' },
    { word: 'parsley', difficulty: 'medium', category: 'herb' },
    
    // More fruits and vegetables
    { word: 'avocado', difficulty: 'medium', category: 'fruit' },
    { word: 'mango', difficulty: 'medium', category: 'fruit' },
    { word: 'pineapple', difficulty: 'medium', category: 'fruit' },
    { word: 'strawberry', difficulty: 'medium', category: 'fruit' },
    { word: 'blueberry', difficulty: 'medium', category: 'fruit' },
    { word: 'raspberry', difficulty: 'medium', category: 'fruit' },
    { word: 'broccoli', difficulty: 'medium', category: 'vegetable' },
    { word: 'spinach', difficulty: 'medium', category: 'vegetable' },
    { word: 'cucumber', difficulty: 'medium', category: 'vegetable' },
    { word: 'mushroom', difficulty: 'medium', category: 'vegetable' },
    { word: 'zucchini', difficulty: 'medium', category: 'vegetable' },
    { word: 'eggplant', difficulty: 'medium', category: 'vegetable' },
    
    // Kitchen equipment
    { word: 'oven', difficulty: 'medium', category: 'equipment' },
    { word: 'stove', difficulty: 'medium', category: 'equipment' },
    { word: 'microwave', difficulty: 'medium', category: 'equipment' },
    { word: 'blender', difficulty: 'medium', category: 'equipment' },
    { word: 'mixer', difficulty: 'medium', category: 'equipment' },
    { word: 'grill', difficulty: 'medium', category: 'equipment' },
    
    // Hard difficulty - advanced culinary terms
    { word: 'gastronomy', difficulty: 'hard', category: 'culinary' },
    { word: 'umami', difficulty: 'hard', category: 'flavor' },
    { word: 'fermentation', difficulty: 'hard', category: 'process' },
    { word: 'caramelization', difficulty: 'hard', category: 'process' },
    { word: 'emulsification', difficulty: 'hard', category: 'process' },
    { word: 'molecular', difficulty: 'hard', category: 'modern' },
    { word: 'spherification', difficulty: 'hard', category: 'modern' },
    { word: 'sous', difficulty: 'hard', category: 'technique' },
    { word: 'confit', difficulty: 'hard', category: 'technique' },
    { word: 'brunoise', difficulty: 'hard', category: 'technique' },
    { word: 'julienne', difficulty: 'hard', category: 'technique' },
    { word: 'chiffonade', difficulty: 'hard', category: 'technique' },
    { word: 'mirepoix', difficulty: 'hard', category: 'technique' },
    { word: 'roux', difficulty: 'hard', category: 'technique' },
    { word: 'reduction', difficulty: 'hard', category: 'technique' },
    { word: 'clarification', difficulty: 'hard', category: 'technique' },
    { word: 'infusion', difficulty: 'hard', category: 'technique' },
    { word: 'maceration', difficulty: 'hard', category: 'technique' },
    { word: 'tempering', difficulty: 'hard', category: 'technique' },
    { word: 'braising', difficulty: 'hard', category: 'technique' },
    { word: 'poaching', difficulty: 'hard', category: 'technique' },
    { word: 'blanching', difficulty: 'hard', category: 'technique' },
    { word: 'deglazing', difficulty: 'hard', category: 'technique' },
    { word: 'flambeing', difficulty: 'hard', category: 'technique' },
    
    // Advanced ingredients
    { word: 'truffle', difficulty: 'hard', category: 'luxury' },
    { word: 'caviar', difficulty: 'hard', category: 'luxury' },
    { word: 'foie', difficulty: 'hard', category: 'luxury' },
    { word: 'wagyu', difficulty: 'hard', category: 'luxury' },
    { word: 'saffron', difficulty: 'hard', category: 'spice' },
    { word: 'cardamom', difficulty: 'hard', category: 'spice' },
    { word: 'turmeric', difficulty: 'hard', category: 'spice' },
    { word: 'cumin', difficulty: 'hard', category: 'spice' },
    { word: 'coriander', difficulty: 'hard', category: 'spice' },
    { word: 'fennel', difficulty: 'hard', category: 'spice' },
    
    // Food science
    { word: 'gluten', difficulty: 'hard', category: 'science' },
    { word: 'protein', difficulty: 'hard', category: 'science' },
    { word: 'carbohydrate', difficulty: 'hard', category: 'science' },
    { word: 'antioxidant', difficulty: 'hard', category: 'science' },
    { word: 'enzyme', difficulty: 'hard', category: 'science' },
    { word: 'amino', difficulty: 'hard', category: 'science' },
    { word: 'vitamin', difficulty: 'hard', category: 'nutrition' },
    { word: 'mineral', difficulty: 'hard', category: 'nutrition' },
    { word: 'calorie', difficulty: 'hard', category: 'nutrition' },
    { word: 'metabolism', difficulty: 'hard', category: 'nutrition' }
  ],

  family: [
    { word: 'mother', difficulty: 'easy', category: 'parent' },
    { word: 'father', difficulty: 'easy', category: 'parent' },
    { word: 'child', difficulty: 'easy', category: 'offspring' },
    { word: 'son', difficulty: 'easy', category: 'offspring' },
    { word: 'daughter', difficulty: 'easy', category: 'offspring' },
    { word: 'brother', difficulty: 'easy', category: 'sibling' },
    { word: 'sister', difficulty: 'easy', category: 'sibling' },
    { word: 'grandma', difficulty: 'easy', category: 'grandparent' },
    { word: 'grandpa', difficulty: 'easy', category: 'grandparent' },
    { word: 'uncle', difficulty: 'easy', category: 'extended' },
    { word: 'aunt', difficulty: 'easy', category: 'extended' },
    { word: 'cousin', difficulty: 'easy', category: 'extended' },
    { word: 'home', difficulty: 'easy', category: 'place' },
    { word: 'house', difficulty: 'easy', category: 'place' },
    { word: 'love', difficulty: 'easy', category: 'emotion' },
    { word: 'care', difficulty: 'easy', category: 'emotion' },
    { word: 'together', difficulty: 'easy', category: 'unity' },
    { word: 'reunion', difficulty: 'medium', category: 'event' },
    { word: 'tradition', difficulty: 'medium', category: 'culture' },
    { word: 'heritage', difficulty: 'medium', category: 'culture' },
    // ... more family words
  ]
};

// Helper function to get words for a base word at progressive difficulty
export function getThematicWords(baseWord: string, chainLength: number, usedWords: string[]): ThematicWord[] {
  const wordBank = thematicWordBanks[baseWord.toLowerCase()];
  if (!wordBank) return [];

  // Progressive difficulty based on chain length
  const availableDifficulties: ('easy' | 'medium' | 'hard')[] = [
    'easy',
    ...(chainLength >= 3 ? ['medium'] as const : []),
    ...(chainLength >= 6 ? ['hard'] as const : [])
  ];

  // Filter out used words and select by difficulty
  const availableWords = wordBank.filter(
    thematicWord => 
      !usedWords.includes(thematicWord.word) && 
      availableDifficulties.includes(thematicWord.difficulty)
  );

  return availableWords;
}

// Get a diverse selection of words for the letter grid
export function getWordsForGrid(baseWord: string, chainLength: number, usedWords: string[], count: number = 15): string[] {
  const thematicWords = getThematicWords(baseWord, chainLength, usedWords);
  
  // Group by category for diversity
  const categories = new Map<string, ThematicWord[]>();
  thematicWords.forEach(word => {
    if (!categories.has(word.category)) {
      categories.set(word.category, []);
    }
    categories.get(word.category)!.push(word);
  });

  // Select words from different categories for variety
  const selectedWords: string[] = [];
  const categoryKeys = Array.from(categories.keys());
  
  let categoryIndex = 0;
  while (selectedWords.length < count && selectedWords.length < thematicWords.length) {
    const category = categoryKeys[categoryIndex % categoryKeys.length];
    const wordsInCategory = categories.get(category)!;
    
    if (wordsInCategory.length > 0) {
      const word = wordsInCategory.shift()!; // Take first word from category
      selectedWords.push(word.word);
    }
    
    categoryIndex++;
  }

  return selectedWords;
}

// Check if a word is valid for the given base word
export function isValidThematicWord(baseWord: string, targetWord: string): boolean {
  const wordBank = thematicWordBanks[baseWord.toLowerCase()];
  if (!wordBank) return false;
  
  return wordBank.some(thematicWord => thematicWord.word.toLowerCase() === targetWord.toLowerCase());
}