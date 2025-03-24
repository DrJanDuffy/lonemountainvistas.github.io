/**
 * RealScout Widget Configuration for Lone Mountain Vistas
 * 
 * This file centralizes the RealScout widget settings for our single-page website.
 */

// RealScout configuration
const realScoutConfig = {
    // Agent ID - this should be your actual RealScout agent encoded ID
    agentId: "QWdlbnQtMjI1MDUw",
    
    // Base properties for the widget
    baseProps: {
        "listing-status": "For Sale",
        "property-types": "SFR,MF,TC,OTHER",
        "price-min": "500000"
    },
    
    // Contact information for error states
    contact: {
        phone: "(702) 500-0448",
        address: "3350 Novat St #120, Las Vegas, NV 89129",
        email: "DrDuffy@bhhsnv.com"
    }
};

/**
 * Initialize RealScout widget script
 * @returns {Promise} Promise that resolves when the script is loaded
 */
function loadRealScoutScript() {
    return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (document.querySelector('script[src*="realscout-web-components.umd.js"]')) {
            resolve();
            return;
        }
        
        // Create script element
        const script = document.createElement('script');
        script.src = "https://em.realscout.com/widgets/realscout-web-components.umd.js";
        script.type = "module";
        
        // Add load and error handlers
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load RealScout script'));
        
        // Add to document
        document.head.appendChild(script);
    });
}

/**
 * Initialize RealScout styles
 */
function initRealScoutStyles() {
    // Check if styles are already added
    if (document.getElementById('realscout-styles')) {
        return;
    }
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'realscout-styles';
    styleElement.textContent = `
        /* RealScout Widget Styling */
        realscout-office-listings {
            --rs-listing-divider-color: rgb(101, 141, 172);
            width: 100%;
            margin-bottom: 40px;
            font-family: 'Arial', sans-serif;
        }
        
        /* RealScout Card Styling */
        realscout-office-listings .rs-listing-card {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            background-color: #fff;
            margin-bottom: 30px;
        }
        
        realscout-office-listings .rs-listing-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        /* Loading Indicator */
        .loading-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 50px 0;
            text-align: center;
        }
        
        .loading-indicator .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #2c5282;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        .loading-indicator p {
            color: #666;
            font-size: 18px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Error State */
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
        }
    `;
    
    // Add to document
    document.head.appendChild(styleElement);
}

/**
 * Create a RealScout widget with specified options
 * @param {string} elementId - ID of container element to place widget
 * @param {Object} options - Widget options
 */
function createRealScoutWidget(elementId, options = {}) {
    const container = document.getElementById(elementId);
    if (!container) {
        console.error(`Container element with ID "${elementId}" not found`);
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create widget element
    const widget = document.createElement('realscout-office-listings');
    
    // Set agent ID
    widget.setAttribute('agent-encoded-id', realScoutConfig.agentId);
    
    // Set base properties
    for (const [key, value] of Object.entries(realScoutConfig.baseProps)) {
        widget.setAttribute(key, value);
    }
    
    // Set custom options
    for (const [key, value] of Object.entries(options)) {
        widget.setAttribute(key, value);
    }
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Loading properties...</p>
    `;
    container.appendChild(loadingIndicator);
    
    // Add widget to container
    container.appendChild(widget);
    
    // Remove loading indicator once widget is loaded
    widget.addEventListener('load', () => {
        const indicator = container.querySelector('.loading-indicator');
        if (indicator) indicator.remove();
    });
}

/**
 * Initialize RealScout widget in the properties section
 */
async function initRealScout() {
    try {
        // Add styles
        initRealScoutStyles();
        
        // Load script
        await loadRealScoutScript();
        
        // Initialize widget
        createRealScoutWidget('properties-grid', {
            'sort-order': 'NEWEST'
        });
        
        console.log('RealScout widget initialized successfully');
    } catch (error) {
        console.error('Error initializing RealScout widget:', error);
        
        // Show error message
        const container = document.getElementById('properties-grid');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <p>We're currently experiencing issues loading our property listings.</p>
                    <p>Please try again later or contact us at ${realScoutConfig.contact.phone} for assistance.</p>
                </div>
            `;
        }
    }
}

// Export functions and config
export {
    realScoutConfig,
    initRealScout,
    createRealScoutWidget,
    loadRealScoutScript
};
