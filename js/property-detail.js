// Import Pexels functions
import { 
    fetchPexelsImages, 
    formatPexelsImage, 
    fetchPropertyImages
} from './pexels.js';

// Property Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initPropertyDetail();
});

// Initialize property detail page
async function initPropertyDetail() {
    try {
        // Get property ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = parseInt(urlParams.get('id') || '1'); // Default to property 1 if no ID provided
        
        // Fetch the property data
        const propertyData = await fetchPropertyData(propertyId);
        
        if (!propertyData) {
            showErrorMessage('Property not found');
            return;
        }
        
        // Display property details
        displayPropertyDetails(propertyData);
        
        // Load Pexels images for property
        await loadPropertyImages(propertyData);
        
        // Load similar properties
        await loadSimilarProperties(propertyData);
        
        // Initialize form handling
        initContactForm();
        
        // Initialize lightbox for gallery images
        initLightbox();
        
    } catch (error) {
        console.error('Error initializing property detail:', error);
        showErrorMessage('Error loading property information');
    }
}

// Fetch property data from JSON file
async function fetchPropertyData(propertyId) {
    try {
        const response = await fetch('/assets/data/properties.json');
        const data = await response.json();
        
        // Find the requested property
        const property = data.properties.find(p => p.id === propertyId);
        
        // Get neighborhood information
        if (property) {
            property.neighborhoodInfo = data.neighborhoods.find(n => n.id === property.neighborhood.toLowerCase().replace(/\s+/g, '-'));
        }
        
        return property;
    } catch (error) {
        console.error('Error fetching property data:', error);
        return null;
    }
}

// Display property details in the UI
function displayPropertyDetails(property) {
    // Update page title
    document.title = `${property.address} | Lone Mountain Vistas`;
    
    // Set property address and price
    document.getElementById('property-address').textContent = property.address;
    document.getElementById('property-price').textContent = `$${property.price.toLocaleString()}`;
    
    // Set property metadata
    document.getElementById('property-beds').textContent = `${property.bedrooms} Bedrooms`;
    document.getElementById('property-baths').textContent = `${property.bathrooms} Bathrooms`;
    document.getElementById('property-sqft').textContent = `${property.squareFeet.toLocaleString()} Sq Ft`;
    document.getElementById('property-built').textContent = `Built in ${property.yearBuilt}`;
    
    // Set property description
    const descriptionElement = document.getElementById('property-description');
    descriptionElement.innerHTML = `
        <h2>Property Description</h2>
        <p>${property.description}</p>
        <p>This exceptional home is located in the prestigious ${property.neighborhood} community of Lone Mountain Vistas, offering luxurious living with breathtaking views and easy access to all amenities.</p>
        <p>The property features a spacious ${property.squareFeet.toLocaleString()} square foot layout with ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, and a ${property.garage}-car garage. Built in ${property.yearBuilt}, this home combines modern design with timeless elegance.</p>
    `;
    
    // Set property features
    const featuresElement = document.getElementById('property-features');
    featuresElement.innerHTML = '';
    
    property.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresElement.appendChild(li);
    });
    
    // Set virtual tour link
    const virtualTourBtn = document.getElementById('virtual-tour-btn');
    virtualTourBtn.href = property.virtualTour;
    
    // Set neighborhood information
    if (property.neighborhoodInfo) {
        document.getElementById('neighborhood-name').textContent = property.neighborhoodInfo.name;
        document.getElementById('neighborhood-description').textContent = property.neighborhoodInfo.description;
    }
}

// Load property images from Pexels
async function loadPropertyImages(property) {
    try {
        // Set banner image
        await setBannerImage();
        
        // Set gallery images
        await setGalleryImages();
        
    } catch (error) {
        console.error('Error loading property images:', error);
    }
}

