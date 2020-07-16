const Content = require('../models/Content.js');

function groupSaints(collection, group) {
  const groupedCollection = [];

  const filteredCollection = collection.filter(saint => saint.group.includes(group));
          
  const groupCollection = filteredCollection.reduce((accumulator, currentValue) => {
    accumulator[currentValue.groupName] = [...accumulator[currentValue.groupName] || [], currentValue];
    
    return accumulator;
  }, {});

  for (let key in groupCollection) {
    groupedCollection.push({ name: key, saints: groupCollection[key]});
  }

  return groupedCollection.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
}

function getRestOfTheCollection(collection, collectionName, collections) {
  const newCollection = [];
  
  const collectionsObjects = collections.find(item => item.collectionPath === collectionName);
          
  for (let j = 0; j < collectionsObjects.collection.length; j++) {
    const collectionsObject = collectionsObjects.collection[j];

    const group = `${collectionsObject.group}-${collectionsObject.id}`;

    const foundSaint = collection.some(saint => saint.group === group);
    
    if (!foundSaint) newCollection.push({ ...collectionsObject, saints: [] });
  }

  return newCollection;
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
      if (allSaints[i].class) {
        if (request.params.class === allSaints[i].class.toLowerCase().replace(' ', '-')) {
          saints.push(allSaints[i]);
        }
      } else {
        console.error(`Class of the saint ${JSON.stringify(allSaints[i])} is ${allSaints[i].class}`);
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
            saints: collection.filter(saint => saint.group === 'athena-unknown-saints'),
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

          constellations = [
            ...groupSaints(collection, 'athena-saints'),
            ...getRestOfTheCollection(collection, 'constellations', collections),
          ].sort((a, b) => a.groupName == b.groupName ? 0 : + (a.groupName > b.name) || -1);
          formerConstellations = groupSaints(collection, 'athena-former-saints');
          hinduConstellations = groupSaints(collection, 'athena-hindu-saints');
          chineseConstellations = groupSaints(collection, 'athena-chinese-saints');
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
    } else if (request.params.class === 'specters') {
      let unknownEvilStar = [];
      let faceless = [];
      let representative = [];
      let gods = [];
      let skeletons = [];
      let evilStars = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          unknownEvilStar = [{
            name: 'Specters with unknown evil star',
            saints: collection.filter(saint => saint.group === 'hades-unknown-evil-star'),
          }];

          faceless = [{
            name: 'Pluto Faceless',
            saints: collection.filter(saint => saint.group === 'hades-faceless'),
          }];

          representative = [{
            name: 'Hades Representative',
            saints: collection.filter(saint => saint.group === 'hades-representative'),
          }];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'hades-gods'),
          }];

          skeletons = [{
            name: 'Hades skeleton soldiers',
            saints: collection.filter(saint => saint.group === 'hades-skeleton'),
          }];

          evilStars = [
            ...groupSaints(collection, 'ial-star'),
            ...getRestOfTheCollection(collection, 'evil-stars', collections),
          ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
        }
      }
  
      response.json({ 
        unknownEvilStar,
        faceless,
        representative,
        gods,
        skeletons,
        evilStars,
      });
    } else if (request.params.class === 'pallasites') {
      let gods = [];
      let soldiers = [];
      let unknownClass = [];
      let firstClass = [];
      let secondClass = [];
      let thirdClass = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'pallas-gods'),
          }];

          firstClass = groupSaints(collection, 'pallas-weapon-firstclass');

          secondClass = [
            ...groupSaints(collection, 'pallas-weapon-secondclass'), {
              name: 'Unknown Weapon',
              saints: collection.filter(saint => saint.group === 'pallas-unknown-secondclass'),
          }];

          thirdClass = groupSaints(collection, 'pallas-weapon-thirdclass');

          unknownClass = [{
            name: 'Unknown Class',
            saints: collection.filter(saint => saint.group === 'pallas-unknown-unknownclass'),
          }];

          soldiers = [{
            name: 'Pallasite Soldiers',
            saints: collection.filter(saint => saint.group === 'pallas-pallasite-soldiers'),
          }];
        }
      }
  
      response.json({
        gods,
        unknownClass,
        firstClass,
        secondClass,
        thirdClass,
        soldiers,
      });
    } else if (request.params.class === 'angels') {
      let gods = [];
      let saints = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'zeus-gods'),
          }];

          saints = groupSaints(collection, '-angels');
        }
      }
  
      response.json({ gods, saints });
    } else if (request.params.class === 'berserkers') {
      let gods = [];
      let berserkers = [];
      let martians = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group.includes('ares') && saint.group.includes('gods')),
          }];

          berserkers = groupSaints(collection, '-legion').filter(saints => saints.name.includes('Legion Of'));
          
          martians = [
            { name: 'Mars Representative', saints: collection.filter(saint => saint.group === 'ares-representative-martians') },
            { name: 'Four Heavenly Kings of Mars', saints: collection.filter(saint => saint.group === 'ares-heavenly-kings-martians') },
            { name: 'High Martians', saints: collection.filter(saint => saint.group === 'ares-high-martians') },
            { name: 'Martians', saints: collection.filter(saint => saint.group === 'ares-martians') },
            { name: 'Soldiers', saints: collection.filter(saint => saint.group === 'ares-soldier-martians') },
          ];
        }
      }
  
      response.json({
        gods,
        berserkers,
        martians,
      });
    } else if (request.params.class === 'corona-saints') {
      let gods = [];
      let saints = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'apollo-gods'),
          }];

          saints = [{
            name: 'Corona Saints',
            saints: collection.filter(saint => saint.group.includes('apollo-saints')),
          }];
        }
      }
  
      response.json({ gods, saints });
    } else if (request.params.class === 'dryads') {
      let gods = [];
      let saints = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'eris-gods'),
          }];

          saints = [
            { name: 'Dryads', saints: collection.filter(saint => saint.group.includes('eris-dryads')) },
            { name: 'Phantoms', saints: collection.filter(saint => saint.group.includes('eris-phantoms')) }
          ];
        }
      }
  
      response.json({ gods, saints });
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
      if (allSaints[i].group.toLowerCase().includes(request.params.class)) {
        saints.push(allSaints[i]);
      }
    }

    if (saints) {
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