/**
 * CampusFind AI - AI Matching & Text Embedding Service
 * 
 * Supports:
 * - HuggingFace / OpenAI / Custom Embedding Model API (when process.env.AI_API_KEY is set)
 * - Deterministic High-Precision NLP Semantic Fallback (via token normalization, synonym expansion, Cosine & Jaccard similarity)
 */

const { calculateTextSemanticScore, normalizeAndTokenize } = require('../utils/textSimilarity');

class AIMatchingService {
  /**
   * Calculate semantic similarity score between two text strings
   * @param {string} text1 
   * @param {string} text2 
   * @returns {Promise<{ semanticScore: number, method: string }>}
   */
  static async calculateSemanticSimilarity(text1, text2) {
    if (!text1 || !text2) {
      return { semanticScore: 0, method: 'empty_input' };
    }

    const apiKey = process.env.AI_API_KEY;
    const model = process.env.EMBEDDING_MODEL || 'sentence-transformers/all-MiniLM-L6-v2';

    // 1. External AI / Embedding Model Integration (If API Key Configured)
    if (apiKey) {
      try {
        const score = await this._fetchExternalEmbeddingSimilarity(text1, text2, apiKey, model);
        if (score !== null) {
          return { semanticScore: score, method: `external_ai_embedding:${model}` };
        }
      } catch (err) {
        console.warn('AI Embedding API call failed, using high-precision NLP fallback:', err.message);
      }
    }

    // 2. High-Precision Deterministic NLP Semantic Fallback
    const deterministicScore = calculateTextSemanticScore(text1, text2);
    return {
      semanticScore: deterministicScore,
      method: 'deterministic_nlp_synonym_vector'
    };
  }

  /**
   * Internal helper for external embedding API calculation
   */
  static async _fetchExternalEmbeddingSimilarity(text1, text2, apiKey, model) {
    // Standard Hugging Face / OpenAI embedding API format call
    const endpoint = `https://api-inference.huggingface.co/pipeline/feature-extraction/${model}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: [text1, text2] })
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (Array.isArray(data) && data.length === 2) {
      const vec1 = data[0];
      const vec2 = data[1];

      // Calculate cosine similarity between vectors
      let dotProduct = 0;
      let mag1 = 0;
      let mag2 = 0;

      for (let i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i];
        mag1 += vec1[i] * vec1[i];
        mag2 += vec2[i] * vec2[i];
      }

      const cosine = (mag1 > 0 && mag2 > 0) ? dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2)) : 0;
      return Math.min(Math.round(cosine * 100), 100);
    }

    return null;
  }
}

module.exports = AIMatchingService;
