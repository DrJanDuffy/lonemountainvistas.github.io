// This file contains schemas for Lone Mountain Vistas
// Include these in the appropriate pages for better SEO and voice search optimization

// Home Page Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Lone Mountain Vistas",
  "url": "https://lonemountainvistas.com",
  "logo": "https://lonemountainvistas.com/assets/images/logo.png",
  "image": "https://lonemountainvistas.com/assets/images/properties/lone-mountain-view.jpg",
  "description": "Luxury homes with stunning mountain views in the prestigious Lone Mountain community of Las Vegas, Nevada.",
  "telephone": "(702) 555-1234",
  "email": "DrDuffy@bhhsnv.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Mountain View Drive",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89129",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.2250",
    "longitude": "-115.2893"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/lonemountainvistas",
    "https://www.instagram.com/lonemountainvistas",
    "https://www.linkedin.com/in/drjanetduffy"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Las Vegas",
    "containsPlace": {
      "@type": "Place",
      "name": "Lone Mountain"
    }
  },
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Luxury Real Estate Services",
      "description": "Buying and selling luxury properties in the Lone Mountain area of Las Vegas"
    }
  }
};

// Property Listings Schema (for Home Page)
const propertyListingsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "5678 Sierra Sunset Drive",
        "description": "Stunning contemporary home with panoramic mountain views, featuring an open floor plan, gourmet kitchen, and resort-style backyard.",
        "offers": {
          "@type": "Offer",
          "price": "1250000",
          "priceCurrency": "USD"
        },
        "image": "https://lonemountainvistas.com/assets/images/properties/property1.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "8901 Desert Willow Court",
        "description": "Exquisite Mediterranean-inspired estate featuring high ceilings, marble flooring, chef's kitchen, home theater, and infinity pool.",
        "offers": {
          "@type": "Offer",
          "price": "1750000",
          "priceCurrency": "USD"
        },
        "image": "https://lonemountainvistas.com/assets/images/properties/property2.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "name": "1234 Golden Canyon Way",
        "description": "Modern craftsman with incredible attention to detail, featuring hardwood floors, stone accents, and a seamless indoor-outdoor living experience.",
        "offers": {
          "@type": "Offer",
          "price": "985000",
          "priceCurrency": "USD"
        },
        "image": "https://lonemountainvistas.com/assets/images/properties/property3.jpg"
      }
    }
  ]
};

// Individual Property Schema (for Property Detail Page)
const individualPropertySchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "5678 Sierra Sunset Drive",
  "description": "Stunning contemporary home with panoramic mountain views, featuring an open floor plan, gourmet kitchen, and resort-style backyard.",
  "url": "https://lonemountainvistas.com/property-detail.html?id=1",
  "datePosted": "2025-02-15T08:00:00-08:00",
  "image": [
    "https://lonemountainvistas.com/assets/images/properties/property1-1.jpg",
    "https://lonemountainvistas.com/assets/images/properties/property1-2.jpg",
    "https://lonemountainvistas.com/assets/images/properties/property1-3.jpg"
  ],
  "numberOfRooms": 4,
  "numberOfBathroomsTotal": 3.5,
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": 3200,
    "unitCode": "FTK"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5678 Sierra Sunset Drive",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89129",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.2245",
    "longitude": "-115.2880"
  },
  "offers": {
    "@type": "Offer",
    "price": "1250000",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Mountain Views",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Gourmet Kitchen",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Resort-Style Backyard",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Open Floor Plan",
      "value": true
    }
  ],
  "broker": {
    "@type": "RealEstateAgent",
    "name": "Dr. Janet Duffy",
    "telephone": "(702) 555-1234",
    "email": "DrDuffy@bhhsnv.com"
  }
};

