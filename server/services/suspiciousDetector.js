const Claim = require('../models/Claim');

/**
 * Rule-Based Suspicious Claim Detector Service
 * Flags suspicious ownership claims based on pattern analysis:
 * - Multiple claims for the same item
 * - Repeated failed verification attempts
 * - Rapid consecutive claims by the same user
 */
class SuspiciousDetector {
  /**
   * Analyze claim risk
   * @param {string} claimerId 
   * @param {string} foundItemId 
   * @param {boolean} isVerified 
   * @returns {Object} { isSuspicious, riskLevel, reasons }
   */
  static async evaluateClaimRisk(claimerId, foundItemId, isVerified) {
    const reasons = [];
    let riskLevel = 'None';
    let isSuspicious = false;

    try {
      // 1. Check total claims on this specific found item
      const itemClaimCount = await Claim.countDocuments({ foundItem: foundItemId });
      if (itemClaimCount >= 2) {
        reasons.push(`Multiple claims submitted for this item (${itemClaimCount + 1} total claims)`);
        riskLevel = 'Medium';
        isSuspicious = true;
      }

      // 2. Check failed verification attempts by this user in last 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const failedClaimsCount = await Claim.countDocuments({
        claimer: claimerId,
        isVerified: false,
        createdAt: { $gte: oneDayAgo }
      });

      if (failedClaimsCount >= 2) {
        reasons.push(`User has ${failedClaimsCount} failed verification attempts in the past 24 hours`);
        riskLevel = 'High';
        isSuspicious = true;
      }

      // 3. Check rapid claims by same user (3+ claims in 1 hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentUserClaims = await Claim.countDocuments({
        claimer: claimerId,
        createdAt: { $gte: oneHourAgo }
      });

      if (recentUserClaims >= 3) {
        reasons.push(`Rapid claim frequency (${recentUserClaims + 1} claims within 1 hour)`);
        riskLevel = 'High';
        isSuspicious = true;
      }

      // 4. Failed answer check
      if (!isVerified) {
        reasons.push('Private verification secret answer mismatch');
        if (riskLevel === 'None') riskLevel = 'Low';
      }

      return {
        isSuspicious,
        riskLevel,
        reasons
      };
    } catch (error) {
      console.error('SuspiciousDetector Error:', error.message);
      return { isSuspicious: false, riskLevel: 'None', reasons: [] };
    }
  }
}

module.exports = SuspiciousDetector;
