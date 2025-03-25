const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';

/**
 * Search for photos on Pexels
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.perPage - Results per page (default: 15)
 * @returns {Promise<Object>} Pexels API response
 */
export async function searchPhotos(query, options = {}) {
  if (!PEXELS_API_KEY) {
    throw new Error('Pexels API key is not configured');
  }

  const { page = 1, perPage = 15 } = options;
  
  try {
    const response = await fetch(
      `${PEXELS_BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching photos from Pexels:', error);
    throw error;
  }
}

/**
 * Get a curated list of photos
 * @param {Object} options - Options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.perPage - Results per page (default: 15)
 * @returns {Promise<Object>} Pexels API response
 */
export async function getCuratedPhotos(options = {}) {
  if (!PEXELS_API_KEY) {
    throw new Error('Pexels API key is not configured');
  }

  const { page = 1, perPage = 15 } = options;

  try {
    const response = await fetch(
      `${PEXELS_BASE_URL}/curated?page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching curated photos from Pexels:', error);
    throw error;
  }
} 