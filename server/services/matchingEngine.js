/**
 * CampusFind AI - Smart Matching Engine Service
 * 
 * Computes attribute similarity scores (0-100%) and generates explainable reasons:
 * - Category matching (Weight: 25%)
 * - Text/Description word overlap & keyword similarity (Weight: 25%)
 * - Location proximity match (Weight: 20%)
 * - Date/Time delta proximity (Weight: 15%)
 * - Color & Brand characteristics (Weight: 15%)
 */

class SmartMatchingEngine {
  /**
   * Calculate match confidence score between a lost item and a found item
   * @param {Object} lostItem 
   * @param {Object} foundItem 
   * @returns {Object} { confidenceScore: number, reasons: Array<string> }
   */
  static calculateMatchScore(lostItem, foundItem) {
    let totalScore = 0;
    const reasons = [];

    // 1. Category Match (25 Points)
    if (
      lostItem.category &&
      foundItem.category &&
      lostItem.category.toLowerCase().trim() === foundItem.category.toLowerCase().trim()
    ) {
      totalScore += 25;
      reasons.push(`Exact category match (${foundItem.category})`);
    }

    // 2. Color Match (10 Points)
    if (
      lostItem.color &&
      foundItem.color &&
      lostItem.color.toLowerCase().trim() === foundItem.color.toLowerCase().trim()
    ) {
      totalScore += 10;
      reasons.push(`Matching color characteristic (${foundItem.color})`);
    }

    // 3. Brand Match (10 Points)
    if (
      lostItem.brand &&
      foundItem.brand &&
      lostItem.brand.toLowerCase().trim() === foundItem.brand.toLowerCase().trim()
    ) {
      totalScore += 10;
      reasons.push(`Matching brand name (${foundItem.brand})`);
    }

    // 4. Location Proximity (20 Points)
    if (lostItem.location && foundItem.location) {
      const locLost = lostItem.location.toLowerCase().trim();
      const locFound = foundItem.location.toLowerCase().trim();

      if (locLost === locFound || locLost.includes(locFound) || locFound.includes(locLost)) {
        totalScore += 20;
        reasons.push(`Reported in the same campus area (${foundItem.location})`);
      }
    }

    // 5. Date & Time Proximity (15 Points)
    if (lostItem.date && foundItem.date) {
      const lostTime = new Date(lostItem.date).getTime();
      const foundTime = new Date(foundItem.date).getTime();
      const daysDiff = Math.abs(lostTime - foundTime) / (1000 * 60 * 60 * 24);

      if (daysDiff <= 1) {
        totalScore += 15;
        reasons.push('Lost and found within a 24-hour timeframe');
      } else if (daysDiff <= 3) {
        totalScore += 8;
        reasons.push('Lost and found within a 3-day timeframe');
      }
    }

    // 6. Description Text Overlap (20 Points)
    if (lostItem.description && foundItem.description) {
      const tokenize = (str) =>
        str
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 2);

      const tokens1 = new Set(tokenize(lostItem.description + ' ' + lostItem.title));
      const tokens2 = new Set(tokenize(foundItem.description + ' ' + foundItem.title));

      let overlapCount = 0;
      tokens1.forEach((token) => {
        if (tokens2.has(token)) overlapCount++;
      });

      if (overlapCount >= 3) {
        totalScore += 20;
        reasons.push('High description keyword similarity detected');
      } else if (overlapCount >= 1) {
        totalScore += 10;
        reasons.push('Shared key terms detected in item description');
      }
    }

    const confidenceScore = Math.min(totalScore, 100);

    return {
      confidenceScore,
      reasons
    };
  }
}

module.exports = SmartMatchingEngine;
