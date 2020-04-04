const Content = require('../models/Content.js');

module.exports = {
  async getCharacters(request, response) {
    const collections = await Content.getColletions();

    let characters = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'characters') {
        characters = collections[i].collection;
      }
    }
    
    response.json(characters);
  },
  async getCharacter(request, response) {
    const collections = await Content.getColletions();

    let characters = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'characters') {
        characters = collections[i].collection;
      }
    }

    let character;

    for (let i = 0; i < characters.length; i++) {
      if (characters[i].id === request.params.id) {
        character = characters[i];
      }
    }
  
    if (character) {
      response.json(character);
    } else {
      response.status(404).json({ message: 'Character not found' });
    }
  },
  async getCuriosities(request, response) {
    const collections = await Content.getColletions();

    let curiosities = [];

    for(let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'curiosities') {
        curiosities = collections[i].collection;
      }
    }
    
    response.json(curiosities);
  }
};