const artistsData = require('../../../api/artists.json');
const attackersData = require('../../../api/attackers.json');
const attacksData = require('../../../api/attacks.json');
const charactersData = require('../../../api/characters.json');
const classNamesData = require('../../../api/classNames.json');
const clothesData = require('../../../api/clothes.json');
const curiositiesData = require('../../../api/curiosities.json');
const debutsData = require('../../../api/debuts.json');
const familyMembersData = require('../../../api/familyMembers.json');
const groupsAbelData = require('../../../api/groupsAbel.json');
const groupsApsuData = require('../../../api/groupsApsu.json');
const groupsAresData = require('../../../api/groupsAres.json');
const groupsArtemisData = require('../../../api/groupsArtemis.json');
const groupsArthurData = require('../../../api/groupsArthur.json');
const groupsAstraeaData = require('../../../api/groupsAstraea.json');
const groupsAthenaData = require('../../../api/groupsAthena.json');
const groupsBalorData = require('../../../api/groupsBalor.json');
const groupsCronusData = require('../../../api/groupsCronus.json');
const groupsCyclopsData = require('../../../api/groupsCyclops.json');
const groupsErisData = require('../../../api/groupsEris.json');
const groupsGarnetData = require('../../../api/groupsGarnet.json');
const groupsHadesData = require('../../../api/groupsHades.json');
const groupsHakuryuData = require('../../../api/groupsHakuryu.json');
const groupsLamechData = require('../../../api/groupsLamech.json');
const groupsOdinData = require('../../../api/groupsOdin.json');
const groupsOthersData = require('../../../api/groupsOthers.json');
const groupsPallasData = require('../../../api/groupsPallas.json');
const groupsPoseidonData = require('../../../api/groupsPoseidon.json');
const groupsRaData = require('../../../api/groupsRa.json');
const groupsTezcatlipocaData = require('../../../api/groupsTezcatlipoca.json');
const groupsTyphonData = require('../../../api/groupsTyphon.json');
const groupsZeusData = require('../../../api/groupsZeus.json');
const kinshipsData = require('../../../api/kinships.json');
const mastersData = require('../../../api/masters.json');
const midiasData = require('../../../api/midias.json');
const nationalitiesData = require('../../../api/nationality.json');
const placesData = require('../../../api/places.json');
const ranksData = require('../../../api/ranks.json');
const saintsData = require('../../../api/saints.json');

const { loadCharacterData } = require('../characters/characters.controllers')

export const noSchemeImage = "assets/cloth-schemes/others/no-scheme.png";

const getGroup = (groups, saint) => {
  try {
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];

      if (saint.group === `${group.group}-${group.id}`) return group;
      else if (saint.group === group.group) return group;
    }
  } catch (e) {
    console.error(e);
  }
}

