/**
 * Voice Search Implementation for Lone Mountain Vistas
 * Enables natural language voice search for properties
 */

document.addEventListener('DOMContentLoaded', function() {
    initVoiceSearch();
});

/**
 * Initialize voice search functionality
 */
function initVoiceSearch() {
    const voiceSearchButton = document.getElementById('voice-search-button');
    
    if (!voiceSearchButton) return;
    
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        // Configure speech recognition
        recognition.continuous = false; // Stop after user stops speaking
        recognition.interimResults = false; // Only return final results
        recognition.lang = 'en-US'; // Set language to English
        
        // Add click event to voice search button
        voiceSearchButton.addEventListener('click', function() {
            // Create and show listening indicator
            showListeningIndicator();
            
            // Start speech recognition
            recognition.start();
            
            // Log for debugging
            console.log('Voice search activated. Listening...');
        });
        
        // Handle results from voice recognition
        recognition.onresult = function(event) {
            // Get voice search query
            const voiceQuery = event.results[0][0].transcript;
            console.log('Voice search query:', voiceQuery);
            
            // Process natural language query
            processVoiceQuery(voiceQuery);
            
            // Remove listening indicator
            removeListeningIndicator();
        };
        
        // Handle speech recognition errors
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            
            // Remove listening indicator
            removeListeningIndicator();
            
            // Show error message to user
            showVoiceSearchError(event.error);
        };
        
        // Handle end of speech recognition
        recognition.onend = function() {
            // Remove listening indicator
            removeListeningIndicator();
        };
    } else {
        // Browser doesn't support speech recognition
        console.error('Speech recognition not supported in this browser');
        
        // Hide or disable voice search button
        voiceSearchButton.style.display = 'none';
    }
}

/**
 * Process natural language voice query
 * @param {string} query - The voice search query
 */
function processVoiceQuery(query) {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();
    
    // Create search parameters object
    const searchParams = {};
    
    // Extract beds
    if (lowerQuery.includes('bedroom') || lowerQuery.includes('bedrooms') || lowerQuery.includes('bed') || lowerQuery.includes('beds')) {
        const bedroomMatch = lowerQuery.match(/(\d+)\s*(bedroom|bedrooms|bed|beds)/);
        if (bedroomMatch) {
            searchParams.bedrooms = bedroomMatch[1];
        }
    }
    
    // Extract baths
    if (lowerQuery.includes('bathroom') || lowerQuery.includes('bathrooms') || lowerQuery.includes('bath') || lowerQuery.includes('baths')) {
        const bathroomMatch = lowerQuery.match(/(\d+)\s*(bathroom|bathrooms|bath|baths)/);
        if (bathroomMatch) {
            searchParams.bathrooms = bathroomMatch[1];
        }
    }
    
    // Extract price range
    if (lowerQuery.includes('under')) {
        const underMatch = lowerQuery.match(/under\s*\$?(\d+\,?\.?\d*)\s*(thousand|million|k|m)?/i);
        if (underMatch) {
            let maxPrice = underMatch[1].replace(/,/g, '');
            if (underMatch[2]) {
                if (underMatch[2].toLowerCase() === 'thousand' || underMatch[2].toLowerCase() === 'k') {
                    maxPrice *= 1000;
                } else if (underMatch[2].toLowerCase() === 'million' || underMatch[2].toLowerCase() === 'm') {
                    maxPrice *= 1000000;
                }
            }
            searchParams.maxPrice = maxPrice;
        }
    }
    
    if (lowerQuery.includes('over') || lowerQuery.includes('above')) {
        const overMatch = lowerQuery.match(/(over|above)\s*\$?(\d+\,?\.?\d*)\s*(thousand|million|k|m)?/i);
        if (overMatch) {
            let minPrice = overMatch[2].replace(/,/g, '');
            if (overMatch[3]) {
                if (overMatch[3].toLowerCase() === 'thousand' || overMatch[3].toLowerCase() === 'k') {
                    minPrice *= 1000;
                } else if (overMatch[3].toLowerCase() === 'million' || overMatch[3].toLowerCase() === 'm') {
                    minPrice *= 1000000;
                }
            }
            searchParams.minPrice = minPrice;
        }
    }
    
    // Extract square footage
    if (lowerQuery.includes('square feet') || lowerQuery.includes('sq ft') || lowerQuery.includes('square foot')) {
        const sqftMatch = lowerQuery.match(/(\d+)\s*(square feet|sq ft|square foot)/);
        if (sqftMatch) {
            searchParams.minSqft = sqftMatch[1];
        }
    }
    
    // Check for specific features
    if (lowerQuery.includes('pool')) {
        searchParams.features = searchParams.features || [];
        searchParams.features.push('pool');
    }
    
    if (lowerQuery.includes('view') || lowerQuery.includes('mountain view')) {
        searchParams.features = searchParams.features || [];
        searchParams.features.push('mountain-view');
    }
    
    if (lowerQuery.includes('garage')) {
        const garageMatch = lowerQuery.match(/(\d+)\s*car\s*garage/);
        if (garageMatch) {
            searchParams.garageSize = garageMatch[1];
        } else {
            searchParams.features = searchParams.features || [];
            searchParams.features.push('garage');
        }
    }
    
    // Apply search parameters to form or redirect to search page
    applySearchParams(searchParams, query);
}

