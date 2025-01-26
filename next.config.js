module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    output: 'standalone',
    trailingSlash: true,
    images: {
      remotePatterns: [new URL('https://images.voornameninliedjes.nl/**')],
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        require('./scripts/generate-sitemap.js')
      }

      return config
    }
  }
  return nextConfig
}