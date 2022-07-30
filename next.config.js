const fetch = require('isomorphic-unfetch')
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
// As far as I know wildcard are not supported in domain configuration, hence the ugly generation of expected farmIds, to remove once a better option is there
const farmIds = range(1, 20, 1)

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    output: 'standalone',
    trailingSlash: true,
    images: {
      domains: ['upload.wikimedia.org', 'images.voornameninliedjes.nl'].concat(farmIds.map(farmId => `farm${farmId}.staticflickr.com`))
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