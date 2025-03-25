/**
 * RealScout Implementation Script for Lone Mountain Vistas
 * 
 * This file imports and initializes the RealScout widgets on the site.
 */

import { initRealScout } from './realscout-config.js';
import { initFilterForm } from './filter-integration.js';

// Initialize RealScout when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize widgets
    initRealScout().catch(error => {
        console.error('RealScout initialization failed:', error);
        
        // Show error message to user
        const listingContainers = document.querySelectorAll('[id$="-container"]');
        listingContainers.forEach(container => {
            if (container.id.includes('listing') || container.classList.contains('properties-grid')) {
                container.innerHTML = `
                    <div class="error-message">
                        <p>We're currently experiencing issues loading our property listings.</p>
                        <p>Please try again later or contact us at (702) 500-0448 for assistance.</p>
                    </div>
                `;
            }
        });
    });
    
    // Initialize filter form if present
    initFilterForm();
    
    // Add no results handler
    handleNoResults();
});

/**
 * Handle cases where RealScout returns no results
 */
function handleNoResults() {
    // Check periodically for no results message from RealScout
    const checkInterval = setInterval(() => {
        const noResultsElement = document.querySelector('realscout-office-listings .rs-no-results');
        
        if (noResultsElement) {
            // Clear the interval once we find the no results message
            clearInterval(checkInterval);
            
            // Create a more user-friendly no results message
            const container = noResultsElement.closest('[id$="-container"]');
            if (container) {
                container.innerHTML = `
                    <div class="no-results">
                        <h3>No Properties Match Your Criteria</h3>
                        <p>Try adjusting your search filters or explore our other listings.</p>
                        <button onclick="resetFilters()" class="reset-filters-btn">Reset Filters</button>
                    </div>
                `;
            }
        }
    }, 1000);
}

