/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lonemountainvistas.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Configure build output
  output: 'standalone',
  // Disable x-powered-by header
  poweredByHeader: false,
  // Enable static exports for specific pages
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/all-properties': { page: '/all-properties' },
    };
  },
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 