// FAQ Schema (for FAQ section) - Great for voice search
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the price range of homes in Lone Mountain Vistas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Homes in Lone Mountain Vistas typically range from $900,000 to $2.5 million, depending on size, location, views, and features. Our current inventory includes properties from 2,600 to 4,800 square feet."
      }
    },
    {
      "@type": "Question",
      "name": "What schools serve the Lone Mountain Vistas area?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lone Mountain Vistas is served by the Clark County School District, with Lone Mountain Elementary School, Ernest Becker Middle School, and Centennial High School as the zoned public schools. Several top-rated private schools are also within a short drive."
      }
    },
    {
      "@type": "Question",
      "name": "What amenities are available to Lone Mountain Vistas residents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Residents enjoy access to community trails, parks, and recreation areas. Many homes feature private pools, outdoor kitchens, and entertainment spaces. The community is minutes from Lone Mountain Regional Park, which offers hiking trails, sports fields, and picnic areas."
      }
    },
    {
      "@type": "Question",
      "name": "How far is Lone Mountain Vistas from the Las Vegas Strip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lone Mountain Vistas is approximately 15-20 minutes (12 miles) from the Las Vegas Strip, offering the perfect balance of proximity to world-class entertainment while maintaining a peaceful, suburban atmosphere."
      }
    },
    {
      "@type": "Question",
      "name": "What are property taxes like in the Lone Mountain area?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Property taxes in Clark County, Nevada are among the lowest in the country, typically ranging from 0.5% to 0.75% of the assessed value. Nevada has no state income tax, making it an attractive option for homebuyers."
      }
    },
    {
      "@type": "Question",
      "name": "Is there an HOA for Lone Mountain Vistas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Lone Mountain Vistas has a homeowners association that maintains community standards, common areas, and amenities. HOA fees typically range from $150-$300 per month, depending on the specific neighborhood within the community."
      }
    }
  ]
};

// Neighborhood Schema (for the Neighborhood section)
const neighborhoodSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Lone Mountain",
  "description": "A premier Las Vegas community offering tranquility, convenience, and stunning natural beauty.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89129",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.2250",
    "longitude": "-115.2893"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Hiking Trails",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Parks",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Top-Rated Schools",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Shopping Centers",
      "value": true
    }
  ],
  "containedInPlace": {
    "@type": "City",
    "name": "Las Vegas"
  }
};

// Local Business Schema (for contact section)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lone Mountain Vistas Real Estate Office",
  "description": "Luxury real estate office specializing in properties in the Lone Mountain area of Las Vegas.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Mountain View Drive",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89129",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.2250",
    "longitude": "-115.2893"
  },
  "telephone": "(702) 555-1234",
  "email": "DrDuffy@bhhsnv.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$$$"
};

// BreadcrumbList Schema (for property detail pages)
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://lonemountainvistas.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Properties",
      "item": "https://lonemountainvistas.com/all-properties.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "5678 Sierra Sunset Drive",
      "item": "https://lonemountainvistas.com/property-detail.html?id=1"
    }
  ]
};

// Person Schema (for the broker/agent)
const brokerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Janet Duffy",
  "jobTitle": "REALTOR®",
  "description": "Specializing in luxury properties in the Lone Mountain area for over 15 years",
  "telephone": "(702) 555-1234",
  "email": "DrDuffy@bhhsnv.com",
  "url": "https://lonemountainvistas.com/about.html",
  "image": "https://lonemountainvistas.com/assets/images/properties/janet-duffy.jpg",
  "workLocation": {
    "@type": "Place",
    "name": "Lone Mountain Vistas Real Estate Office",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Mountain View Drive",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89129",
      "addressCountry": "US"
    }
  },
  "affiliation": {
    "@type": "Organization",
    "name": "Berkshire Hathaway HomeServices Nevada Properties",
    "url": "https://www.bhhsnv.com"
  }
};

// Virtual Tour Schema
const virtualTourSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Lone Mountain Vistas Virtual Tour",
  "description": "Experience a guided tour of our luxury properties and the Lone Mountain community in Las Vegas, Nevada.",
  "thumbnailUrl": "https://lonemountainvistas.com/assets/images/properties/virtual-tour-thumbnail.jpg",
  "uploadDate": "2025-02-15T08:00:00-08:00",
  "contentUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "duration": "PT5M32S",
  "publisher": {
    "@type": "Organization",
    "name": "Lone Mountain Vistas",
    "logo": {
      "@type": "ImageObject",
      "url": "https://lonemountainvistas.com/assets/images/logo.png"
    }
  }
};

// WebSite Schema (for home page)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lone Mountain Vistas",
  "url": "https://lonemountainvistas.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lonemountainvistas.com/search.html?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Export schemas for use in different pages
export {
  organizationSchema,
  propertyListingsSchema,
  individualPropertySchema,
  faqSchema,
  neighborhoodSchema,
  localBusinessSchema,
  breadcrumbSchema,
  brokerSchema,
  virtualTourSchema,
  websiteSchema
};
