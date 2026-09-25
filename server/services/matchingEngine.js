/**
 * CampusFind AI - Smart Matching & Explainable Intelligence Engine
 * 
 * Deterministic multi-factor scoring (0-100%):
 * - Category Match (20%)
 * - Item Title/Name Match (15%)
 * - Description Word Overlap (20%)
 * - Color Characteristic Match (10%)
 * - Brand Name Match (10%)
 * - Location Proximity Match (15%)
 * - Date/Time Delta Proximity Match (10%)
 */

class SmartMatchingEngine {
  /**
   * Calculate match confidence score & explainable details between a lost item and a found item
   * @param {Object} lostItem 
   * @param {Object} foundItem 
   * @returns {Object} { confidenceScore, matchLevel, reasons, differences }
   */
  static calculateMatchScore(lostItem, foundItem) {
    let totalScore = 0;
    const reasons = [];
    const differences = [];

    // 1. Category Match (20 Points)
    if (
      lostItem.category &&
      foundItem.category &&
      lostItem.category.toLowerCase().trim() === foundItem.category.toLowerCase().trim()
    ) {
      totalScore += 20;
      reasons.push(`Same item category (${foundItem.category})`);
    } else {
      differences.push(`Different categories (${lostItem.category || 'N/A'} vs ${foundItem.category || 'N/A'})`);
    }

    // 2. Title / Item Name Similarity (15 Points)
    if (lostItem.title && foundItem.title) {
      const titleLost = lostItem.title.toLowerCase().trim();
      const titleFound = foundItem.title.toLowerCase().trim();

      if (titleLost === titleFound) {
        totalScore += 15;
        reasons.push('Identical item title');
      } else if (titleLost.includes(titleFound) || titleFound.includes(titleLost)) {
        totalScore += 10;
        reasons.push('Similar item title');
      } else {
        differences.push('Item title phrasing differs');
      }
    }

    // 3. Color Match (10 Points)
    if (lostItem.color && foundItem.color) {
      if (lostItem.color.toLowerCase().trim() === foundItem.color.toLowerCase().trim()) {
        totalScore += 10;
        reasons.push(`Matching color characteristic (${foundItem.color})`);
      } else {
        differences.push(`Color variation (${lostItem.color} vs ${foundItem.color})`);
      }
    } else if (!lostItem.color || !foundItem.color) {
      differences.push('Color information incomplete');
    }

    // 4. Brand Match (10 Points)
    if (lostItem.brand && foundItem.brand) {
      if (lostItem.brand.toLowerCase().trim() === foundItem.brand.toLowerCase().trim()) {
        totalScore += 10;
        reasons.push(`Matching brand name (${foundItem.brand})`);
      } else {
        differences.push(`Brand mismatch (${lostItem.brand} vs ${foundItem.brand})`);
      }
    } else if (!lostItem.brand || !foundItem.brand) {
      differences.push('Brand details not specified');
    }

    // 5. Location Proximity (15 Points)
    if (lostItem.location && foundItem.location) {
      const locLost = lostItem.location.toLowerCase().trim();
      const locFound = foundItem.location.toLowerCase().trim();

      if (locLost === locFound || locLost.includes(locFound) || locFound.includes(locLost)) {
        totalScore += 15;
        reasons.push(`Reported in the same campus area (${foundItem.location})`);
      } else {
        differences.push(`Reported at different locations (${lostItem.location} vs ${foundItem.location})`);
      }
    }

    // 6. Date & Time Proximity (10 Points)
    if (lostItem.date && foundItem.date) {
      const lostTime = new Date(lostItem.date).getTime();
      const foundTime = new Date(foundItem.date).getTime();
      const daysDiff = Math.abs(lostTime - foundTime) / (1000 * 60 * 60 * 24);

      if (daysDiff <= 1) {
        totalScore += 10;
        reasons.push('Lost and found within 24 hours');
      } else if (daysDiff <= 3) {
        totalScore += 6;
        reasons.push('Lost and found within 3 days');
      } else {
        differences.push(`Date gap of ${Math.round(daysDiff)} days between reports`);
      }
    }

    // 7. Description Word Overlap (20 Points)
    if (lostItem.description && foundItem.description) {
      const tokenize = (str) =>
        str
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 2);

      const tokens1 = new Set(tokenize(lostItem.description));
      const tokens2 = new Set(tokenize(foundItem.description));

      let overlapCount = 0;
      tokens1.forEach((token) => {
        if (tokens2.has(token)) overlapCount++;
      });

      if (overlapCount >= 3) {
        totalScore += 20;
        reasons.push('High description keyword similarity');
      } else if (overlapCount >= 1) {
        totalScore += 10;
        reasons.push('Shared keywords in item description');
      } else {
        differences.push('Distinct description text');
      }
    }

    const confidenceScore = Math.min(totalScore, 100);

    // Match Classification
    let matchLevel = 'Low Match';
    if (confidenceScore >= 80) {
      matchLevel = 'Strong Match';
    } else if (confidenceScore >= 60) {
      matchLevel = 'Possible Match';
    }

    return {
      confidenceScore,
      matchLevel,
      reasons,
      differences
    };
  }
}

module.exports = SmartMatchingEngine;
