/**
 * CampusFind AI - Smart Matching Engine Wrapper
 * Facade wrapper linking to core MatchingService
 */

const MatchingService = require('./matchingService');

class SmartMatchingEngine {
  /**
   * Synchronous / async score calculation helper
   */
  static calculateMatchScore(lostItem, foundItem) {
    const textSim = require('../utils/textSimilarity');
    const locSim = require('../utils/locationSimilarity');
    const dateSim = require('../utils/dateSimilarity');

    const semanticScore = textSim.calculateTextSemanticScore(
      lostItem.description || '',
      foundItem.description || ''
    );

    const categoryScore = (
      lostItem.category &&
      foundItem.category &&
      lostItem.category.toLowerCase().trim() === foundItem.category.toLowerCase().trim()
    ) ? 100 : 0;

    const nameScore = textSim.calculateAttributeSimilarity(lostItem.title || '', foundItem.title || '');
    const colorScore = textSim.calculateAttributeSimilarity(lostItem.color || '', foundItem.color || '');
    const brandScore = textSim.calculateAttributeSimilarity(lostItem.brand || '', foundItem.brand || '');
    const locationScore = locSim.calculateLocationSimilarityScore(lostItem.location || '', foundItem.location || '');
    const dateScore = dateSim.calculateDateSimilarityScore(lostItem.date, foundItem.date);

    // Weighted composite
    const confidenceScore = Math.min(
      Math.round(
        semanticScore * 0.25 +
        categoryScore * 0.20 +
        nameScore * 0.15 +
        colorScore * 0.10 +
        brandScore * 0.10 +
        locationScore * 0.15 +
        dateScore * 0.05
      ),
      100
    );

    let matchLevel = 'Unlikely Match';
    if (confidenceScore >= 80) matchLevel = 'Strong Match';
    else if (confidenceScore >= 60) matchLevel = 'Possible Match';
    else if (confidenceScore >= 40) matchLevel = 'Weak Match';

    const reasons = [];
    const differences = [];

    if (categoryScore === 100) reasons.push(`Same item category (${foundItem.category})`);
    else differences.push('Different item categories');

    if (semanticScore >= 60) reasons.push(`High description semantic similarity (${semanticScore}%)`);
    else differences.push('Distinct description text');

    if (colorScore >= 80) reasons.push(`Matching color (${foundItem.color})`);
    if (brandScore >= 80) reasons.push(`Matching brand (${foundItem.brand})`);
    if (locationScore >= 70) reasons.push(`Reported in the same campus area (${foundItem.location})`);
    if (dateScore >= 80) reasons.push('Reported within close date window');

    return {
      confidenceScore,
      matchLevel,
      reasons,
      differences,
      scores: {
        semantic: semanticScore,
        category: categoryScore,
        name: nameScore,
        color: colorScore,
        brand: brandScore,
        location: locationScore,
        date: dateScore
      }
    };
  }
}

module.exports = SmartMatchingEngine;
