const Content = require('../models/Content.js');

const db = require("../models/Firebase.js");

module.exports = {
  async getCharacters(request, response) { response.json(db.collection('characters').get()) },
  async getCharacter(request, response) {
    const content = await Content.load();

    const characterFounded = content.characters.find(character => character.id === request.params.id);
  
    if (characterFounded) {
      const character = await Content.buildCharacter(characterFounded);

      response.json(character);
    } else {
      response.status(404).json({ message: 'Character not found' });
    }
  },
  getCuriosities(request, response) {
    db.collection('curiosities').get()
      .then(snapshot => {
        const curiosities = [];

        snapshot.forEach(doc => curiosities.push(doc.data()));

        response.json(curiosities);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
};