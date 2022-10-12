const Content = require('../models/Content.js');

export function getArtists() {
  const collections = Content.getColletions();

  let artists = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'artists') {
      artists = collections[i].collection;
    }
  }

  return artists;
}

export function getArtist(id) {
  const collections = Content.getColletions();

  let artists = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'artists') {
      artists = collections[i].collection;
    }
  }

  let artist;

  for (let i = 0; i < artists.length; i++) {
    if (artists[i].id === id) {
      artist = artists[i];
    }
  }

  if (artist) {
    return artist;
  } else {
    return { message: 'Artist not found' };
  }
}
