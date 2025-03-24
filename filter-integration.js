/**
 * RealScout Filter Integration for Lone Mountain Vistas
 * 
 * Integrates the filter form with RealScout widget to allow filtering properties
 */

import { createRealScoutWidget, realScoutConfig } from './realscout-config.js';

document.addEventListener('DOMContentLoaded', function() {
    initFilterForm();
});

/**
 * Initialize the property filter form
 */
function initFilterForm() {
    const filterForm = document.getElementById('property-filters');
    if (!filterForm) return;

    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applyFilters();
    });

    // Initialize filters from URL parameters if present
    initializeFiltersFromUrl();
}

/**
 * Apply filters to the RealScout widget
 */
function applyFilters() {
    // Get filter values
    const priceRange = document.getElementById('price-range').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const sqFeet = document.getElementById('sq-feet').value;
    
    // Parse price range
    let minPrice = '';
    let maxPrice = '';
    if (priceRange) {
        const [min, max] = priceRange.split('-');
        minPrice = min;
        maxPrice = max ? max : minPrice + '+';
    }
    
    // Create widget options
    const options = {};
    
    // Set sort order based on the current page
    const pagePath = window.location.pathname;
    if (pagePath.includes('newest-listings')) {
        options['sort-order'] = 'NEWEST';
    } else if (pagePath.includes('price-low-high')) {
        options['sort-order'] = 'PRICE_LOW';
    } else if (pagePath.includes('price-high-low')) {
        options['sort-order'] = 'PRICE_HIGH';
    } else if (pagePath.includes('sold-properties')) {
        options['sort-order'] = 'SOLD_DATE_NEWEST';
        options['listing-status'] = 'Sold';
    } else {
        options['sort-order'] = 'NEWEST';
    }
    
    // Add filters
    if (minPrice) options['price-min'] = minPrice;
    if (maxPrice && !maxPrice.includes('+')) options['price-max'] = maxPrice;
    if (bedrooms) options['beds-min'] = bedrooms;
    if (bathrooms) options['baths-min'] = bathrooms;
    if (sqFeet) options['sqft-min'] = sqFeet;
    
    // Update URL with filter parameters
    updateUrlWithFilters({
        priceRange,
        bedrooms,
        bathrooms,
        sqFeet
    });
    
    // Create new widget with filters
    createRealScoutWidget('listings-container', options);
    
    // Show loading state
    const container = document.getElementById('listings-container');
    container.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Filtering properties...</p>
        </div>
    `;
}

/**
 * Update URL with filter parameters for bookmarking
 * @param {Object} filters - Filter values
 */
function updateUrlWithFilters(filters) {
    // Create URL with current filters
    const url = new URL(window.location.href);
    
    // Reset existing parameters
    url.search = '';
    
    // Add filter parameters if they have values
    if (filters.priceRange) url.searchParams.set('price', filters.priceRange);
    if (filters.bedrooms) url.searchParams.set('beds', filters.bedrooms);
    if (filters.bathrooms) url.searchParams.set('baths', filters.bathrooms);
    if (filters.sqFeet) url.searchParams.set('sqft', filters.sqFeet);
    
    // Update URL without reloading page
    window.history.pushState({ filters }, '', url);
}

/**
 * Initialize filters from URL parameters
 */
function initializeFiltersFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get parameters
    const priceRange = urlParams.get('price');
    const bedrooms = urlParams.get('beds');
    const bathrooms = urlParams.get('baths');
    const sqFeet = urlParams.get('sqft');
    
    // Set form values if present
    if (priceRange) document.getElementById('price-range').value = priceRange;
    if (bedrooms) document.getElementById('bedrooms').value = bedrooms;
    if (bathrooms) document.getElementById('bathrooms').value = bathrooms;
    if (sqFeet) document.getElementById('sq-feet').value = sqFeet;
    
    // Apply filters if any parameters exist
    if (priceRange || bedrooms || bathrooms || sqFeet) {
        applyFilters();
    }
}

// Handle browser back/forward
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.filters) {
        // Restore filter values
        const filters = e.state.filters;
        
        if (filters.priceRange) document.getElementById('price-range').value = filters.priceRange;
        if (filters.bedrooms) document.getElementById('bedrooms').value = filters.bedrooms;
        if (filters.bathrooms) document.getElementById('bathrooms').value = filters.bathrooms;
        if (filters.sqFeet) document.getElementById('sq-feet').value = filters.sqFeet;
        
        // Apply filters
        applyFilters();
    }
});

// Export functions
export {
    applyFilters,
    initFilterForm
};
