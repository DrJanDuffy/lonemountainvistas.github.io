// Cerebras API Configuration
const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY;
const CEREBRAS_ENVIRONMENT = 'production'; // or 'staging' for development

// Widget Configuration
const widgetConfig = {
    searchWidget: {
        containerId: 'hvs-search-widget',
        options: {
            apiKey: CEREBRAS_API_KEY,
            environment: CEREBRAS_ENVIRONMENT,
            searchType: 'address',
            debounceInterval: 1500, // 1.5 second debounce for type-ahead
            placeholder: 'Enter an address or neighborhood',
            searchHierarchy: ['address', 'neighborhood', 'city'],
            cacheResults: true,
            cacheExpiry: 1800000, // 30 minutes
            styles: {
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderRadius: '8px',
                zIndex: 1000
            }
        }
    },
    neighborhoodWidget: {
        containerId: 'hvs-neighborhood-widget',
        options: {
            apiKey: CEREBRAS_API_KEY,
            environment: CEREBRAS_ENVIRONMENT,
            loadStrategy: 'progressive',
            initialDataset: ['demographics', 'schools'],
            fullDatasetTrigger: 'interaction',
            styles: {
                minHeight: '480px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }
        }
    }
};

// Initialize Cerebras Widgets
function initializeCerebrasWidgets() {
    // Initialize Search Widget
    if (document.getElementById(widgetConfig.searchWidget.containerId)) {
        window.Cerebras.initializeSearchWidget(
            widgetConfig.searchWidget.containerId,
            widgetConfig.searchWidget.options
        );
    }

    // Initialize Neighborhood Widget
    if (document.getElementById(widgetConfig.neighborhoodWidget.containerId)) {
        window.Cerebras.initializeNeighborhoodWidget(
            widgetConfig.neighborhoodWidget.containerId,
            widgetConfig.neighborhoodWidget.options
        );
    }
}

// Analytics Integration
const analyticsConfig = {
    dimensions: {
        userType: 'cd1',
        widgetType: 'cd2',
        interactionDepth: 'cd3',
        conversionValue: 'cd4'
    }
};

// Event Tracking
function trackWidgetInteraction(widgetType, interactionType, value = null) {
    if (window.gtag) {
        gtag('event', interactionType, {
            'event_category': 'Cerebras Widget',
            'event_label': widgetType,
            [analyticsConfig.dimensions.widgetType]: widgetType,
            [analyticsConfig.dimensions.interactionDepth]: getInteractionDepth(),
            [analyticsConfig.dimensions.conversionValue]: value
        });
    }
}

// Export configurations and functions
export {
    initializeCerebrasWidgets,
    trackWidgetInteraction,
    widgetConfig,
    analyticsConfig
}; 