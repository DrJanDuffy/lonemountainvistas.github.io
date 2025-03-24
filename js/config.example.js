/**
 * Example configuration file for Lone Mountain Vistas
 * 
 * Copy this file to config.js and update the values with your actual configuration.
 * This file should be committed to version control as a template.
 */

export const config = {
    // API Keys
    PEXELS_API_KEY: 'YOUR_PEXELS_API_KEY',
    
    // API Settings
    PEXELS_API_URL: 'https://api.pexels.com/v1',
    PEXELS_RATE_LIMIT: 200, // Rate limit in milliseconds between requests
    PEXELS_MAX_RETRIES: 3, // Maximum number of retry attempts
    
    // Image Settings
    IMAGE_SIZES: {
        HERO: 'large',    // 1000px for hero images
        BANNER: 'large',  // 1000px for banner images
        GALLERY: 'medium', // 700px for gallery images
        CARD: 'small',    // 400px for property cards
        THUMBNAIL: 'tiny' // 280px for thumbnails
    },
    
    // Cache Settings
    CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    
    // Fallback Images
    FALLBACK_IMAGES: {
        HERO: '/assets/images/properties/fallback-hero.jpg',
        BANNER: '/assets/images/properties/fallback-banner.jpg',
        GALLERY: '/assets/images/properties/fallback-gallery.jpg',
        CARD: '/assets/images/properties/fallback-card.jpg'
    }
}; 