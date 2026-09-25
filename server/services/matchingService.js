/**
 * CampusFind AI - Core Smart Matching Engine Service
 * Multi-layer candidate retrieval, weighted attribute evaluation, explainable intelligence, & MongoDB persistence.
 */

const Match = require('../models/Match');
const Item = require('../models/Item');
const AIMatchingService = require('./aiMatchingService');
const { calculateAttributeSimilarity, calculateTextSemanticScore } = require('../utils/textSimilarity');
const { calculateLocationSimilarityScore } = require('../utils/locationSimilarity');
const { calculateDateSimilarityScore } = require('../utils/dateSimilarity');
const NotificationService = require('./notificationService');
const ActivityLogger = require('./activityLogger');

class MatchingService {
  /**
   * Evaluate match score and explainable reasons for a lost item and found item pair
   * @param {Object} lostItem 
   * @param {Object} foundItem 
   * @returns {Promise<Object>} Evaluated match metrics object
   */
  static async evaluateMatchPair(lostItem, foundItem) {
    // 1. Semantic Description Similarity (25%)
    const { semanticScore } = await AIMatchingService.calculateSemanticSimilarity(
      lostItem.description,
      foundItem.description
    );

    // 2. Category Similarity (15%)
    let categoryScore = 0;
    if (lostItem.category && foundItem.category) {
      const catL = lostItem.category.toLowerCase().trim();
      const catF = foundItem.category.toLowerCase().trim();
      if (catL === catF) {
        categoryScore = 100;
      } else if (catL.includes(catF) || catF.includes(catL)) {
        categoryScore = 75;
      } else {
        categoryScore = calculateAttributeSimilarity(lostItem.category, foundItem.category);
      }
    }

    // 3. Item Name / Title Similarity (10%)
    const nameScore = calculateAttributeSimilarity(lostItem.title, foundItem.title);

    // 4. Color Similarity (10%)
    const hasColorL = Boolean(lostItem.color && lostItem.color.trim());
    const hasColorF = Boolean(foundItem.color && foundItem.color.trim());
    const colorScore = (hasColorL && hasColorF)
      ? calculateAttributeSimilarity(lostItem.color, foundItem.color)
      : 0;

    // 5. Brand Similarity (10%)
    const hasBrandL = Boolean(lostItem.brand && lostItem.brand.trim());
    const hasBrandF = Boolean(foundItem.brand && foundItem.brand.trim());
    const brandScore = (hasBrandL && hasBrandF)
      ? calculateAttributeSimilarity(lostItem.brand, foundItem.brand)
      : 0;

    // 6. Identifying Features Similarity (15%)
    const hasMarksL = Boolean(lostItem.identifyingMarks && lostItem.identifyingMarks.trim());
    const hasMarksF = Boolean(foundItem.identifyingMarks && foundItem.identifyingMarks.trim());
    const featureScore = (hasMarksL && hasMarksF)
      ? calculateAttributeSimilarity(lostItem.identifyingMarks, foundItem.identifyingMarks)
      : (hasMarksL || hasMarksF ? calculateTextSemanticScore(lostItem.identifyingMarks || '', foundItem.description || '') : 0);

    // 7. Location Proximity (10%)
    const locationScore = calculateLocationSimilarityScore(lostItem.location, foundItem.location);

    // 8. Date / Temporal Proximity (5%)
    const dateScore = calculateDateSimilarityScore(lostItem.date, foundItem.date);

    // --- Weighted Scoring with Dynamic Missing-Field Normalization ---
    const baseWeights = {
      semantic: 0.25,
      category: 0.15,
      name: 0.10,
      color: 0.10,
      brand: 0.10,
      feature: 0.15,
      location: 0.10,
      date: 0.05
    };

    let activeWeights = { ...baseWeights };

    // Ignore color weight if both items omit color
    if (!hasColorL && !hasColorF) {
      delete activeWeights.color;
    }
    // Ignore brand weight if both items omit brand
    if (!hasBrandL && !hasBrandF) {
      delete activeWeights.brand;
    }
    // Ignore feature weight if both items omit identifying marks
    if (!hasMarksL && !hasMarksF) {
      delete activeWeights.feature;
    }

    // Normalize active weights sum to 1.0
    const totalActiveWeightSum = Object.values(activeWeights).reduce((sum, w) => sum + w, 0);

    let rawScoreSum = 0;
    rawScoreSum += (activeWeights.semantic || 0) * semanticScore;
    rawScoreSum += (activeWeights.category || 0) * categoryScore;
    rawScoreSum += (activeWeights.name || 0) * nameScore;
    if (activeWeights.color) rawScoreSum += activeWeights.color * colorScore;
    if (activeWeights.brand) rawScoreSum += activeWeights.brand * brandScore;
    if (activeWeights.feature) rawScoreSum += activeWeights.feature * featureScore;
    rawScoreSum += (activeWeights.location || 0) * locationScore;
    rawScoreSum += (activeWeights.date || 0) * dateScore;

    const finalScore = Math.min(Math.round(rawScoreSum / totalActiveWeightSum), 100);

    // Match Level Classification
    let matchLevel = 'Unlikely Match';
    if (finalScore >= 80) {
      matchLevel = 'Strong Match';
    } else if (finalScore >= 60) {
      matchLevel = 'Possible Match';
    } else if (finalScore >= 40) {
      matchLevel = 'Weak Match';
    }

    // Generate Explainable Reasons & Differences
    const reasons = [];
    const differences = [];

    if (categoryScore >= 75) {
      reasons.push(`Both items belong to the same category (${foundItem.category})`);
    } else {
      differences.push(`Category mismatch (${lostItem.category || 'N/A'} vs ${foundItem.category || 'N/A'})`);
    }

    if (semanticScore >= 75) {
      reasons.push(`Descriptions are highly similar (${semanticScore}% semantic match)`);
    } else if (semanticScore >= 45) {
      reasons.push(`Shared keywords and context in item descriptions`);
    } else {
      differences.push(`Item descriptions have distinct phrasing`);
    }

    if (nameScore >= 75) {
      reasons.push(`Item titles match closely ('${foundItem.title}')`);
    }

    if (hasColorL && hasColorF) {
      if (colorScore >= 80) {
        reasons.push(`Matching color characteristic (${foundItem.color})`);
      } else {
        differences.push(`Color variation (${lostItem.color} vs ${foundItem.color})`);
      }
    } else {
      differences.push('Color details incomplete in one or both reports');
    }

    if (hasBrandL && hasBrandF) {
      if (brandScore >= 80) {
        reasons.push(`Matching brand name (${foundItem.brand})`);
      } else {
        differences.push(`Brand mismatch (${lostItem.brand} vs ${foundItem.brand})`);
      }
    } else {
      differences.push('Brand details not specified');
    }

    if (locationScore >= 80) {
      reasons.push(`Reported in the same campus area (${foundItem.location})`);
    } else if (locationScore >= 60) {
      reasons.push(`Locations are in nearby campus zones`);
    } else {
      differences.push(`Reported at different campus locations (${lostItem.location} vs ${foundItem.location})`);
    }

    if (dateScore >= 80) {
      reasons.push('Lost and found timestamps are within close proximity');
    } else {
      differences.push('Time gap exists between loss and discovery dates');
    }

    return {
      scores: {
        semantic: semanticScore,
        category: categoryScore,
        name: nameScore,
        color: colorScore,
        brand: brandScore,
        feature: featureScore,
        location: locationScore,
        date: dateScore
      },
      finalScore,
      matchLevel,
      reasons,
      differences
    };
  }