export const loadSaintData = (saintObject) => {
  const saint = Object.assign({}, saintObject);

  const characterId = saint.name;

  saint.characterId = characterId;

  charactersData.forEach(character => {
    if (character.id === saint.name) {
      saint.name = character.name;
    }
  });

  clothesData.forEach(cloth => {
    if (cloth.id === saint.cloth) {
      saint.cloth = cloth.name;
    }
  });

  let group;

  if (saint.group.includes('abel')) group = getGroup(groupsAbelData, saint);
  if (saint.group.includes('apsu')) group = getGroup(groupsApsuData, saint);
  if (saint.group.includes('ares') || saint.group.includes('mars')) group = getGroup(groupsAresData, saint);
  if (saint.group.includes('artemis')) group = getGroup(groupsArtemisData, saint);
  if (saint.group.includes('arthur')) group = getGroup(groupsArthurData, saint);
  if (saint.group.includes('astraea')) group = getGroup(groupsAstraeaData, saint);
  if (saint.group.includes('athena')) group = getGroup(groupsAthenaData, saint);
  if (saint.group.includes('balor')) group = getGroup(groupsBalorData, saint);
  if (saint.group.includes('cronus')) group = getGroup(groupsCronusData, saint);
  if (saint.group.includes('cyclops')) group = getGroup(groupsCyclopsData, saint);
  if (saint.group.includes('eris')) group = getGroup(groupsErisData, saint);
  if (saint.group.includes('garnet')) group = getGroup(groupsGarnetData, saint);
  if (saint.group.includes('hades')) group = getGroup(groupsHadesData, saint);
  if (saint.group.includes('hakuryu')) group = getGroup(groupsHakuryuData, saint);
  if (saint.group.includes('lamech')) group = getGroup(groupsLamechData, saint);
  if (saint.group.includes('odin') || saint.group.includes('blue-warrior')) group = getGroup(groupsOdinData, saint);
  if (saint.group.includes('other-characters')) group = getGroup(groupsOthersData, saint);
  if (saint.group.includes('pallas')) group = getGroup(groupsPallasData, saint);
  if (saint.group.includes('poseidon')) group = getGroup(groupsPoseidonData, saint);
  if (saint.group.includes('ra-')) group = getGroup(groupsRaData, saint);
  if (saint.group.includes('tezcatlipoca')) group = getGroup(groupsTezcatlipocaData, saint);
  if (saint.group.includes('typhon')) group = getGroup(groupsTyphonData, saint);
  if (saint.group.includes('zeus')) group = getGroup(groupsZeusData, saint);

  if (group) {
    saint.class = group;
  } else {
    console.error(`Error:
      Saint id ${saint.id} with name ${saint.name || 'undefined'} from group ${saint.group || 'undefined'} not found, group is ${group}
    `);
  }

  ranksData.forEach(rank => {
    if (rank.id === saint.rank) {
      saint.rank = rank.name;
    }
  });

  charactersData.forEach(character => {
    if (character.id === saint.affiliation) {
      saint.affiliation = character;
    }
  });

  saint.image = saint.image || noSchemeImage;

  saint.artists = [];

  artistsData.find(artist => {
    if (saint.artistSaint === artist.id) {
      saint.artists.push({ details: artist, type: 'saint' });
    }

    if (saint.artistCloth === artist.id) {
      saint.artists.push({ details: artist, type: 'cloth' });
    }
  });

  saint.attacks = [];

  attackersData.forEach(attacker => {
    if (attacker.character === characterId) {
      const attack = attacksData.find(attack => attack.id === attacker.attack);

      saint.attacks.push(attack.name);
    }
  });

  debutsData.forEach(debut => {
    if (debut.id === saint.debut) {
      midiasData.forEach(midia => {
        if (midia.id === debut.midia) {
          saint.debut = debut.name;

          saint.midia = midia.name;
        }
      });
    }
  });

  return saint;
}

const loadDebutsData = () => {
  return debutsData.map(debutObject => {
    const debut = Object.assign({}, debutObject);

    const midia = midiasData.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    return debut;
  });
}

const getColletions = () => {
  const collections = [];

  collections.push({ collectionPath: 'artists', collection: artistsData });

  collections.push({ collectionPath: 'characters', collection: charactersData.map(character => loadCharacterData(character)) });

  collections.push({ collectionPath: 'curiosities', collection: curiositiesData });

  collections.push({ collectionPath: 'saints', collection: saintsData.map(saint => loadSaintData(saint)) });

  collections.push({
    collectionPath: 'constellations',
    collection: groupsAthenaData.filter(group => group.group === 'athena-saints'),
  });

  collections.push({
    collectionPath: 'evil-stars',
    collection: groupsHadesData.filter(group => group.group === 'hades-celestial-star' ||
      group.group === 'hades-terrestrial-star'),
  });

  collections.push({
    collectionPath: 'ares-legions',
    collection: groupsAresData.filter(group => group.group.includes('ares-legions')),
  });

  collections.push({ collectionPath: 'debuts', collection: loadDebutsData() });

  return collections;
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

function groupSaints(group) {
  const groupedSaints = [];

  try {
    const filteredSaints = saintsData.filter(saint => saint.group.includes(group));

    const groupFilteredSaints = filteredSaints.reduce((accumulator, currentValue) => {
      if (currentValue && currentValue.class) {
        accumulator[currentValue.class.name] = [...accumulator[currentValue.class.name] || [], currentValue];
      } else {
        console.log('===================');
        console.error(currentValue)
        console.log('===================');
      }

      return accumulator;
    }, {});

    for (let key in groupFilteredSaints) {
      groupedSaints.push({ name: key, saints: groupFilteredSaints[key].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)});
    }

    return groupedSaints.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
  } catch (err) {
    console.error(err);
  }
}