/**
 * Apply extracted search parameters to the form or redirect to search page
 * @param {Object} params - The search parameters
 * @param {string} originalQuery - The original voice query
 */
function applySearchParams(params, originalQuery) {
    console.log('Applying search parameters:', params);
    
    // Fill search form if available
    const priceRangeSelect = document.getElementById('price-range');
    const bedroomsSelect = document.getElementById('bedrooms');
    const bathroomsSelect = document.getElementById('bathrooms');
    
    if (priceRangeSelect && params.minPrice && params.maxPrice) {
        // Set price range select based on min and max price
        const priceRangeValue = `${params.minPrice}-${params.maxPrice}`;
        setSelectValueOrClosest(priceRangeSelect, priceRangeValue);
    } else if (priceRangeSelect && params.maxPrice) {
        // Find closest option for max price
        setSelectValueOrClosest(priceRangeSelect, `0-${params.maxPrice}`);
    } else if (priceRangeSelect && params.minPrice) {
        // Find closest option for min price
        setSelectValueOrClosest(priceRangeSelect, `${params.minPrice}+`);
    }
    
    if (bedroomsSelect && params.bedrooms) {
        setSelectValueOrClosest(bedroomsSelect, params.bedrooms);
    }
    
    if (bathroomsSelect && params.bathrooms) {
        setSelectValueOrClosest(bathroomsSelect, params.bathrooms);
    }
    
    // Show search feedback to user
    showSearchFeedback(params, originalQuery);
    
    // If we have a search form, submit it
    const searchForm = document.querySelector('.property-search-form');
    if (searchForm) {
        setTimeout(() => {
            searchForm.submit();
        }, 1500); // Small delay to let user see the feedback
    } else {
        // Otherwise, build a query string and redirect to search page
        const queryParams = new URLSearchParams();
        
        // Add all params to query string
        for (const [key, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                // For arrays like features
                value.forEach(item => {
                    queryParams.append(key, item);
                });
            } else {
                queryParams.append(key, value);
            }
        }
        
        // Add original query as well
        queryParams.append('voice-query', originalQuery);
        
        // Redirect to search page
        setTimeout(() => {
            window.location.href = `search.html?${queryParams.toString()}`;
        }, 1500); // Small delay to let user see the feedback
    }
}

/**
 * Set select element value or find closest option
 * @param {HTMLSelectElement} selectElement - The select element
 * @param {string} value - The desired value
 */
function setSelectValueOrClosest(selectElement, value) {
    // Try to set value directly
    selectElement.value = value;
    
    // If that didn't work, find closest option
    if (selectElement.value !== value) {
        // For numeric values, find closest option
        if (!isNaN(value)) {
            const numValue = parseInt(value);
            let closestOption = null;
            let closestDiff = Infinity;
            
            // Loop through options to find closest
            for (const option of selectElement.options) {
                const optionValue = parseInt(option.value);
                if (!isNaN(optionValue)) {
                    const diff = Math.abs(optionValue - numValue);
                    if (diff < closestDiff) {
                        closestDiff = diff;
                        closestOption = option.value;
                    }
                }
            }
            
            // Set to closest option if found
            if (closestOption !== null) {
                selectElement.value = closestOption;
            }
        }
    }
}

/**
 * Show feedback to the user about what was understood from voice query
 * @param {Object} params - The search parameters
 * @param {string} originalQuery - The original voice query
 */
