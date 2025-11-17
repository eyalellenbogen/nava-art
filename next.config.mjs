/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}.res.cloudinary.com`,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default config;