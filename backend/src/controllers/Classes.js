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

          constellations = [
            ...groupSaints(collection, 'athena-constellations'),
            ...getRestOfTheCollection(collection, 'constellations', collections),
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
    }  else if (request.params.class === 'angels') {
      let gods = [];
      let angels = [];
      let fallenAngels = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'zeus-gods'),
          }];

          angels = [{
            name: 'Angels',
            saints: collection.filter(saint => saint.group === 'zeus-angels'),
          }];

          fallenAngels = [{
            name: 'Fallen Angels',
            saints: collection.filter(saint => saint.group === 'zeus-fallen-angels'),
          }];
        }
      }
  
      response.json({ gods, angels, fallenAngels });
    }  else if (request.params.class === 'berserkers') {
      let gods = [];
      let disasterLegion = [];
      let fearLegion = [];
      let fireLegion = [];
      let flameLegion = [];
      let marsRepresentative = [];
      let heavenlyKings = [];
      let highMartians = [];
      let martians = [];
      let soldiers = [];
      
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].collectionPath === 'saints') {
          const { collection } = collections[i];

          gods = [{
            name: 'Gods',
            saints: collection.filter(saint => saint.group === 'ares-gods'),
          }];

          disasterLegion = [{
            name: 'Legion Of Disaster',
            saints: collection.filter(saint => saint.group === 'ares-disaster-legion'),
          }];

          fearLegion = [{
            name: 'Legion Of Fear',
            saints: collection.filter(saint => saint.group === 'ares-fear-legion'),
          }];

          fireLegion = [{
            name: 'Legion Of Fire',
            saints: collection.filter(saint => saint.group === 'ares-fire-legion'),
          }];
          
          flameLegion = [{
            name: 'Legion Of Flame',
            saints: collection.filter(saint => saint.group === 'ares-flame-legion'),
          }];

          marsRepresentative = [{
            name: 'Mars Representative',
            saints: collection.filter(saint => saint.group === 'ares-mars-representative'),
          }];
          
          heavenlyKings = [{
            name: 'Four Heavenly Kings of Mars',
            saints: collection.filter(saint => saint.group === 'ares-heavenly-kings'),
          }];
          
          highMartians = [{
            name: 'High Martians',
            saints: collection.filter(saint => saint.group === 'ares-high-martians'),
          }];
          
          martians = [{
            name: 'Martians',
            saints: collection.filter(saint => saint.group === 'ares-martians'),
          }];
          
          soldiers = [{
            name: 'Martian Soldiers',
            saints: collection.filter(saint => saint.group === 'ares-martian-soldiers'),
          }];
        }
      }
  
      response.json({
        gods,
        disasterLegion,
        fearLegion,
        fireLegion,
        flameLegion,
        marsRepresentative,
        heavenlyKings,
        highMartians,
        martians,
        soldiers,
      });
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