function orderGroups(groups, order) {
  const orderedGroups = [];

  for (let i = 0; i < order.length; i++) {
    const group = groups.filter(item => item.name.toLowerCase().includes(order[i]));

    if (group) orderedGroups.push(...group);
  }

  return orderedGroups
}

export function getAllClasses() {
  const collections = getColletions();

  let saintsFullData = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'saints') {
      saintsFullData = collections[i].collection;
    }
  }

  return saintsFullData;
}

export function getClassSaints(className) {
  const collections = getColletions();

  let collection = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'saints') {
      collection = collections[i].collection;

      break;
    }
  }

  if (className === 'saints') {
    let unknownSaintsCounter = 0;

    const saints = [...groupSaints(collection, 'athena-saints')]

    saints.forEach(constellation => {
      if(constellation.saints.length > 0) unknownSaintsCounter++;
    });

    return [
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
    ];
  } else if (className === 'specters') {
    let unknownSpectersCounter = 0;

    const specters = [...groupSaints(collection, 'ial-star')]

    specters.forEach(evilStar => {
      if(evilStar.saints.length > 0) unknownSpectersCounter++;
    });

    return [
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
    ];
  } else if (className === 'pallasites') {
    return [
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
    ];
  } else if (className === 'olympus') {
    return [
      {
        title: "Olympus",
        items: [
          ...orderGroups(groupSaints(collection, 'zeus'), ['gods', 'angels', 'fallen-angels']),
        ]
      }
    ];
  } else if (className === 'berserkers' || className === 'martians') {
    return [
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
    ];
  } else if (className === 'corona-saints') {
    return [
      {
        title: 'Corona Saints',
        items: [
          ...orderGroups(groupSaints(collection, 'abel'), ['gods', 'constellation']),
        ],
      },
    ];
  } else if (className === 'cyclops') {
    return [
      {
        title: 'Cyclops',
        items: [ ...groupSaints(collection, 'cyclops')],
      },
    ];
  } else if (className === 'dryads') {
    return [
      {
        title: 'Dryads',
        items: [
          ...orderGroups(groupSaints(collection, 'eris'), ['gods', 'phantoms', 'dryads', 'soldiers']),
        ],
      },
    ];
  } else if (className === 'fairies') {
    return [
      {
        title: 'Fairies',
        items: [
          ...orderGroups(groupSaints(collection, 'balor'), ['gods', 'fairies']),
        ],
      },
    ];
  } else if (className === 'gigas') {
    return [
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
    ];
  } else if (className === 'gladiators') {
    return [
      {
        title: 'Gladiators',
        items: [
          ...orderGroups(groupSaints(collection, 'arthur'), ['king', 'gladiators', 'low']),
        ],
      },
    ];
  } else if (className === 'god-warriors' || className === 'blue-warriors') {
    return [
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
    ];
  } else if (className === 'golden-tribe') {
    return [
      {
        title: 'Golden Tribe',
        items: [
          ...orderGroups(groupSaints(collection, 'astraea'), ['gods', 'golden']),
        ],
      },
    ];
  } else if (className === 'jaguars') {
    return [
      {
        title: 'Jaguars',
        items: [
          ...orderGroups(groupSaints(collection, 'tezcatlipoca'), ['gods', 'jaguars', 'soldiers'	]),
        ],
      },
    ];
  } else if (className === 'jewels') {
    return [
      {
        title: 'Jewels',
        items: [
          ...orderGroups(groupSaints(collection, 'garnet'), ['leader', 'jewels'	]),
        ],
      },
    ];
  } else if (className === 'lamech-servants') {
    return [
      {
        title: 'Lamech Servants',
        items: [
          ...orderGroups(groupSaints(collection, 'lamech'), ['gods', 'servants']),
        ],
      },
    ];
  } else if (className === 'legionaries') {
    return [
      {
        title: 'Legionaries',
        items: [
          ...orderGroups(groupSaints(collection, 'ra-'), ['gods', 'legionaries']),
        ],
      },
    ];
  } else if (className === 'mariners') {
    return [
      {
        title: 'Mariners',
        items: [
          ...orderGroups(groupSaints(collection, 'poseidon'), ['gods', 'generals', 'mariners', 'soldiers']),
        ],
      },
    ];
  } else if (className === 'others') {
    return [
      {
        title: 'Others',
        items: [
          ...groupSaints(collection, 'other-characters'),
        ],
      },
    ];
  } else if (className === 'satellites') {
    return [
      {
        title: 'Satellites',
        items: [
          ...orderGroups(groupSaints(collection, 'artemis'), ['gods', 'representative', 'captain', 'satellites']),
        ],
      },
    ];
  } else if (className === 'taonias') {
    return [
      {
        title: 'Taonias',
        items: [
          ...orderGroups(groupSaints(collection, 'hakuryu'), ['gods', 'taonias', 'high', 'low']),
        ],
      },
    ];
  } else if (className === 'anunnakis') {
    return [
      {
        title: 'Anunnakis',
        items: [
          ...orderGroups(groupSaints(collection, 'apsu'), ['anunnakis', 'weapons']),
        ],
      },
    ];
  } else if (className === 'titans') {
    return [
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
    ];
  } else {
    return { message: `${className} not found in Classes Controler` };
  }
}

