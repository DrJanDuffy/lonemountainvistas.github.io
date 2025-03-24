// Main JavaScript file for Lone Mountain Vistas

// Import Pexels functions
import { 
    preloadPropertyImages, 
    applyImagesToPropertyCards,
    fetchPexelsImages,
    formatPexelsImage
} from './pexels.js';

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initContactForm();
    initPropertiesDisplay();
    initSmoothScrolling();
    initPexelsImages();
});

// Mobile navigation toggle
function initNavigation() {
    // Add a mobile menu toggle (to be implemented)
    const nav = document.querySelector('nav ul');
    
    // Create a mobile menu button (to be added to HTML)
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    
    document.querySelector('.header-container').appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Form validation and submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset error styles
            clearErrors();
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // Here you would typically send data to a server
                // For now, we'll just show a success message
                showFormSuccess();
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
    
    function clearErrors() {
        const errorInputs = document.querySelectorAll('.form-control.error');
        errorInputs.forEach(input => input.classList.remove('error'));
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showFormSuccess() {
        contactForm.innerHTML = '<div class="success-message"><h3>Thank You!</h3><p>Your message has been sent successfully. We will get back to you shortly.</p></div>';
    }
}

// Property initialization - calls the Pexels integration
async function initPropertiesDisplay() {
    try {
        // Fetch the properties data
        const response = await fetch('assets/data/properties.json');
        const data = await response.json();
        
        // Get the featured properties
        const featuredIds = data.featured;
        const featuredProperties = data.properties.filter(property => 
            featuredIds.includes(property.id)
        );
        
        // Render the featured properties
        const propertiesGrid = document.querySelector('.properties-grid');
        if (!propertiesGrid) return;
        
        // Clear any existing properties
        propertiesGrid.innerHTML = '';
        
        // Add each featured property
        featuredProperties.forEach(property => {
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
            
            // Add click event to navigate to property detail page
            propertyCard.addEventListener('click', function(event) {
                // Avoid triggering when clicking on buttons or links
                if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'A') {
                    window.location.href = `property-detail.html?id=${property.id}`;
                }
            });
            
            propertyCard.style.cursor = 'pointer';
            
            propertiesGrid.appendChild(propertyCard);
        });
        
        // Add hover effect to property cards
        const propertyCards = document.querySelectorAll('.property-card');
        
        propertyCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            });
        });
        
    } catch (error) {
        console.error('Error loading properties:', error);
        loadFallbackProperties();
    }
}

