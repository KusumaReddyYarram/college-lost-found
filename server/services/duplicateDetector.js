const Item = require('../models/Item');
const SmartMatchingEngine = require('./matchingEngine');

/**
 * Duplicate Report Detection Service
 * Prevents users from submitting duplicate reports for the same item.
 */
class DuplicateDetector {
  /**
   * Check if a highly similar item report already exists in MongoDB Atlas
   * @param {Object} newItemData 
   * @returns {Object} { isDuplicate: boolean, similarItem: Object|null, similarityScore: number }
   */
  static async checkDuplicate(newItemData) {
    try {
      const { type, title, category, location, color, brand } = newItemData;

      // Find active items of the SAME type created recently
      const recentItems = await Item.find({
        type,
        status: { $ne: 'closed' }
      }).limit(50);

      for (const item of recentItems) {
        const { confidenceScore } = SmartMatchingEngine.calculateMatchScore(newItemData, item);
        
        // If similarity is 75% or higher, flag as potential duplicate
        if (confidenceScore >= 75) {
          return {
            isDuplicate: true,
            similarItem: {
              _id: item._id,
              title: item.title,
              category: item.category,
              location: item.location,
              createdAt: item.createdAt
            },
            similarityScore: confidenceScore
          };
        }
      }

      return {
        isDuplicate: false,
        similarItem: null,
        similarityScore: 0
      };
    } catch (error) {
      console.error('DuplicateDetector Error:', error.message);
      return { isDuplicate: false, similarItem: null, similarityScore: 0 };
    }
  }
}

module.exports = DuplicateDetector;
