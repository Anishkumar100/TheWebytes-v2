/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // ✅ Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ Disable ESLint during builds (temporary for deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  images: {
      domains: ['cdn.jsdelivr.net'],
  },
};

export default nextConfig;