  /**
   * Automatically process candidate matching when a new item is created or updated
   * @param {Object} newItem MongoDB Item document
   */
  static async processItemMatching(newItem) {
    try {
      const isLost = newItem.type === 'lost';
      const opposingType = isLost ? 'found' : 'lost';

      // 1. Candidate Retrieval: Filter active non-closed opposing items
      const candidates = await Item.find({
        type: opposingType,
        status: { $nin: ['recovered', 'returned', 'closed'] }
      }).limit(50); // Candidate cap for high performance

      const generatedMatches = [];

      for (const candidate of candidates) {
        const lostItemObj = isLost ? newItem : candidate;
        const foundItemObj = isLost ? candidate : newItem;

        const evaluation = await this.evaluateMatchPair(lostItemObj, foundItemObj);

        // Only record matches meeting minimum confidence threshold (40%)
        if (evaluation.finalScore >= 40) {
          // Upsert Match record in MongoDB Atlas
          const matchDoc = await Match.findOneAndUpdate(
            { lostItem: lostItemObj._id, foundItem: foundItemObj._id },
            {
              lostItem: lostItemObj._id,
              foundItem: foundItemObj._id,
              semanticScore: evaluation.scores.semantic,
              categoryScore: evaluation.scores.category,
              nameScore: evaluation.scores.name,
              colorScore: evaluation.scores.color,
              brandScore: evaluation.scores.brand,
              featureScore: evaluation.scores.feature,
              locationScore: evaluation.scores.location,
              dateScore: evaluation.scores.date,
              finalScore: evaluation.finalScore,
              matchLevel: evaluation.matchLevel,
              reasons: evaluation.reasons,
              differences: evaluation.differences,
              status: 'Suggested'
            },
            { upsert: true, new: true }
          );

          generatedMatches.push(matchDoc);

          // Update potentialMatches cache on newItem
          const matchCacheForNew = {
            matchedItem: candidate._id,
            confidenceScore: evaluation.finalScore,
            matchLevel: evaluation.matchLevel,
            reasons: evaluation.reasons,
            differences: evaluation.differences,
            evaluatedAt: new Date()
          };

          // Remove any existing entry for this candidate in potentialMatches
          newItem.potentialMatches = (newItem.potentialMatches || []).filter(
            (m) => m.matchedItem && m.matchedItem.toString() !== candidate._id.toString()
          );
          newItem.potentialMatches.push(matchCacheForNew);

          // Update potentialMatches cache on candidate
          const matchCacheForCandidate = {
            matchedItem: newItem._id,
            confidenceScore: evaluation.finalScore,
            matchLevel: evaluation.matchLevel,
            reasons: evaluation.reasons,
            differences: evaluation.differences,
            evaluatedAt: new Date()
          };
          candidate.potentialMatches = (candidate.potentialMatches || []).filter(
            (m) => m.matchedItem && m.matchedItem.toString() !== newItem._id.toString()
          );
          candidate.potentialMatches.push(matchCacheForCandidate);

          if (candidate.status === 'reported') {
            candidate.status = 'potential_match';
          }
          await candidate.save();

          // Notify opposing candidate owner if match confidence >= 60%
          if (evaluation.finalScore >= 60 && candidate.user) {
            await NotificationService.notify({
              userId: candidate.user,
              title: `${evaluation.matchLevel} Detected (${evaluation.finalScore}%)`,
              message: `A new ${newItem.type} report '${newItem.title}' matches your item '${candidate.title}' with ${evaluation.finalScore}% confidence.`,
              type: 'match',
              relatedItem: newItem._id
            });
          }
        }
      }

      if (generatedMatches.length > 0) {
        if (newItem.status === 'reported') {
          newItem.status = 'potential_match';
        }
        await newItem.save();

        // Notify current user if any strong matches were found
        if (newItem.user) {
          const topMatch = generatedMatches.reduce((max, m) => (m.finalScore > max.finalScore ? m : max), generatedMatches[0]);
          if (topMatch && topMatch.finalScore >= 60) {
            await NotificationService.notify({
              userId: newItem.user,
              title: `Potential Match Found (${topMatch.finalScore}%)`,
              message: `We found a ${topMatch.finalScore}% ${topMatch.matchLevel} for your ${newItem.type} item '${newItem.title}'.`,
              type: 'match',
              relatedItem: newItem._id
            });
          }
        }
      }

      return generatedMatches;
    } catch (err) {
      console.error('MatchingService.processItemMatching error:', err);
      return [];
    }
  }
}

module.exports = MatchingService;
