const Content = require('../models/Content.js');

module.exports = {
  async getDebuts(request, response) {
    const collections = await Content.getColletions();

    let debuts = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'debuts') {
        debuts = collections[i].collection;
      }
    }
    
    response.json(debuts);
  },
  async getDebut(request, response) {
    const collections = await Content.getColletions();

    let debuts = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'debuts') {
        debuts = collections[i].collection;
      }
    }

    let debut;

    for (let i = 0; i < debuts.length; i++) {
      if (debuts[i].id === request.params.id) {
        debut = debuts[i];
      }
    }
  
    if (debut) {
      response.json(debut);
    } else {
      response.status(404).json({ message: 'Debut not found' });
    }
  }  
};