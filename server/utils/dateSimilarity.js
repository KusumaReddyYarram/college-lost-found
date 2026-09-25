/**
 * CampusFind AI - Date & Temporal Proximity Utility
 * Calculates temporal distance between lost & found timestamps.
 */

/**
 * Calculate temporal similarity score (0 to 100) between two dates
 * @param {Date|string|number} date1 
 * @param {Date|string|number} date2 
 * @returns {number} Score 0-100
 */
function calculateDateSimilarityScore(date1, date2) {
  if (!date1 || !date2) return 50; // Fallback score if missing

  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();

  if (isNaN(d1) || isNaN(d2)) return 50;

  const diffMs = Math.abs(d1 - d2);
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours <= 24) {
    return 100; // Lost and found within 24 hours
  } else if (diffDays <= 2) {
    return 90;
  } else if (diffDays <= 4) {
    return 80;
  } else if (diffDays <= 7) {
    return 65;
  } else if (diffDays <= 14) {
    return 45;
  } else if (diffDays <= 30) {
    return 25;
  }

  return 10;
}

module.exports = {
  calculateDateSimilarityScore
};
