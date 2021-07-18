const Content = require('../models/Content.js');

function groupSaints(collection, group) {
  const groupedCollection = [];

  const filteredCollection = collection.filter(saint => saint.group.includes(group));
          
  const groupCollection = filteredCollection.reduce((accumulator, currentValue) => {
    accumulator[currentValue.class.name] = [...accumulator[currentValue.class.name] || [], currentValue];
    
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

  if (collectionsObjects) {
    for (let j = 0; j < collectionsObjects.collection.length; j++) {
      const collectionsObject = collectionsObjects.collection[j];
  
      const group = `${collectionsObject.group}-${collectionsObject.id}`;
  
      const foundSaint = collection.some(saint => saint.group === group);
      
      if (!foundSaint) newCollection.push({ ...collectionsObject, saints: [] });
    }
  } else {
    console.error(`collectionName ${collectionName} not found in collections`);
  }      

  return newCollection;
}

module.exports = {
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

    let collection = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        collection = collections[i].collection;

        break;
      }
    }
  
    if (request.params.class === 'saints') {
      let withoutConstellations = [{
        name: 'Saints without constellation',
        saints: collection.filter(saint => saint.group === 'athena-unknown-saints'),
      }];

      let gods = [{
        name: 'Gods',
        saints: collection.filter(saint => saint.group === 'athena-gods'),
      }];

      let soldiers = [{
        name: 'Soldiers Saints',
        saints: collection.filter(saint => saint.group === 'athena-soldiers'),
      }];

      let constellations = [
        ...groupSaints(collection, 'athena-saints'),
        ...getRestOfTheCollection(collection, 'constellations', collections),
      ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);

      let formerConstellations = groupSaints(collection, 'athena-former-saints');

      let hinduConstellations = groupSaints(collection, 'athena-hindu-saints');

      let chineseConstellations = groupSaints(collection, 'athena-chinese-saints');

      response.json({
        withoutConstellations,
        gods,
        soldiers,
        constellations,
        formerConstellations,
        hinduConstellations,
        chineseConstellations,
      });
    } else if (request.params.class === 'specters') {
      let faceless = [];
      let representative = [];
      let gods = [];
      let skeletons = [];
      let evilStars = [];
      let otherSpecters = [];

      otherSpecters = groupSaints(collection, 'hades-other-specters');

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
        saints: collection.filter(saint => saint.group === 'hades-gods').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1),
      }];

      skeletons = [{
        name: 'Skeleton soldiers',
        saints: collection.filter(saint => saint.group === 'hades-skeleton'),
      }];

      evilStars = [
        ...groupSaints(collection, 'ial-star'),
        ...getRestOfTheCollection(collection, 'evil-stars', collections),
      ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
  
      response.json({ 
        otherSpecters,
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
  
      response.json({
        gods,
        unknownClass,
        firstClass,
        secondClass,
        thirdClass,
        soldiers,
      });
    } else if (request.params.class === 'angels') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'zeus-gods').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1) }
        ],
        saints: groupSaints(collection, '-angels'),
      });
    } else if (request.params.class === 'berserkers' || request.params.class === 'martians') {
      let gods = [];
      let berserkers = [];
      let martians = [];
      let phantoms = [];

      gods = [{
        name: 'Gods',
        saints: collection.filter(saint => saint.group.includes('ares') && saint.group.includes('gods')),
      }];

      
      phantoms = [{
        name: 'Phantoms', 
        saints: collection.filter(saint => saint.group === 'ares-phantoms')
      }];

      berserkers = [
        ...groupSaints(collection, 'ares-legions'),
        ...getRestOfTheCollection(collection, 'ares-legions', collections)
      ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
          
      martians = [
        { name: 'Mars Representative', saints: collection.filter(saint => saint.group === 'ares-representative-martians') },
        { name: 'Four Heavenly Kings of Mars', saints: collection.filter(saint => saint.group === 'ares-heavenly-kings-martians') },
        { name: 'High Martians', saints: collection.filter(saint => saint.group === 'ares-high-martians') },
        { name: 'Martians', saints: collection.filter(saint => saint.group === 'ares-martians') },
        { name: 'Soldiers', saints: collection.filter(saint => saint.group === 'ares-soldier-martians') },
      ];
  
      response.json({ gods, berserkers, phantoms, martians });
    } else if (request.params.class === 'corona-saints') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'apollo-gods') }
        ],
        saints: [
          { name: 'Corona Saints', saints: collection.filter(saint => saint.group.includes('apollo-saints')) }
        ],
      });
    } else if (request.params.class === 'cyclops') {
      response.json({
        saints: [
          { name: 'Cyclops', saints: collection.filter(saint => saint.group === 'cyclops') },
        ],
      });
    } else if (request.params.class === 'dryads') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'eris-gods') }
        ],
        saints: [
          { name: 'Dryads', saints: collection.filter(saint => saint.group === 'eris-dryads') },
          { name: 'Soldiers', saints: collection.filter(saint => saint.group === 'eris-soldiers') }
        ],
      });
    } else if (request.params.class === 'fairies') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'balor-gods') }
        ],
        saints: [
          { name: 'Fairies', saints: collection.filter(saint => saint.group.includes('balor-fairies')) }
        ],
      });
    } else if (request.params.class === 'gigas') {
      response.json({
        gods: [{ name: 'Gods', saints: collection.filter(saint => saint.group === 'typhon-gods') }],
        sons: groupSaints(collection, 'typhon-sons'),
        brothers: groupSaints(collection, 'typhon-brothers'),
        gigas: groupSaints(collection, 'typhon-gigas'),
      });
    } else if (request.params.class === 'gladiators') {
      response.json({
        king: groupSaints(collection, 'gladiators-king'),
        gladiators: [
          { name: 'Gladiators', saints: collection.filter(saint => saint.group === 'arthur-gladiators') },
        ],
        lowGladiators: groupSaints(collection, 'gladiators-low'),
      });
    } else if (request.params.class === 'god-warriors' || request.params.class === 'blue-warriors') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'odin-gods').sort((a, b) => a.cloth == b.cloth ? 0 : + (a.cloth > b.cloth) || -1) },
        ],
        representatives: [
          { name: 'Odin Representative', saints: collection.filter(saint => saint.group === 'odin-representative') },
          { name: 'Blue Warriors Representative', saints: collection.filter(saint => saint.group === 'odin-blue-warrior-representative') },
        ],
        godWarriors: [
          { name: 'Drbal God Warriors', saints: collection.filter(saint => saint.group === 'odin-drbal-god-warriors') },
          { name: 'Hilda God Warriors', saints: collection.filter(saint => saint.group.includes('ursa-major-star')) },
          { name: 'Andreas God Warriors', saints: collection.filter(saint => saint.group.includes('odin-chamber')) },
          { name: 'Asgard Soldiers', saints: collection.filter(saint => saint.group === 'odin-asgard-soldiers') },
        ],
        blueWarriors: [
          { name: 'Blue Warriors', saints: collection.filter(saint => saint.group === 'odin-blue-warriors') },
          { name: 'Blue Warrior Soldiers', saints: collection.filter(saint => saint.group.includes('odin-blue-warrior-soldiers')) },
        ],
      });
    } else if (request.params.class === 'golden-tribe') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'astraea-gods') },
        ],
        saints: [
          { name: 'Golden Tribe', saints: collection.filter(saint => saint.group === 'astraea-golden-tribe') },
        ],
      });
    } else if (request.params.class === 'jaguars') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'tezcatlipoca-gods') },
        ],
        saints: [
          { name: 'Jaguars', saints: collection.filter(saint => saint.group === 'tezcatlipoca-jaguars') },
          { name: 'Jaguar Soldiers', saints: collection.filter(saint => saint.group === 'tezcatlipoca-jaguar-soldiers') },
        ],
      });
    } else if (request.params.class === 'jewels') {
      response.json({
        saints: [
          { name: 'Jewels', saints: collection.filter(saint => saint.group === 'garnet-jewels').sort((a, b) => a.cloth == b.cloth ? 0 : + (a.cloth < b.cloth) || -1) },
        ],
      });
    } else if (request.params.class === 'lamech-servants') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'lamech-gods') },
        ],
        saints: [
          { name: 'Lamech Servants', saints: collection.filter(saint => saint.group === 'lamech-servants') },
        ],
      });
    } else if (request.params.class === 'legionaries') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'ra-egyptian-gods').sort((a, b) => a.name == b.name ? 0 : + (a.name < b.name) || -1) },
        ],
        saints: [
          { name: 'Ra Legionaries', saints: collection.filter(saint => saint.group === 'ra-legionaries') },
        ],
      });
    } else if (request.params.class === 'mariners') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'poseidon-gods') },
        ],
        saints: [
          { name: 'Mariners Generals', saints: collection.filter(saint => saint.group === 'poseidon-mariners-generals') },
          { name: 'Mariners', saints: collection.filter(saint => saint.group === 'poseidon-mariners') },
          { name: 'Mariner Soldiers', saints: collection.filter(saint => saint.group === 'poseidon-mariner-soldiers') },
        ],
      });
    } else if (request.params.class === 'others') {
      response.json({
        saints: [
          { name: 'Others', saints: collection.filter(saint => saint.group === 'others') },
        ],
      });
    } else if (request.params.class === 'satellites') {
      response.json({
        gods: [
          { name: 'Gods', saints: collection.filter(saint => saint.group === 'artemis-gods') },
        ],
        saints: [
          { name: 'Satellite Representative', saints: collection.filter(saint => saint.group === 'artemis-satellite-representative') },
          { name: 'Satellite Captain', saints: collection.filter(saint => saint.group === 'artemis-satellite-captain') },
          { name: 'Satellites', saints: collection.filter(saint => saint.group === 'artemis-satellites') },
        ],
      });
    } else if (request.params.class === 'taonias') {
      response.json({
        saints: [
          { name: 'Taonias', saints: collection.filter(saint => saint.group === 'hakuryu-taonias') },
          { name: 'High Ranking Taonias', saints: collection.filter(saint => saint.group === 'hakuryu-high-ranking') },
          { name: 'Low Ranking Taonias', saints: collection.filter(saint => saint.group === 'hakuryu-low-ranking') },
        ],
      });
    } else if (request.params.class === 'titans') {
      response.json({
        titans: groupSaints(collection, 'cronus-titans'),
        others: [
          { name: 'Other Titans', saints: collection.filter(saint => saint.group === 'cronus-other-titans') },
        ],
      });
    } else {
      response.status(404).json({ message: `${request.params.class} not found` });
    }
  },
  async getSaint(request, response) {
    const collections = await Content.getColletions();

    let saints = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        saints = collections[i].collection;
        
        break;
      }
    }

    let saint;

    for (let i = 0; i < saints.length; i++) {
      if (request.params.id === saints[i].id) {
        saint = saints[i];

        break;
      }
    }

    if (saint) {
      response.json(saint);
    } else {
      response.status(404).json({ message: `${request.params.class} not found` });
    }
  }
}