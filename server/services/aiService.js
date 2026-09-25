/**
 * CampusFind AI - Service Layer for Future AI Integration
 * 
 * Provides clean architectural interfaces for future LLM / Vision models:
 * - Smart Category Auto-Classification
 * - Report Description Enhancement
 * - Semantic Natural Language Query Parsing
 */

class AIService {
  /**
   * Suggest category from title & description text
   * @param {string} text 
   * @returns {string} Suggested category
   */
  static suggestCategory(text) {
    const lower = (text || '').toLowerCase();
    if (/phone|iphone|samsung|galaxy|pixel|charger|cable|airpods|headphone|earbuds/i.test(lower)) {
      return 'Electronics & Gadgets';
    }
    if (/wallet|card|id|driver|license|money|cash|purse/i.test(lower)) {
      return 'Wallets & Identification';
    }
    if (/bottle|flask|thermos|cup/i.test(lower)) {
      return 'Water Bottles & Containers';
    }
    if (/bag|backpack|pouch|case|tote/i.test(lower)) {
      return 'Bags & Accessories';
    }
    if (/book|notebook|pen|calculator|folder|binder/i.test(lower)) {
      return 'Books & Academic Supplies';
    }
    if (/jacket|coat|hoodie|sweater|cap|hat|scarf|umbrella/i.test(lower)) {
      return 'Apparel & Accessories';
    }
    return 'Other Belongings';
  }

  /**
   * Parse natural language search into structured query terms
   * @param {string} query 
   * @returns {Object} Structured filter suggestions
   */
  static parseNaturalSearch(query) {
    const lower = (query || '').toLowerCase();
    
    // Extract color keywords
    const colors = ['black', 'blue', 'red', 'white', 'silver', 'grey', 'gray', 'green', 'yellow', 'brown', 'pink', 'purple'];
    const foundColor = colors.find(c => lower.includes(c)) || '';

    // Extract location keywords
    const locations = ['library', 'canteen', 'cafeteria', 'lab', 'parking', 'hostel', 'sports', 'auditorium', 'classroom'];
    const foundLocation = locations.find(l => lower.includes(l)) || '';

    return {
      rawQuery: query,
      detectedColor: foundColor,
      detectedLocation: foundLocation,
      suggestedCategory: this.suggestCategory(query)
    };
  }
}

module.exports = AIService;