// Set banner image from Pexels
async function setBannerImage() {
    try {
        const bannerElement = document.getElementById('property-banner');
        if (!bannerElement) return;
        
        // Fetch luxury home exterior image
        const response = await fetchPexelsImages('luxury home exterior mountain', 1, 1, 'landscape');
        
        if (response && response.photos && response.photos.length > 0) {
            const image = formatPexelsImage(response.photos[0]);
            
            // Set the background image
            bannerElement.style.backgroundImage = `url('${image.src.large}')`;
            
            // Add attribution
            const attribution = document.createElement('div');
            attribution.className = 'pexels-attribution';
            attribution.innerHTML = `Photo by <a href="${image.photographer.url}" target="_blank">${image.photographer.name}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`;
            bannerElement.appendChild(attribution);
            
            // Remove loader
            const loader = bannerElement.querySelector('.image-loader');
            if (loader) loader.remove();
        } else {
            // Fallback
            bannerElement.style.backgroundImage = `url('/api/placeholder/1200/600')`;
            const loader = bannerElement.querySelector('.image-loader');
            if (loader) loader.remove();
        }
    } catch (error) {
        console.error('Error setting banner image:', error);
        
        // Fallback
        const bannerElement = document.getElementById('property-banner');
        if (bannerElement) {
            bannerElement.style.backgroundImage = `url('/api/placeholder/1200/600')`;
            const loader = bannerElement.querySelector('.image-loader');
            if (loader) loader.remove();
        }
    }
}

// Set gallery images from Pexels
async function setGalleryImages() {
    try {
        const galleryElement = document.getElementById('property-gallery');
        if (!galleryElement) return;
        
        // Remove loader
        const loader = galleryElement.querySelector('.image-loader');
        if (loader) loader.remove();
        
        // Define property image types to fetch
        const propertyTypes = [
            { type: 'interior', query: 'luxury home interior modern' },
            { type: 'kitchen', query: 'luxury kitchen design modern' },
            { type: 'bedroom', query: 'luxury master bedroom' },
            { type: 'bathroom', query: 'luxury bathroom design' },
            { type: 'pool', query: 'luxury swimming pool home' }
        ];
        
        // Gallery images array
        const galleryImages = [];
        
        // Fetch images for each property type
        for (const { type, query } of propertyTypes) {
            try {
                const response = await fetchPexelsImages(query, 1, 1, 'landscape');
                
                if (response && response.photos && response.photos.length > 0) {
                    const image = formatPexelsImage(response.photos[0]);
                    
                    // Add image to gallery images array
                    galleryImages.push({
                        type,
                        image
                    });
                }
            } catch (err) {
                console.error(`Error fetching ${type} image:`, err);
            }
        }
        
        // If we have images, create gallery
        if (galleryImages.length > 0) {
            // Clear gallery
            galleryElement.innerHTML = '';
            
            // Add each image to the gallery
            galleryImages.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.type = item.type;
                
                // First image is larger (cover image)
                if (index === 0) {
                    galleryItem.classList.add('gallery-item-large');
                }
                
                // Create image element
                const imgElement = document.createElement('img');
                imgElement.src = item.image.src.medium;
                imgElement.alt = `${item.type} image`;
                imgElement.dataset.fullsize = item.image.src.large;
                imgElement.dataset.photographer = item.image.photographer.name;
                imgElement.dataset.photographerUrl = item.image.photographer.url;
                
                // Add click event for lightbox
                imgElement.addEventListener('click', function() {
                    openLightbox(
                        this.dataset.fullsize,
                        `Photo by <a href="${this.dataset.photographerUrl}" target="_blank">${this.dataset.photographer}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`
                    );
                });
                
                galleryItem.appendChild(imgElement);
                
                // Add attribution
                const attribution = document.createElement('div');
                attribution.className = 'pexels-attribution';
                attribution.innerHTML = `Photo by <a href="${item.image.photographer.url}" target="_blank">${item.image.photographer.name}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`;
                galleryItem.appendChild(attribution);
                
                // Add gallery item to gallery
                galleryElement.appendChild(galleryItem);
            });
        } else {
            // Fallback if no images were loaded
            galleryElement.innerHTML = `
                <div class="gallery-item gallery-item-large">
                    <img src="/api/placeholder/600/400" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
            `;
        }
    } catch (error) {
        console.error('Error setting gallery images:', error);
        
        // Fallback
        const galleryElement = document.getElementById('property-gallery');
        if (galleryElement) {
            galleryElement.innerHTML = `
                <div class="gallery-item gallery-item-large">
                    <img src="/api/placeholder/600/400" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
                <div class="gallery-item">
                    <img src="/api/placeholder/300/200" alt="Property Image">
                </div>
            `;
        }
    }
}

