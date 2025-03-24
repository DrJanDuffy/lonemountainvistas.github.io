/**
 * Pexels API Integration for Lone Mountain Vistas
 * 
 * This file handles fetching images from Pexels for the real estate website.
 */

import { config } from './config.js';

// Cache for storing image data
const imageCache = {
    data: {},
    timestamps: {}
};

/**
 * Helper function to check if cached data is still valid
 * @param {string} key - Cache key
 * @returns {boolean} - Whether the cache is valid
 */
function isCacheValid(key) {
    const timestamp = imageCache.timestamps[key];
    if (!timestamp) return false;
    return Date.now() - timestamp < config.CACHE_DURATION;
}

// Handle rate limiting
let lastRequestTime = 0;
const requestQueue = [];

/**
 * Helper function to handle rate limiting
 * @returns {Promise<void>}
 */
async function handleRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < config.PEXELS_RATE_LIMIT) {
        await new Promise(resolve => 
            setTimeout(resolve, config.PEXELS_RATE_LIMIT - timeSinceLastRequest)
        );
    }
    
    lastRequestTime = Date.now();
}

/**
 * Helper function to handle API errors
 * @param {Error} error - The error object
 * @param {number} retryCount - Current retry attempt number
 * @returns {Promise<Object>} - Empty photos array or retry attempt
 */
async function handleApiError(error, retryCount = 0) {
    if (retryCount >= config.PEXELS_MAX_RETRIES) {
        console.error('Max retries reached:', error);
        return null;
    }

    // Exponential backoff
    const delay = Math.pow(2, retryCount) * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return retryCount + 1;
}

/**
 * Fetch images from Pexels based on query
 * @param {string} query - Search term (e.g., "luxury home", "modern kitchen")
 * @param {number} perPage - Number of images to fetch per page
 * @param {number} page - Page number to fetch
 * @param {string} orientation - Image orientation (landscape, portrait, square)
 * @returns {Promise<Object>} - Pexels API response object
 */
async function fetchPexelsImages(query, page = 1, perPage = 1, orientation = 'landscape') {
    try {
        await handleRateLimit();
        
        const cacheKey = `${query}-${page}-${perPage}-${orientation}`;
        
        // Check cache first
        if (isCacheValid(cacheKey)) {
            return imageCache.data[cacheKey];
        }
        
        const response = await fetch(
            `${config.PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=${orientation}`,
            {
                headers: {
                    'Authorization': config.PEXELS_API_KEY,
                    'Accept': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache the response
        imageCache.data[cacheKey] = data;
        imageCache.timestamps[cacheKey] = Date.now();
        
        return data;
    } catch (error) {
        console.error('Error fetching Pexels images:', error);
        const retryCount = await handleApiError(error);
        if (retryCount) {
            return fetchPexelsImages(query, page, perPage, orientation);
        }
        return null;
    }
}

/**
 * Format Pexels image data for use in the application
 * @param {Object} imageData - Image data from Pexels
 * @returns {Object} - Formatted image data
 */
function formatPexelsImage(photo) {
    return {
        id: photo.id,
        src: {
            original: photo.src.original,
            large: photo.src.large,
            medium: photo.src.medium,
            small: photo.src.small,
            tiny: photo.src.tiny
        },
        photographer: {
            name: photo.photographer,
            url: photo.photographer_url
        }
    };
}

/**
 * Fetch real estate images for different property types with caching
 * @param {string} propertyType - Type of property (e.g., "exterior", "kitchen")
 * @param {number} count - Number of images to fetch
 * @returns {Promise<Array>} - Array of formatted image objects
 */
async function fetchPropertyImages(propertyType, count = 3) {
    // Check cache first
    const cacheKey = `${propertyType}_${count}`;
    if (isCacheValid(cacheKey)) {
        return imageCache.data[cacheKey];
    }
    
    // Construct a specific query based on property type to get better results
    let query = 'luxury home';
    
    switch (propertyType) {
        case 'exterior':
            query = 'luxury home exterior';
            break;
        case 'interior':
            query = 'modern home interior';
            break;
        case 'kitchen':
            query = 'luxury kitchen design';
            break;
        case 'bathroom':
            query = 'luxury bathroom design';
            break;
        case 'bedroom':
            query = 'luxury bedroom';
            break;
        case 'pool':
            query = 'luxury swimming pool';
            break;
        case 'landscape':
            query = 'mountain landscape nevada';
            break;
        case 'realestate':
            query = 'luxury real estate';
            break;
    }
    
    // Calculate how many pages we need to fetch based on count
    const perPage = Math.min(count, 10); // Max 10 per page from Pexels API
    const pages = Math.ceil(count / perPage);
    let allPhotos = [];
    
    // Fetch images from Pexels (one or more pages as needed)
    for (let page = 1; page <= pages; page++) {
        const response = await fetchPexelsImages(query, page, perPage, 'landscape');
        
        if (response && response.photos) {
            allPhotos = [...allPhotos, ...response.photos];
            
            // If we have enough photos, break the loop
            if (allPhotos.length >= count) {
                break;
            }
        }
    }
    
    // Format and cache the results
    const formattedPhotos = allPhotos.slice(0, count).map(photo => formatPexelsImage(photo));
    imageCache.data[cacheKey] = formattedPhotos;
    imageCache.timestamps[cacheKey] = Date.now();
    
    return formattedPhotos;
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImageForElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(image => observer.observe(image));
}

/**
 * Load image for a lazy-loaded element
 * @param {HTMLElement} element - The element to load the image for
 */
async function loadImageForElement(element) {
    const propertyType = element.dataset.propertyType;
    const count = parseInt(element.dataset.count) || 1;
    
    try {
        const images = await fetchPropertyImages(propertyType, count);
        if (images && images.length > 0) {
            const image = images[0];
            const size = element.dataset.size || 'medium';
            
            element.style.backgroundImage = `url('${image.src[size]}')`;
            
            // Add attribution
            const attribution = document.createElement('div');
            attribution.className = 'pexels-attribution';
            attribution.innerHTML = `Photo by <a href="${image.photographer.url}" target="_blank">${image.photographer.name}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`;
            element.appendChild(attribution);
        }
    } catch (error) {
        console.error('Error loading lazy image:', error);
        element.style.backgroundImage = `url('${config.FALLBACK_IMAGES[propertyType.toUpperCase()]}')`;
    }
}

/**
 * Apply Pexels images to property cards with lazy loading
 * @param {Array} propertyCards - DOM elements representing property cards
 * @param {Array} images - Preloaded image objects from Pexels
 */
function applyImagesToPropertyCards(propertyCards, images) {
    if (!images || !images.exterior || images.exterior.length === 0) {
        console.error('No images available');
        return;
    }
    
    // Apply images to each property card
    propertyCards.forEach((card, index) => {
        const imageElement = card.querySelector('.property-image');
        if (imageElement) {
            // Remove loader if present
            const loader = imageElement.querySelector('.image-loader');
            if (loader) loader.remove();
            
            // Set up lazy loading
            imageElement.classList.add('lazy-load');
            imageElement.dataset.propertyType = 'exterior';
            imageElement.dataset.count = '1';
            imageElement.dataset.size = config.IMAGE_SIZES.CARD;
        }
    });
    
    // Initialize lazy loading
    initLazyLoading();
}

// Export functions for use in other files
export {
    fetchPexelsImages,
    formatPexelsImage,
    fetchPropertyImages,
    initLazyLoading,
    applyImagesToPropertyCards
}; 