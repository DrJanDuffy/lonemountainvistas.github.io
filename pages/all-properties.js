import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch properties data
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>All Properties | Lone Mountain Vistas</title>
        <meta name="description" content="Browse our exclusive collection of luxury properties in the Lone Mountain area of Las Vegas, Nevada." />
        <meta property="og:title" content="All Properties | Lone Mountain Vistas" />
        <meta property="og:description" content="Browse our exclusive collection of luxury properties in the Lone Mountain area of Las Vegas, Nevada." />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#0A2540] mb-8">Available Properties</h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A8DDE]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div 
                key={property.id}
                className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-[#0A2540] mb-2">{property.title}</h2>
                  <p className="text-lg font-bold text-[#16B286] mb-4">${property.price.toLocaleString()}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <span className="font-medium">{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  <a
                    href={`/property/${property.id}`}
                    className="inline-block bg-[#3A8DDE] text-white px-6 py-2 rounded-lg hover:bg-[#2D7BC7] transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
} 