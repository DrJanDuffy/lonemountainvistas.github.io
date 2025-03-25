import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Cerebras API Utilities
 * Shared functions for interacting with Cerebras AI services
 */

class CerebrasAPI {
  constructor(apiKey = process.env.CEREBRAS_API_KEY) {
    if (!apiKey) {
      throw new Error('Cerebras API key is required');
    }
    this.client = new Cerebras({ apiKey });
    this.cache = new Map();
    this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
  }

  /**
   * Get cached data or fetch new data
   */
  async getCachedData(key, fetchFn) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    const data = await fetchFn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  /**
   * Handle AI chat interactions
   */
  async handleChatQuery(userQuestion, neighborhoodContext) {
    try {
      const response = await this.client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a helpful real estate assistant for ${neighborhoodContext}.`
          },
          {
            role: 'user',
            content: userQuestion
          }
        ],
        model: 'llama3.1-8b',
        max_tokens: 300
      });
      
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Chat query error:', error);
      throw new Error('Failed to process chat query');
    }
  }

  /**
   * Search properties with caching
   */
  async searchProperties(criteria) {
    const cacheKey = `properties:${JSON.stringify(criteria)}`;
    return this.getCachedData(cacheKey, async () => {
      try {
        const results = await this.client.properties.search(criteria);
        return results.properties;
      } catch (error) {
        console.error('Property search error:', error);
        throw new Error('Failed to search properties');
      }
    });
  }

  /**
   * Get neighborhood insights with caching
   */
  async getNeighborhoodInsights(zipCode) {
    const cacheKey = `neighborhood:${zipCode}`;
    return this.getCachedData(cacheKey, async () => {
      try {
        const insights = await this.client.neighborhoods.analyze({
          zipCode,
          metrics: [
            'median_home_value',
            'price_trends',
            'school_ratings',
            'crime_rate',
            'walkability'
          ]
        });

        return {
          medianValue: insights.median_home_value,
          priceTrend: insights.price_trends.yearly_appreciation,
          schools: insights.school_ratings,
          safety: insights.crime_rate,
          walkScore: insights.walkability
        };
      } catch (error) {
        console.error('Neighborhood analysis error:', error);
        throw new Error('Failed to analyze neighborhood');
      }
    });
  }

  /**
   * Get property valuation with market analysis
   */
  async getPropertyValuation(address) {
    try {
      const valuation = await this.client.valuations.analyze({
        address,
        includeComparables: true,
        marketTrends: true
      });

      return {
        estimatedValue: valuation.estimated_value,
        confidence: valuation.confidence_score,
        comparables: valuation.comparable_properties,
        marketTrends: valuation.market_trends
      };
    } catch (error) {
      console.error('Valuation error:', error);
      throw new Error('Failed to get property valuation');
    }
  }
}

// Export singleton instance
export const cerebrasAPI = new CerebrasAPI();

// Export class for testing or custom initialization
export { CerebrasAPI }; 