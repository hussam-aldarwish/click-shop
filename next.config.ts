import type { NextConfig } from 'next';
import { API_URL } from './helpers/env';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Exclude /api/auth/:path* from rewriting
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*', // Leave this as-is, no rewrite
      },
      // Rewrite all other API routes
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