function showSearchFeedback(params, originalQuery) {
    // Create feedback element
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'voice-search-feedback';
    
    // Create feedback content
    let feedbackContent = '<h3>I heard:</h3>';
    feedbackContent += `<p class="original-query">"${originalQuery}"</p>`;
    feedbackContent += '<h3>Searching for:</h3>';
    feedbackContent += '<ul>';
    
    // Add relevant search parameters to feedback
    if (params.bedrooms) {
        feedbackContent += `<li>${params.bedrooms} bedroom${params.bedrooms > 1 ? 's' : ''}</li>`;
    }
    
    if (params.bathrooms) {
        feedbackContent += `<li>${params.bathrooms} bathroom${params.bathrooms > 1 ? 's' : ''}</li>`;
    }
    
    if (params.minPrice && params.maxPrice) {
        feedbackContent += `<li>Price between $${formatNumber(params.minPrice)} and $${formatNumber(params.maxPrice)}</li>`;
    } else if (params.maxPrice) {
        feedbackContent += `<li>Price under $${formatNumber(params.maxPrice)}</li>`;
    } else if (params.minPrice) {
        feedbackContent += `<li>Price over $${formatNumber(params.minPrice)}</li>`;
    }
    
    if (params.minSqft) {
        feedbackContent += `<li>At least ${formatNumber(params.minSqft)} square feet</li>`;
    }
    
    if (params.features && params.features.length > 0) {
        params.features.forEach(feature => {
            feedbackContent += `<li>With ${feature.replace('-', ' ')}</li>`;
        });
    }
    
    if (params.garageSize) {
        feedbackContent += `<li>${params.garageSize}-car garage</li>`;
    }
    
    // If no parameters were extracted
    if (Object.keys(params).length === 0) {
        feedbackContent += '<li>All available properties</li>';
    }
    
    feedbackContent += '</ul>';
    
    // Add feedback element to page
    feedbackElement.innerHTML = feedbackContent;
    document.body.appendChild(feedbackElement);
    
    // Remove feedback after a delay
    setTimeout(() => {
        feedbackElement.classList.add('fade-out');
        setTimeout(() => {
            feedbackElement.remove();
        }, 500);
    }, 3000);
}

/**
 * Show listening indicator when voice search is active
 */
function showListeningIndicator() {
    // Create listening indicator if it doesn't exist
    if (!document.querySelector('.voice-listening-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'voice-listening-indicator';
        
        // Add ripple effect
        for (let i = 0; i < 3; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            indicator.appendChild(ripple);
        }
        
        // Add microphone icon
        const micIcon = document.createElement('div');
        micIcon.className = 'mic-icon';
        micIcon.innerHTML = '<i class="fas fa-microphone"></i>';
        indicator.appendChild(micIcon);
        
        // Add listening text
        const listeningText = document.createElement('div');
        listeningText.className = 'listening-text';
        listeningText.textContent = 'Listening...';
        indicator.appendChild(listeningText);
        
        // Add to body
        document.body.appendChild(indicator);
    }
}

/**
 * Remove listening indicator
 */
function removeListeningIndicator() {
    const indicator = document.querySelector('.voice-listening-indicator');
    if (indicator) {
        indicator.classList.add('fade-out');
        setTimeout(() => {
            indicator.remove();
        }, 300);
    }
}

/**
 * Show error message when voice search fails
 * @param {string} error - The error message
 */
function showVoiceSearchError(error) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'voice-search-error';
    
    // Set error message based on error type
    let errorMessage = '';
    switch (error) {
        case 'no-speech':
            errorMessage = 'No speech was detected. Please try again.';
            break;
        case 'audio-capture':
            errorMessage = 'No microphone was found. Ensure it is plugged in and allowed.';
            break;
        case 'not-allowed':
            errorMessage = 'Microphone access was not allowed. Please enable it in your browser settings.';
            break;
        case 'network':
            errorMessage = 'Network error occurred. Please check your connection.';
            break;
        case 'aborted':
            errorMessage = 'Voice search was aborted.';
            break;
        default:
            errorMessage = 'An error occurred with voice search. Please try again.';
    }
    
    // Add error message to element
    errorElement.innerHTML = `<p><i class="fas fa-exclamation-circle"></i> ${errorMessage}</p>`;
    
    // Add to body
    document.body.appendChild(errorElement);
    
    // Remove after a delay
    setTimeout(() => {
        errorElement.classList.add('fade-out');
        setTimeout(() => {
            errorElement.remove();
        }, 300);
    }, 3000);
}

/**
 * Format number with commas
 * @param {number|string} number - The number to format
 * @returns {string} Formatted number
 */
function formatNumber(number) {
    return Number(number).toLocaleString();
}
