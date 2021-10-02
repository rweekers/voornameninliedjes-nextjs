const fetch = require('isomorphic-unfetch');
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
// As far as I know wildcard are not supported in domain configuration, hence the ugly generation of expected farmIds, to remove once a better option is there
const farmIds = range(1, 20, 1);

module.exports = {
  trailingSlash: true,
  images: {
    path: '',
    loader: 'imgix',
    domains: ['upload.wikimedia.org'].concat(farmIds.map(farmId => `farm${farmId}.staticflickr.com`)),
  },
  exportPathMap: async function () {
    const paths = {
      '/': { page: '/' }
    };
    const res = await fetch('https://api.voornameninliedjes.nl/songs');
    const songs = await res.json();

    songs.forEach(song => {
      paths[`/${encodeURIComponent(decodeURIComponent(song.artist.toLowerCase()))}/${encodeURIComponent(decodeURIComponent(song.title.toLowerCase()))}`] = { page: '/[artist]/[title]', query: { artist: encodeURIComponent(decodeURIComponent(song.artist.toLowerCase())), title: encodeURIComponent(decodeURIComponent(song.title.toLowerCase())) } };
    });

    return paths;
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    return config;
  }
};