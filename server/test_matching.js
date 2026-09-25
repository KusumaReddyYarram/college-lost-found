require('dotenv').config();
const mongoose = require('mongoose');
const MatchingService = require('./services/matchingService');
const Item = require('./models/Item');
const Match = require('./models/Match');

async function testMatchingSystem() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusfind';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to DB successfully.');

    // Sample Test 1: Strong Match (Wallet near library)
    const lostItem1 = {
      type: 'lost',
      title: 'Black leather wallet',
      category: 'Wallets & Identification',
      description: 'Black leather wallet lost near the library. It has a small college logo and contains some cards.',
      location: 'Central Library',
      date: new Date(),
      color: 'Black',
      brand: 'Titan',
      identifyingMarks: 'Small college emblem logo stitched on side'
    };

    const foundItem1 = {
      type: 'found',
      title: 'Dark black leather purse wallet',
      category: 'Wallets & Identification',
      description: 'Found a dark black leather purse/wallet close to the library. There is a university logo on it.',
      location: 'Near Library entrance',
      date: new Date(Date.now() - 12 * 3600 * 1000), // 12 hours ago
      color: 'Black',
      brand: 'Titan',
      identifyingMarks: 'Stitched logo on bottom'
    };

    console.log('\n--- Evaluating Test 1 (Semantic Wallet Match) ---');
    const result1 = await MatchingService.evaluateMatchPair(lostItem1, foundItem1);
    console.log('Test 1 Final Score:', result1.finalScore, '%');
    console.log('Test 1 Match Level:', result1.matchLevel);
    console.log('Test 1 Factor Scores:', result1.scores);
    console.log('Test 1 Reasons:', result1.reasons);
    console.log('Test 1 Differences:', result1.differences);

    // Sample Test 2: Similar Wording (Phone vs Smartphone)
    const lostItem2 = {
      type: 'lost',
      title: 'Black smartphone',
      category: 'Electronics & Gadgets',
      description: 'Black Samsung Galaxy mobile phone with cracked screen protector',
      location: 'Main Canteen',
      date: new Date()
    };

    const foundItem2 = {
      type: 'found',
      title: 'Dark mobile phone',
      category: 'Electronics & Gadgets',
      description: 'Found a dark black cell phone with screen protector near cafeteria food court',
      location: 'Canteen Cafeteria',
      date: new Date()
    };

    console.log('\n--- Evaluating Test 2 (Phone vs Smartphone Semantic Match) ---');
    const result2 = await MatchingService.evaluateMatchPair(lostItem2, foundItem2);
    console.log('Test 2 Final Score:', result2.finalScore, '%');
    console.log('Test 2 Match Level:', result2.matchLevel);
    console.log('Test 2 Factor Scores:', result2.scores);
    console.log('Test 2 Reasons:', result2.reasons);

    // Sample Test 3: Unrelated items (Water bottle vs Laptop bag)
    const lostItem3 = {
      type: 'lost',
      title: 'Blue water bottle',
      category: 'Water Bottles & Containers',
      description: 'Stainless steel blue water flask',
      location: 'Sports Ground',
      date: new Date()
    };

    const foundItem3 = {
      type: 'found',
      title: 'Red laptop bag',
      category: 'Bags & Accessories',
      description: 'Red Dell laptop bag with charger',
      location: 'Auditorium',
      date: new Date()
    };

    console.log('\n--- Evaluating Test 3 (Unrelated Items) ---');
    const result3 = await MatchingService.evaluateMatchPair(lostItem3, foundItem3);
    console.log('Test 3 Final Score:', result3.finalScore, '%');
    console.log('Test 3 Match Level:', result3.matchLevel);

    process.exit(0);
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

testMatchingSystem();
