const Content = require('../models/Content.js');

function groupSaints(collection, groupName) {
  const groupedCollection = [];

  const filteredCollection = collection.filter(saint => saint.group.includes(groupName));
          
  const groupCollection = filteredCollection.reduce((accumulator, currentValue) => {
    accumulator[currentValue.groupName] = [...accumulator[currentValue.groupName] || [], currentValue];
    
    return accumulator;
  }, {});

  for (let key in groupCollection) {
    groupedCollection.push({ name: key, saints: groupCollection[key]});
  }

  return groupedCollection.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
}

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
  
    if (request.params.class === 'saints') {
      let withoutConstellations = [];
      let gods = [];
      let apprentices = [];
      let soldiers = [];
      let constellations = [];
      let formerConstellations = [];
      let hinduConstellations = [];
      let chineseConstellations = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          withoutConstellations = [{
            name: 'Saints without constellation',
            saints: collection.filter(saint => saint.group === 'athena-without-constellations'),
          }];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'athena-gods'),
          }];
          
          apprentices = [{
            name: 'Apprentices Saints',
            saints: collection.filter(saint => saint.group === 'athena-apprentices'),
          }];

          soldiers = [{
            name: 'Soldiers Saints',
            saints: collection.filter(saint => saint.group === 'athena-soldiers'),
          }];

          const collectionConstellations = collections.find(item => item.collectionPath === 'constellations');
          
          for (let j = 0; j < collectionConstellations.collection.length; j++) {
            const collectionConstellation = collectionConstellations.collection[j];

            const group = `${collectionConstellation.group}-${collectionConstellation.id}`;

            const foundConstellation = collection.some(saint => saint.group === group);
            
            if (!foundConstellation) constellations.push({ ...collectionConstellation, saints: [] });
          }

          constellations = [
            ...groupSaints(collection, 'athena-constellations'),
            ...constellations,
          ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
          formerConstellations = groupSaints(collection, 'athena-former-constellations');
          hinduConstellations = groupSaints(collection, 'athena-hindu-constellations');
          chineseConstellations = groupSaints(collection, 'athena-chinese-constellations');
        }
      }
  
      response.json({
        withoutConstellations,
        gods,
        apprentices,
        soldiers,
        constellations,
        formerConstellations,
        hinduConstellations,
        chineseConstellations,
      });
    } else if (request.params.class === 'evil-stars') {
      let evilStars = [];
      
      let otherEvilStars = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'evilStars') {
          evilStars = collections[i].collection.slice(0, 108);

          otherEvilStars = collections[i].collection.slice(108);
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