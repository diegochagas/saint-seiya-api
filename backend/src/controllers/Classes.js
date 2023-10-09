const Content = require('../models/Content.js');

function groupSaints(collection, group) {
  const groupedCollection = [];

  try {
    const filteredCollection = collection.filter(saint => saint.group.includes(group));

    const groupCollection = filteredCollection.reduce((accumulator, currentValue) => {
      if (currentValue && currentValue.class) {
        accumulator[currentValue.class.name] = [...accumulator[currentValue.class.name] || [], currentValue];
      } else {
        console.log('===================');
        console.error(currentValue)
        console.log('===================');
      }

      return accumulator;
    }, {});

    for (let key in groupCollection) {
      groupedCollection.push({ name: key, saints: groupCollection[key].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)});
    }

    return groupedCollection.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
  } catch (err) {
    console.error(err);
  }
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

  return newCollection.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
}

function orderGroups(groups, order) {
  const orderedGroups = [];

  for (let i = 0; i < order.length; i++) {
    const group = groups.filter(item => item.name.toLowerCase().includes(order[i]));

    if (group) orderedGroups.push(...group);
  }

  return orderedGroups
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
      let unknownSaintsCounter = 0;

      const saints = [...groupSaints(collection, 'athena-saints')]

      saints.forEach(constellation => {
        if(constellation.saints.length > 0) unknownSaintsCounter++;
      });

      response.json([
        {
          title: 'Gods',
          items: [...groupSaints(collection, 'athena-gods')],
        },
        {
          title: `88 Athena Saints (${unknownSaintsCounter} appeared)`,
          items: [
            ...saints,
            ...getRestOfTheCollection(collection, 'constellations', collections),
          ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)
        },
        {
          title: 'Saints with former constellations',
          items: [...groupSaints(collection, 'athena-former-saints')]
        },
        {
          title: 'Saints with Hindu constellations',
          items: [...groupSaints(collection, 'athena-hindu-saints')]
        },
        {
          title: 'Saints with Chinese constellations',
          items: [...groupSaints(collection, 'athena-chinese-saints')]
        },
        {
          title: 'Saints without constellation',
          items: [...groupSaints(collection, 'athena-unknown-saints')]
        },
        {
          title: 'Soldiers Saints',
          items: [...groupSaints(collection, 'athena-soldiers')]
        },
      ]);
    } else if (request.params.class === 'specters') {
      let unknownSpectersCounter = 0;

      const specters = [...groupSaints(collection, 'ial-star')]

      specters.forEach(evilStar => {
        if(evilStar.saints.length > 0) unknownSpectersCounter++;
      });

      response.json([
        {
          title: 'Gods',
          items: [...groupSaints(collection, 'hades-gods')],
        },
        {
          title: 'Hades Representative',
          items: [...groupSaints(collection, 'hades-representative')]
        },
        {
          title: `108 Hades Specters (${unknownSpectersCounter} appeared)`,
          items: [
            ...specters,
            ...getRestOfTheCollection(collection, 'evil-stars', collections),
          ].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)
        },
        {
          title: 'Other Specters',
          items: [...groupSaints(collection, 'hades-other-specters').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)]
        },
        {
          title: 'Skeleton soldiers',
          items: [...groupSaints(collection, 'hades-skeleton')]
        },
        {
          title: 'Pluto Faceless',
          items: [...groupSaints(collection, 'hades-faceless')]
        },
      ]);
    } else if (request.params.class === 'pallasites') {
      response.json([
        {
          title: 'Gods',
          items: [...groupSaints(collection, 'pallas-gods').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)],
        },
        {
          title: 'First class pallasites',
          items: [...groupSaints(collection, 'pallas-weapon-firstclass').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)],
        },
        {
          title: 'Second class pallasites',
          items: [
            ...groupSaints(collection, 'pallas-weapon-secondclass').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1),
            ...groupSaints(collection, 'pallas-unknown-secondclass')
          ],
        },
        {
          title: 'Third class pallasites',
          items: [...groupSaints(collection, 'pallas-weapon-thirdclass').sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)],
        },
        {
          title: 'Unknown Class',
          items: [...groupSaints(collection, 'pallas-unknown-unknownclass')],
        },
        {
          title: 'Soldiers',
          items: [...groupSaints(collection, 'pallas-pallasite-soldiers')],
        },
      ]);
    } else if (request.params.class === 'olympus') {
      response.json([
        {
          title: "Olympus",
          items: [
            ...orderGroups(groupSaints(collection, 'zeus'), ['gods', 'angels', 'fallen-angels']),
          ]
        }
      ]);
    } else if (request.params.class === 'berserkers' || request.params.class === 'martians') {
      response.json([
        {
          title: "Berserkers",
          items: [
            ...orderGroups(groupSaints(collection, 'ares'), ['gods', 'legion']),
            ...getRestOfTheCollection(collection, 'ares-legions', collections),
          ],
        },
        {
          title: "Martians",
          items: [
            ...orderGroups(groupSaints(collection, 'mars'), ['gods', 'representative', 'heavenly', 'martians', 'soldier'])
          ]
        }
      ]);
    } else if (request.params.class === 'corona-saints') {
      response.json([
        {
          title: 'Corona Saints',
          items: [
            ...orderGroups(groupSaints(collection, 'abel'), ['gods', 'constellation']),
          ],
        },
      ]);
    } else if (request.params.class === 'cyclops') {
      response.json([
        {
          title: 'Cyclops',
          items: [ ...groupSaints(collection, 'cyclops')],
        },
      ]);
    } else if (request.params.class === 'dryads') {
      response.json([
        {
          title: 'Dryads',
          items: [
            ...orderGroups(groupSaints(collection, 'eris'), ['gods', 'phantoms', 'dryads', 'soldiers']),
          ],
        },
      ]);
    } else if (request.params.class === 'fairies') {
      response.json([
        {
          title: 'Fairies',
          items: [
            ...orderGroups(groupSaints(collection, 'balor'), ['gods', 'fairies']),
          ],
        },
      ]);
    } else if (request.params.class === 'gigas') {
      response.json([
        {
          title: 'Gods',
          items: [
            ...groupSaints(collection, 'typhon-gods'),
          ],
        },
        {
          title: 'Typhon brothers',
          items: [
            ...groupSaints(collection, 'typhon-brothers'),
          ],
        },
        {
          title: 'Typhon sons',
          items: [
            ...groupSaints(collection, 'typhon-sons'),
          ],
        },
        {
          title: 'Cronus gigas',
          items: [
            ...groupSaints(collection, 'typhon-gigas'),
          ],
        },
      ]);
    } else if (request.params.class === 'gladiators') {
      response.json([
        {
          title: 'Gladiators',
          items: [
            ...orderGroups(groupSaints(collection, 'arthur'), ['king', 'gladiators', 'low']),
          ],
        },
      ]);
    } else if (request.params.class === 'god-warriors' || request.params.class === 'blue-warriors') {
      response.json([
        {
          title: 'Blue warriors',
          items: [
            ...orderGroups(groupSaints(collection, 'blue-warrior'), ['representative', 'warriors', 'low', 'soldiers']),
          ],
        },
        {
          title: 'Gods',
          items: [
            ...groupSaints(collection, 'odin-gods'),
          ],
        },
        {
          title: 'Drbal god warriors',
          items: [
            ...orderGroups(groupSaints(collection, 'odin-god-warriors'), ['representative', 'warriors']),
          ],
        },
        {
          title: 'Hilda god warriors',
          items: [
            ...orderGroups(groupSaints(collection, 'odin-ursa-major'), ['representative', 'star']),
          ],
        },
        {
          title: 'Andreas god warriors',
          items: [
            ...orderGroups(groupSaints(collection, 'odin-chamber'), ['representative', 'chamber']),
          ],
        },
        {
          title: 'Asgard soldiers',
          items: [
            ...groupSaints(collection, 'odin-asgard-soldiers'),
          ],
        },
      ]);
    } else if (request.params.class === 'golden-tribe') {
      response.json([
        {
          title: 'Golden Tribe',
          items: [
            ...orderGroups(groupSaints(collection, 'astraea'), ['gods', 'golden']),
          ],
        },
      ]);
    } else if (request.params.class === 'jaguars') {
      response.json([
        {
          title: 'Jaguars',
          items: [
            ...orderGroups(groupSaints(collection, 'tezcatlipoca'), ['gods', 'jaguars', 'soldiers'	]),
          ],
        },
      ]);
    } else if (request.params.class === 'jewels') {
      response.json([
        {
          title: 'Jewels',
          items: [
            ...orderGroups(groupSaints(collection, 'garnet'), ['leader', 'jewels'	]),
          ],
        },
      ]);
    } else if (request.params.class === 'lamech-servants') {
      response.json([
        {
          title: 'Lamech Servants',
          items: [
            ...orderGroups(groupSaints(collection, 'lamech'), ['gods', 'servants']),
          ],
        },
      ]);
    } else if (request.params.class === 'legionaries') {
      response.json([
        {
          title: 'Legionaries',
          items: [
            ...orderGroups(groupSaints(collection, 'ra-'), ['gods', 'legionaries']),
          ],
        },
      ]);
    } else if (request.params.class === 'mariners') {
      response.json([
        {
          title: 'Mariners',
          items: [
            ...orderGroups(groupSaints(collection, 'poseidon'), ['gods', 'generals', 'mariners', 'soldiers']),
          ],
        },
      ]);
    } else if (request.params.class === 'others') {
      response.json([
        {
          title: 'Others',
          items: [
            ...groupSaints(collection, 'other-characters'),
          ],
        },
      ]);
    } else if (request.params.class === 'satellites') {
      response.json([
        {
          title: 'Satellites',
          items: [
            ...orderGroups(groupSaints(collection, 'artemis'), ['gods', 'representative', 'captain', 'satellites']),
          ],
        },
      ]);
    } else if (request.params.class === 'taonias') {
      response.json([
        {
          title: 'Taonias',
          items: [
            ...orderGroups(groupSaints(collection, 'hakuryu'), ['gods', 'taonias', 'high', 'low']),
          ],
        },
      ]);
    } else if (request.params.class === 'anunnakis') {
      response.json([
        {
          title: 'Anunnakis',
          items: [
            ...orderGroups(groupSaints(collection, 'apsu'), ['anunnakis', 'weapons']),
          ],
        },
      ]);
    } else if (request.params.class === 'titans') {
      response.json([
        {
          title: '12 Titans',
          items: [
            ...groupSaints(collection, 'cronus-titans'),
          ],
        },
        {
          title: 'Titan Soldiers',
          items: [
            ...groupSaints(collection, 'cronus-titan-soldiers'),
          ],
        },
        {
          title: 'Others',
          items: [
            ...groupSaints(collection, 'cronus-other'),
          ],
        },
      ]);
    } else {
      response.status(404).json({ message: `${request.params.class} not found in Classes Controler` });
    }
  },
  async getClassesByArtist(request, response) {
    const collections = await Content.getColletions();

    let saints = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        saints = collections[i].collection;
      }
    }

    let artists = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'artists') {
        artists = collections[i].collection;
      }
    }

    let saintsByArtist = []

    if(request.params.id === '0') {
      saintsByArtist = saints.filter(saint => saint.artistSaint === "" || saint.artistCloth === "");

      response.json(saintsByArtist);
    } else {
      let artist;

      for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === request.params.id) {
          artist = artists[i];
        }
      }

      if (artist) {
        const saintsByArtist = saints.filter(saint => artist.id === saint.artistSaint || artist.id === saint.artistCloth);

        response.json(saintsByArtist);
      } else {
        response.status(404).json({ message: 'Artist not found' });
      }
    }
  },
  async getClassesByDebut(request, response) {
    const collections = await Content.getColletions();

    let saints = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'saints') {
        saints = collections[i].collection;
      }
    }

    let debuts = [];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].collectionPath === 'debuts') {
        debuts = collections[i].collection;
      }
    }

    let saintsByDebut = []

    if(request.params.id === '0') {
      saintsByDebut = saints.filter(saint => saint.debut === "");

      response.json(saintsByDebut);
    } else {
      let debut;

      for (let i = 0; i < debuts.length; i++) {
        if (debuts[i].id === request.params.id) {
          debut = debuts[i];
        }
      }

      if (debut) {
        const saintsByDebut = saints.filter(saint => debut.name === saint.debut && debut.midia === saint.midia);

        response.json(saintsByDebut);
      } else {
        response.status(404).json({ message: 'Debut not found' });
      }
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
