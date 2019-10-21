const Content = require('../models/Content.js');

module.exports = {
  async getClassNames(request, response) {
    const collections = await Content.getColletions();

    let classNames = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'classNames') {
        classNames = collections[i].collection;
      }
    }

    response.json(classNames);
  },
  async getAllClasses(request, response) {
    const collections = await Content.getColletions();

    let saints = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        saints = collections[i].collection;
      }
    }
  
    response.json(saints);
  },
  async getClassSaints(request, response) {
    const collections = await Content.getColletions();

    let allSaints = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        allSaints = collections[i].collection;
      }
    }

    let saints = [];

    for (let i = 0; i < allSaints.length; i++) {
      if (request.params.class === allSaints[i].class.toLowerCase().replace(' ', '-')) {
        saints.push(allSaints[i]);
      }
    }
  
    if (request.params.class === 'constellations') {
      let modernConstellations = [];

      let otherConstellations = [];

      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'constellations') {
          modernConstellations = collections[i].collection.slice(0, 88);

          otherConstellations = collections[i].collection.slice(88);
        }
      }
  
      response.json({ modernConstellations, otherConstellations });
    } else if (request.params.class === 'evil-stars') {
      let evilStars = [];
      
      let otherEvilStars = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'evilStars') {
          modernConstellations = collections[i].collection.slice(0, 108);

          otherConstellations = collections[i].collection.slice(108);
        }
      }
  
      response.json({ evilStars, otherEvilStars });
    } else if (saints) {
      response.json(saints);
    } else {
      response.status(404).json({ message: `${request.params.class} not found` });
    }
  },
  async getSaint(request, response) {
    const collections = await Content.getColletions();

    let allSaints = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        allSaints = collections[i].collection;
      }
    }

    let saints = [];

    for (let i = 0; i < allSaints.length; i++) {
      if (request.params.class === allSaints[i].class.toLowerCase().replace(' ', '-')) {
        saints.push(allSaints[i]);
      }
    }

    if (request.params.class.includes('constellation')) {
      let constellations = [];

      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'constellations') {
          constellations = collections[i].collection;
        }
      }

      let constellation;

      for (let i = 0; i < constellations.length; i++) {
        if (constellations[i].id === request.params.id) {
          constellation = constellations[i];
        }
      }

      if (constellation) {
        response.json(constellation);
      } else {
        response.status(404).json({ message: `Constellation not found` });
      }
    } else if (request.params.class.includes('evil-star')) {
      let evilStars = [];

      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'evilStars') {
          evilStars = collections[i].collection;
        }
      }

      let evilStar;

      for (let i = 0; i < evilStars.length; i++) {
        if (evilStars[i].id === request.params.id) {
          evilStar = evilStars[i];
        }
      }

      if (evilStar) {
        response.json(evilStar);
      } else {
        response.status(404).json({ message: `Evil star not found` });
      }
    } else if (saints) {
      let saint;

      for (let i = 0; i < saints.length; i++) {
        if (request.params.id === saints[i].id) {
          saint = saints[i];
        }
      }
  
      if (saint) {
        response.json(saint);
      } else {
        response.status(404).json({ message: `${request.params.class} not found` });
      }
    } else {
      response.status(404).json({ message: `${request.params.class} not found` });
    }
  }
}