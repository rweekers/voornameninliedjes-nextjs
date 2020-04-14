const fetch = require('isomorphic-unfetch');

module.exports = {
    exportTrailingSlash: true,
    exportPathMap: async function() {
      const paths = {
        '/': { page: '/' },
        '/about': { page: '/about' }
      };
      const res = await fetch('https://api.voornameninliedjes.nl/songs');
      const songs = await res.json();
    //   const shows = data.map(entry => entry.show);
  
      songs.forEach(song => {
        paths[`/song/${song.id}`] = { page: '/song/[id]', query: { id: song.id } };
      });
  
      return paths;
    }
  };