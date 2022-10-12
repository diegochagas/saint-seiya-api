const Content = require('../models/Content.js');

export function getCharacters() {
  const collections = Content.getColletions();

  let characters = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'characters') {
      characters = collections[i].collection;
    }
  }

  return characters.filter(character => !!character.name);
}

export function getCharacter(id) {
  const collections = Content.getColletions();

  let characters = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'characters') {
      characters = collections[i].collection;
    }
  }

  let character;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].id === id) {
      character = characters[i];
    }
  }

  if (character) {
    return character;
  } else {
    return { message: 'Character not found' };
  }
}

export function getCuriosities() {
  const collections = Content.getColletions();

  let curiosities = [];

  for(let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'curiosities') {
      curiosities = collections[i].collection;
    }
  }

  return curiosities;
}
