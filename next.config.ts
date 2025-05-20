import type { NextConfig } from 'next';

/**
 * Allow next/image to optimize Cloudinary URLs and shields.io badges.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Cloudinary media
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
      {
        // Shields.io badges
        protocol: 'https',
        hostname: 'img.shields.io',
        // match any badge path, e.g. /badge/Next.js-15-blue
        pathname: '/badge/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
