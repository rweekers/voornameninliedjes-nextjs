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
      paths[`/${encodeURIComponent(song.artist.toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`] = { page: '/[artist]/[title]', query: { artist: encodeURIComponent(song.artist.toLowerCase()), title: encodeURIComponent(song.title.toLowerCase()) } };
    });

    return paths;
  }
};