const fs = require('fs');
const path = require('path');

// Define the expected property data structure
const propertySchema = {
  required: [
    'id',
    'address',
    'price',
    'bedrooms',
    'bathrooms',
    'squareFeet',
    'description'
  ],
  types: {
    id: 'string',
    address: 'string',
    price: 'number',
    bedrooms: 'number',
    bathrooms: 'number',
    squareFeet: 'number',
    description: 'string',
    amenities: 'array',
    images: 'array'
  }
};

function validateProperty(property) {
  // Check required fields
  for (const field of propertySchema.required) {
    if (!(field in property)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Check types
  for (const [field, expectedType] of Object.entries(propertySchema.types)) {
    if (field in property) {
      const value = property[field];
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      if (actualType !== expectedType) {
        throw new Error(`Invalid type for ${field}: expected ${expectedType}, got ${actualType}`);
      }
    }
  }

  return true;
}

function validatePropertyData() {
  try {
    // Check if data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      console.log('No data directory found. Validation passed.');
      return;
    }

    // Read and validate properties.json if it exists
    const propertiesFile = path.join(dataDir, 'properties.json');
    if (fs.existsSync(propertiesFile)) {
      const properties = JSON.parse(fs.readFileSync(propertiesFile, 'utf8'));
      
      if (!Array.isArray(properties)) {
        throw new Error('Properties data must be an array');
      }

      for (const property of properties) {
        validateProperty(property);
      }
      
      console.log('Property data validation passed.');
    } else {
      console.log('No properties.json found. Validation passed.');
    }
  } catch (error) {
    console.error('Property data validation failed:', error.message);
    process.exit(1);
  }
}

// Run validation
validatePropertyData(); 