// Load similar properties
async function loadSimilarProperties(property) {
    try {
        // Fetch all properties
        const response = await fetch('/assets/data/properties.json');
        const data = await response.json();
        
        // Get similar properties (excluding current property)
        const similarProperties = data.properties
            .filter(p => p.id !== property.id)
            .slice(0, 3); // Show 3 similar properties
        
        // Get the similar properties grid
        const propertiesGrid = document.getElementById('similar-properties');
        if (!propertiesGrid) return;
        
        // Clear any existing properties
        propertiesGrid.innerHTML = '';
        
        // Add each similar property
        for (const [index, property] of similarProperties.entries()) {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            
            propertyCard.innerHTML = `
                <div class="property-image">
                    <div class="image-loader"></div>
                </div>
                <div class="property-details">
                    <div class="property-price">$${property.price.toLocaleString()}</div>
                    <h3 class="property-address">${property.address}</h3>
                    <p>${property.description}</p>
                    <div class="property-features">
                        <span class="feature">${property.bedrooms} Beds</span>
                        <span class="feature">${property.bathrooms} Baths</span>
                        <span class="feature">${property.squareFeet.toLocaleString()} Sq Ft</span>
                    </div>
                </div>
            `;
            
            // Add click event to navigate to property
            propertyCard.addEventListener('click', function() {
                window.location.href = `property-detail.html?id=${property.id}`;
            });
            
            // Add property card to grid
            propertiesGrid.appendChild(propertyCard);
            
            // Fetch and set property image
            try {
                const response = await fetchPexelsImages('luxury home exterior', 1, 1, 'landscape');
                
                if (response && response.photos && response.photos.length > 0) {
                    const image = formatPexelsImage(response.photos[0]);
                    
                    // Get the image element
                    const imageElement = propertyCard.querySelector('.property-image');
                    if (imageElement) {
                        // Set the background image
                        imageElement.style.backgroundImage = `url('${image.src.large}')`;
                        
                        // Add attribution
                        const attribution = document.createElement('div');
                        attribution.className = 'pexels-attribution';
                        attribution.innerHTML = `Photo by <a href="${image.photographer.url}" target="_blank">${image.photographer.name}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`;
                        imageElement.appendChild(attribution);
                        
                        // Remove loader
                        const loader = imageElement.querySelector('.image-loader');
                        if (loader) loader.remove();
                    }
                } else {
                    // Fallback
                    const imageElement = propertyCard.querySelector('.property-image');
                    if (imageElement) {
                        imageElement.style.backgroundImage = `url('/api/placeholder/400/250')`;
                        const loader = imageElement.querySelector('.image-loader');
                        if (loader) loader.remove();
                    }
                }
            } catch (error) {
                console.error('Error setting similar property image:', error);
                
                // Fallback
                const imageElement = propertyCard.querySelector('.property-image');
                if (imageElement) {
                    imageElement.style.backgroundImage = `url('/api/placeholder/400/250')`;
                    const loader = imageElement.querySelector('.image-loader');
                    if (loader) loader.remove();
                }
            }
        }
        
    } catch (error) {
        console.error('Error loading similar properties:', error);
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const date = document.getElementById('date');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset any previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate required fields
            if (name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (date.value === '') {
                showError(date, 'Please select a preferred date');
                isValid = false;
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Please enter a message');
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // Here you would typically send data to a server
                // For now, we'll just show a success message
                contactForm.innerHTML = '<div class="success-message"><h3>Thank You!</h3><p>Your viewing request has been sent. Our agent will contact you shortly to confirm the appointment.</p></div>';
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        input.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// Show error message
function showErrorMessage(message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <div class="container">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="index.html" class="cta-button">Return to Home</a>
        </div>
    `;
    
    // Insert after header
    const header = document.querySelector('header');
    header.insertAdjacentElement('afterend', errorElement);
}

// Initialize lightbox for gallery images
function initLightbox() {
    // Create lightbox container if it doesn't exist
    if (!document.querySelector('.lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-image" src="" alt="Property Image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox when clicking close button
        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Close lightbox with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }
}

// Open lightbox with image
function openLightbox(imageUrl, caption) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    // Set image src and caption
    lightboxImage.src = imageUrl;
    lightboxCaption.innerHTML = caption;
    
    // Show lightbox
    lightbox.classList.add('active');
} 