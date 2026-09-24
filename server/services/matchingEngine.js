/**
 * CampusFind AI - Smart Matching Engine Service (Blueprint)
 * 
 * Future implementation will evaluate similarity across multiple weighted vectors:
 * - Category matching (Weight: 25%)
 * - Text/Description similarity (TF-IDF / Embedding vector distance) (Weight: 25%)
 * - Location proximity (Geo-coordinates / Building taxonomy) (Weight: 15%)
 * - Date/Time delta proximity (Weight: 15%)
 * - Physical attributes (Color, Brand, Marks) (Weight: 20%)
 */

class SmartMatchingEngine {
  /**
   * Calculate match confidence score between a lost item and a found item
   * @param {Object} lostItem 
   * @param {Object} foundItem 
   * @returns {Object} { score: number, reasons: Array<string> }
   */
  static calculateMatchScore(lostItem, foundItem) {
    let totalScore = 0;
    const reasons = [];

    // 1. Category Match
    if (lostItem.category.toLowerCase() === foundItem.category.toLowerCase()) {
      totalScore += 25;
      reasons.push('Same item category');
    }

    // 2. Color Similarity
    if (lostItem.color && foundItem.color && lostItem.color.toLowerCase() === foundItem.color.toLowerCase()) {
      totalScore += 15;
      reasons.push(`Matching ${foundItem.color} color characteristic`);
    }

    // 3. Location Proximity
    if (lostItem.location && foundItem.location && lostItem.location.toLowerCase() === foundItem.location.toLowerCase()) {
      totalScore += 20;
      reasons.push(`Reported in the same campus area (${foundItem.location})`);
    }

    // 4. Date Proximity
    if (lostItem.date && foundItem.date) {
      const daysDiff = Math.abs(new Date(lostItem.date) - new Date(foundItem.date)) / (1000 * 60 * 60 * 24);
      if (daysDiff <= 1) {
        totalScore += 20;
        reasons.push('Lost and found within a 24-hour timeframe');
      } else if (daysDiff <= 3) {
        totalScore += 10;
        reasons.push('Lost and found within a 3-day timeframe');
      }
    }

    // 5. Brand Match
    if (lostItem.brand && foundItem.brand && lostItem.brand.toLowerCase() === foundItem.brand.toLowerCase()) {
      totalScore += 20;
      reasons.push(`Matching brand: ${foundItem.brand}`);
    }

    return {
      confidenceScore: Math.min(totalScore, 100),
      reasons
    };
  }
}

module.exports = SmartMatchingEngine;
