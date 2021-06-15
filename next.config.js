const fetch = require('isomorphic-unfetch');

module.exports = {
  trailingSlash: true,
  future: {
    webpack5: true,
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