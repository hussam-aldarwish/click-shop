import type { NextConfig } from 'next';
import { API_URL } from './herlpers/env';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy not found API routes to the API (JSON-SERVER)
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
