const artists = require('../../../../../../../saint-seiya-api-data/artists/index.json')

export function getArtistsData() {
  return artists;
}

export function getArtistData(id) {
  let artist;

  for (let i = 0; i < artists.length; i++) {
    if (artists[i].id === id) {
      artist = artists[i];
    }
  }

  return artist;
}
