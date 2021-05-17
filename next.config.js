const fetch = require('isomorphic-unfetch');

module.exports = {
  trailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' }
    };
    const res = await fetch('https://api.voornameninliedjes.nl/songs');
    const songs = await res.json();

    songs.forEach(song => {
        paths[`/${encodeURIComponent(song.artist)}/${encodeURIComponent(song.title)}`] = { page: '/[artist]/[title]', query: { artist: encodeURIComponent(song.artist), title: encodeURIComponent(song.title) } };
      });

    return paths;
  }
};