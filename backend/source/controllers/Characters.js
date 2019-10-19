const Content = require('../models/Content.js');

module.exports = {
  async getCharacters(request, response) {
    const content = await Content.load();
    
    const characters = [];

    for (let i = 0; i < content.characters.length; i++) {
      characters.push(await Content.buildCharacter(content.characters[i]));
    }
  
    response.json({ characters });
  },
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
  async getCuriosities(request, response) {
    const content = await Content.load();

    response.json(content.curiosities);
  } 
};