export function getClassesByArtist(id) {
  const collections = getColletions();

  let saintsColection = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'saints') {
      saintsColection = collections[i].collection;
    }
  }

  let artistsCollection = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'artists') {
      artistsCollection = collections[i].collection;
    }
  }

  let saintsByArtist = []

  if(id === '0') {
    saintsByArtist = saintsColection.filter(saint => saint.artistSaint === "" || saint.artistCloth === "");

    return saintsByArtist;
  } else {
    let artist;

    for (let i = 0; i < artistsCollection.length; i++) {
      if (artistsCollection[i].id === id) {
        artist = artistsCollection[i];
      }
    }

    if (artist) {
      const saintsByArtist = saintsColection.filter(saint => artist.id === saint.artistSaint || artist.id === saint.artistCloth);

      return saintsByArtist;
    } else {
      return { message: 'Artist not found' };
    }
  }
}

export function getClassesByDebut(id) {
  const collections = getColletions();

  let saintsCollection = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'saints') {
      saintsCollection = collections[i].collection;
    }
  }

  let debutsCollection = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'debuts') {
      debutsCollection = collections[i].collection;
    }
  }

  let saintsByDebut = []

  if(id === '0') {
    saintsByDebut = saintsCollection.filter(saint => saint.debut === "");

    return saintsByDebut;
  } else {
    let debut;

    for (let i = 0; i < debutsCollection.length; i++) {
      if (debutsCollection[i].id === id) {
        debut = debutsCollection[i];
      }
    }

    if (debut) {
      const saintsByDebut = saintsCollection.filter(saint => debut.name === saint.debut && debut.midia === saint.midia);

      return saintsByDebut;
    } else {
      return { message: 'Debut not found' };
    }
  }
}

export function getSaintData(className, id) {
  const collections = getColletions();

  let saintsCollection = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'saints') {
      saintsCollection = collections[i].collection;

      break;
    }
  }

  let saint;

  for (let i = 0; i < saintsCollection.length; i++) {
    if (id === saintsCollection[i].id) {
      saint = saintsCollection[i];

      break;
    }
  }

  if (saint) {
    return saint;
  } else {
    return { message: `${className} not found` };
  }
}

export function getClassNamesData() {
  return classNamesData;
}