// Fallback properties if JSON fails to load
function loadFallbackProperties() {
    const propertiesGrid = document.querySelector('.properties-grid');
    
    // Only add static content if no properties were loaded
    if (propertiesGrid && propertiesGrid.children.length === 0) {
        propertiesGrid.innerHTML = `
            <!-- Property 1 (Fallback) -->
            <div class="property-card">
                <div class="property-image fallback-image">Property Image</div>
                <div class="property-details">
                    <div class="property-price">$1,250,000</div>
                    <h3 class="property-address">5678 Sierra Sunset Drive</h3>
                    <p>Stunning contemporary home with panoramic mountain views, featuring an open floor plan, gourmet kitchen, and resort-style backyard.</p>
                    <div class="property-features">
                        <span class="feature">4 Beds</span>
                        <span class="feature">3.5 Baths</span>
                        <span class="feature">3,200 Sq Ft</span>
                    </div>
                </div>
            </div>
            
            <!-- Property 2 (Fallback) -->
            <div class="property-card">
                <div class="property-image fallback-image">Property Image</div>
                <div class="property-details">
                    <div class="property-price">$1,750,000</div>
                    <h3 class="property-address">8901 Desert Willow Court</h3>
                    <p>Exquisite Mediterranean-inspired estate featuring high ceilings, marble flooring, chef's kitchen, home theater, and infinity pool.</p>
                    <div class="property-features">
                        <span class="feature">5 Beds</span>
                        <span class="feature">4.5 Baths</span>
                        <span class="feature">4,800 Sq Ft</span>
                    </div>
                </div>
            </div>
            
            <!-- Property 3 (Fallback) -->
            <div class="property-card">
                <div class="property-image fallback-image">Property Image</div>
                <div class="property-details">
                    <div class="property-price">$985,000</div>
                    <h3 class="property-address">1234 Golden Canyon Way</h3>
                    <p>Modern craftsman with incredible attention to detail, featuring hardwood floors, stone accents, and a seamless indoor-outdoor living experience.</p>
                    <div class="property-features">
                        <span class="feature">3 Beds</span>
                        <span class="feature">2.5 Baths</span>
                        <span class="feature">2,600 Sq Ft</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
                const nav = document.querySelector('nav ul');
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
}

// Initialize Pexels images
async function initPexelsImages() {
    try {
        // Preload images for properties
        const preloadedImages = await preloadPropertyImages();
        
        // Get property cards
        const propertyCards = document.querySelectorAll('.property-card');
        
        // Apply images to property cards
        if (propertyCards.length > 0 && preloadedImages.exterior && preloadedImages.exterior.length > 0) {
            applyImagesToPropertyCards(propertyCards, preloadedImages);
        }
        
        // Set hero image
        await setHeroImage();
        
        // Set about section image
        await setAboutImage();
        
    } catch (error) {
        console.error('Error initializing Pexels images:', error);
    }
}

// Set hero section background image
async function setHeroImage() {
    try {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Add loading state if not already present
        if (!heroSection.querySelector('.image-loader')) {
            const loader = document.createElement('div');
            loader.className = 'image-loader';
            heroSection.appendChild(loader);
        }
        
        // Fetch a mountain landscape image
        const response = await fetchPexelsImages('mountain landscape nevada', 1, 1, 'landscape');
        
        if (response && response.photos && response.photos.length > 0) {
            const image = formatPexelsImage(response.photos[0]);
            
            // Set the background image
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${image.src.large}')`;
            
            // Add attribution
            const attribution = document.createElement('div');
            attribution.className = 'pexels-attribution';
            attribution.innerHTML = `Photo by <a href="${image.photographer.url}" target="_blank">${image.photographer.name}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`;
            heroSection.appendChild(attribution);
            
            // Remove loader
            const loader = heroSection.querySelector('.image-loader');
            if (loader) loader.remove();
        } else {
            // Fallback
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/images/properties/fallback-card.jpg')`;
            const loader = heroSection.querySelector('.image-loader');
            if (loader) loader.remove();
        }
        
    } catch (error) {
        console.error('Error setting hero image:', error);
        // Fallback
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/images/properties/fallback-card.jpg')`;
            const loader = heroSection.querySelector('.image-loader');
            if (loader) loader.remove();
        }
    }
}

// Set about section image
async function setAboutImage() {
    try {
        const aboutImage = document.querySelector('.about-image');
        if (!aboutImage) return;
        
        // Add loading state if not already present
        if (!aboutImage.querySelector('.image-loader')) {
            const loader = document.createElement('div');
            loader.className = 'image-loader';
            aboutImage.appendChild(loader);
        }
        
        // Fetch a luxury home interior image
        const response = await fetchPexelsImages('luxury home interior design', 1, 1, 'landscape');
        
        if (response && response.photos && response.photos.length > 0) {
            const image = formatPexelsImage(response.photos[0]);
            
            // Set the background image
            aboutImage.style.backgroundImage = `url('${image.src.large}')`;
            
            // Add attribution
            const attribution = document.createElement('div');
            attribution.className = 'pexels-attribution';
            attribution.innerHTML = `Photo by <a href="${image.photographer.url}" target="_blank">${image.photographer.name}</a> from <a href="https://www.pexels.com" target="_blank">Pexels</a>`;
            aboutImage.appendChild(attribution);
            
            // Remove loader
            const loader = aboutImage.querySelector('.image-loader');
            if (loader) loader.remove();
        } else {
            // Fallback
            aboutImage.style.backgroundImage = `url('/assets/images/properties/fallback-card.jpg')`;
            const loader = aboutImage.querySelector('.image-loader');
            if (loader) loader.remove();
        }
        
    } catch (error) {
        console.error('Error setting about image:', error);
        // Fallback
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            aboutImage.style.backgroundImage = `url('/assets/images/properties/fallback-card.jpg')`;
            const loader = aboutImage.querySelector('.image-loader');
            if (loader) loader.remove();
        }
    }
}

// Function to create lightbox for property images (for future implementation)
function createLightbox() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Create lightbox content
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="Property Image">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&lsaquo;</button>
                <button class="lightbox-next">&rsaquo;</button>
            </div>
            <div class="lightbox-caption"></div>
        </div>
    `;
    
    // Add lightbox to body
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
    
    return lightbox;
}

// Function to open lightbox with image
function openLightbox(imageUrl, caption) {
    // Get or create lightbox
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = createLightbox();
    }
    
    // Set image and caption
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    lightboxImage.src = imageUrl;
    lightboxCaption.innerHTML = caption;
    
    // Show lightbox
    lightbox.classList.add('active');
} 