// Sample property data - replace with your actual data source
const properties = [
  {
    id: '1',
    title: '5678 Sierra Sunset Drive',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    description: 'Stunning contemporary home with panoramic mountain views, featuring an open floor plan, gourmet kitchen, and resort-style backyard.',
    imageUrl: '/assets/images/properties/sierra-sunset.jpg'
  },
  {
    id: '2',
    title: '8901 Desert Willow Court',
    price: 1750000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4500,
    description: 'Exquisite Mediterranean-inspired estate featuring high ceilings, marble flooring, chef\'s kitchen, home theater, and infinity pool.',
    imageUrl: '/assets/images/properties/desert-willow.jpg'
  }
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 