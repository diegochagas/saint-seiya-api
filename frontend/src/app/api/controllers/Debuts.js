const Content = require('../models/Content.js');

export function getDebuts() {
  const collections = Content.getColletions();

  let debuts = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'debuts') {
      debuts = collections[i].collection;
    }
  }

  return debuts;
}

export function getDebut(id) {
  const collections = Content.getColletions();

  let debuts = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'debuts') {
      debuts = collections[i].collection;
    }
  }

  let debut;

  for (let i = 0; i < debuts.length; i++) {
    if (debuts[i].id === id) {
      debut = debuts[i];
    }
  }

  if (debut) {
    return debut;
  } else {
    return { message: 'Debut not found' };
  }
}
