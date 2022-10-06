export const artistsData = require('../../../../../../../saint-seiya-api-data/artists/index.json')

export function getArtistData(artists, id) {
  let artist;

  for (let i = 0; i < artists.length; i++) {
    if (artists[i].id === id) {
      artist = artists[i];
    }
  }

  return artist;
}
