export const artistsData = require('../../../api/artists.json')

export function getArtistsData() {
  return artistsData;
}

export function getArtistData(id) {
  let artist;

  for (let i = 0; i < artistsData.length; i++) {
    if (artistsData[i].id === id) {
      artist = artistsData[i];
    }
  }

  return artist;
}
