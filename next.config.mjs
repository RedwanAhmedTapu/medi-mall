/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'radiustheme.com',
        port: '',
        pathname: '/**',
      },
    ],
  },};


export default nextConfig;
