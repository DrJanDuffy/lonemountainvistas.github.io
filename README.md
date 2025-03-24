# Lone Mountain Vistas

A modern, responsive real estate website showcasing luxury properties in the Lone Mountain Vistas community of Nevada.

## Project Structure

```
lone-mountain-vistas/
├── index.html              # Main HTML file
├── property-detail.html    # Property detail page
├── css/
│   ├── styles.css          # Main stylesheet
│   └── property-detail.css # Property detail styles
├── js/
│   ├── main.js             # Main JavaScript file
│   ├── pexels.js           # Pexels API integration 
│   └── property-detail.js  # Property detail page JavaScript
├── assets/
│   ├── images/
│   │   ├── properties/     # Property images
│   │   └── ui/             # UI images
│   └── data/
│       └── properties.json  # Property data
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Features

- Responsive design for all devices
- Dynamic property loading from JSON data
- Property detail pages with image galleries
- Contact form with validation
- Smooth scrolling navigation
- Pexels API integration for property images
- Modern UI with hover effects and animations

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lonemountainvistas.github.io.git
```

2. Navigate to the project directory:
```bash
cd lonemountainvistas.github.io
```

3. Set up your Pexels API key:
   - Sign up for a Pexels API key at https://www.pexels.com/api/
   - Update the API key in `js/pexels.js`

4. Add your property images to the `assets/images/properties/` directory

5. Update property data in `assets/data/properties.json`

## Development

The website is built using vanilla HTML, CSS, and JavaScript for optimal performance and maintainability.

### CSS Structure
- `styles.css`: Main styles for the entire website
- `property-detail.css`: Specific styles for property detail pages

### JavaScript Structure
- `main.js`: Core functionality and property listing
- `pexels.js`: Pexels API integration for property images
- `property-detail.js`: Property detail page functionality

## Deployment

The website is configured for GitHub Pages deployment. Simply push your changes to the main branch, and GitHub Pages will automatically deploy the site.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Lone Mountain Vistas - DrDuffy@bhhsnv.com
