const fs = require('fs');
const path = require('path');

function validatePropertyData() {
  try {
    // Check if data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      console.log('No data directory found. Validation passed.');
      return;
    }

    // Check if properties.json exists
    const propertiesFile = path.join(dataDir, 'properties.json');
    if (!fs.existsSync(propertiesFile)) {
      console.log('No properties.json found. Validation passed.');
      return;
    }

    // Basic JSON parse check
    const properties = JSON.parse(fs.readFileSync(propertiesFile, 'utf8'));
    if (!Array.isArray(properties)) {
      throw new Error('Properties data must be an array');
    }

    console.log('Property data validation passed.');
  } catch (error) {
    console.error('Property data validation failed:', error.message);
    process.exit(1);
  }
}

// Run validation
validatePropertyData(); 