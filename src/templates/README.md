# Landing Page Templates

This directory contains templates and components for creating new landing pages with Cerebras API integration.

## Directory Structure

```
templates/
├── landing-pages/        # Base landing page templates
├── components/          # Reusable UI components
└── api-integrations/    # API configuration templates
```

## Getting Started

1. Copy the base template:
   ```bash
   cp src/templates/landing-pages/base-template.html src/pages/your-new-page.html
   ```

2. Replace placeholder values:
   - `[PROPERTY_TITLE]`
   - `[PROPERTY_DESCRIPTION]`
   - `[STREET_ADDRESS]`
   - `[ZIP_CODE]`
   - `[PROPERTY_SUBTITLE]`

3. Configure Cerebras API:
   - Copy `cerebras-config.js` to your project
   - Set your API key in environment variables
   - Update widget configurations as needed

## Using Components

### Property Card Component

```html
<property-card
    property-id="123"
    image="/path/to/image.jpg"
    title="Luxury Mountain View Home"
    price="$1,250,000"
    beds="4"
    baths="3"
    sqft="3,200"
    address="123 Mountain View Dr"
    status="For Sale"
    features="Pool, Mountain View, Gated">
</property-card>
```

## Cerebras API Integration

The templates include:
- Search widget with type-ahead functionality
- Neighborhood information widget
- Progressive data loading
- Analytics integration

### Environment Variables

Required environment variables:
```
CEREBRAS_API_KEY=your_api_key_here
```

## Customization

- Modify styles in the component templates
- Adjust widget configurations in `cerebras-config.js`
- Customize analytics tracking in the configuration file

## Best Practices

1. Always use Shadow DOM for components to prevent style conflicts
2. Implement progressive loading for better performance
3. Follow the semantic HTML structure
4. Use the provided color palette:
   - Primary: #0A2540
   - Secondary: #3A8DDE
   - Background: #F7F9FC
   - Accent: #16B286

## Support

For questions about:
- Templates: Check the documentation in `/docs`
- Cerebras API: Refer to the official documentation
- Components: See individual component README files 