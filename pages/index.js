import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lone Mountain Vistas | Luxury Homes with Mountain Views in Las Vegas</title>
        <meta name="description" content="Discover luxury homes with stunning mountain views in Lone Mountain Vistas, Las Vegas. Exclusive properties in Nevada's premier residential community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome to Lone Mountain Vistas
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your luxury real estate destination in Nevada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link 
              href="/all-properties"
              className="block p-6 bg-white rounded-lg shadow-property hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-primary mb-2">View All Properties</h2>
              <p className="text-gray-600">Browse our complete collection of luxury homes.</p>
            </Link>

            <Link 
              href="/newest-listings"
              className="block p-6 bg-white rounded-lg shadow-property hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-primary mb-2">Newest Listings</h2>
              <p className="text-gray-600">Discover our latest property additions.</p>
            </Link>

            <Link 
              href="/contact"
              className="block p-6 bg-white rounded-lg shadow-property hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-primary mb-2">Contact Us</h2>
              <p className="text-gray-600">Get in touch with our real estate experts.</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 