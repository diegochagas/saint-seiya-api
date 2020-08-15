const Content = require('../models/Content.js');

module.exports = {
  async getArtists(request, response) {
    const collections = await Content.getColletions();

    let artists = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'artists') {
        artists = collections[i].collection;
      }
    }
    
    response.json(artists);
  },
  async getArtist(request, response) {
    const collections = await Content.getColletions();

    let artists = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'artists') {
        artists = collections[i].collection;
      }
    }

    let artist;

    for (let i = 0; i < artists.length; i++) {
      if (artists[i].id === request.params.id) {
        artist = artists[i];
      }
    }
  
    if (artist) {
      response.json(artist);
    } else {
      response.status(404).json({ message: 'Artist not found' });
    }
  }  
};