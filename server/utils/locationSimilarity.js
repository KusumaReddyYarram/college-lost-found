/**
 * CampusFind AI - Campus Location Proximity Utility
 * Campus location normalization, building/area alias matching, and proximity scoring.
 */

// Common campus zones & location alias groups
const CAMPUS_LOCATION_GROUPS = [
  {
    name: 'Library Zone',
    aliases: ['library', 'central lib', 'study hall', 'reading room', 'lib', 'reference section', 'digital library']
  },
  {
    name: 'Food & Dining Zone',
    aliases: ['canteen', 'cafeteria', 'food court', 'dining hall', 'mess', 'snack bar', 'coffee shop', 'juice stall', 'food center']
  },
  {
    name: 'Computer & Science Labs',
    aliases: ['lab', 'laboratory', 'computer lab', 'physics lab', 'chemistry lab', 'biotech lab', 'research lab', 'ai lab', 'it lab']
  },
  {
    name: 'Student Residences',
    aliases: ['hostel', 'dorm', 'dormitory', 'residence', 'block a', 'block b', 'block c', 'boys hostel', 'girls hostel', 'hall 1', 'hall 2']
  },
  {
    name: 'Auditoriums & Events',
    aliases: ['auditorium', 'audi', 'seminar hall', 'main hall', 'convention center', 'amphitheatre', 'open air theatre']
  },
  {
    name: 'Sports & Fitness',
    aliases: ['ground', 'stadium', 'gym', 'sports complex', 'basketball court', 'tennis court', 'football field', 'swimming pool']
  },
  {
    name: 'Academic Blocks & Classrooms',
    aliases: ['classroom', 'lecture hall', 'main building', 'academic block', 'admin block', 'reception', 'dean office', 'block 1', 'block 2']
  },
  {
    name: 'Parking & Transport',
    aliases: ['parking', 'bike parking', 'car parking', 'bus stop', 'main gate', 'entrance', 'cycle stand']
  }
];

/**
 * Calculate proximity similarity score (0 to 100) between two location descriptions
 * @param {string} loc1 
 * @param {string} loc2 
 * @returns {number} Score 0-100
 */
function calculateLocationSimilarityScore(loc1, loc2) {
  if (!loc1 || !loc2) return 0;

  const l1 = loc1.toLowerCase().trim();
  const l2 = loc2.toLowerCase().trim();

  // Exact match
  if (l1 === l2) return 100;

  // Direct substring match
  if (l1.includes(l2) || l2.includes(l1)) return 90;

  // Find campus zone matches
  let zone1 = null;
  let zone2 = null;

  CAMPUS_LOCATION_GROUPS.forEach((group) => {
    if (group.aliases.some((alias) => l1.includes(alias))) {
      zone1 = group.name;
    }
    if (group.aliases.some((alias) => l2.includes(alias))) {
      zone2 = group.name;
    }
  });

  if (zone1 && zone2 && zone1 === zone2) {
    return 85; // Same campus zone
  }

  // Token overlap check
  const words1 = l1.split(/\s+/).filter((w) => w.length > 2);
  const words2 = l2.split(/\s+/).filter((w) => w.length > 2);
  const common = words1.filter((w) => words2.includes(w));

  if (common.length > 0) return 70;

  return 20; // Default lower score for distinct areas
}

module.exports = {
  CAMPUS_LOCATION_GROUPS,
  calculateLocationSimilarityScore
};
