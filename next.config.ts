/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.GRAPHQL_URL,
      },
    ];
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  productionBrowserSourceMaps: false,
  generateBuildId: () => 'build',
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config: any) => {
    config.externals['@solana/web3.js'] = 'commonjs @solana/web3.js';
    config.externals['@solana/spl-token'] = 'commonjs @solana/spl-token';
    return config;
  }
}

module.exports = nextConfig
