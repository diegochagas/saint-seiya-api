const artists = require('../../../../../../../saint-seiya-api-data/artists/index.json')
const charactersData = require('../../../../../../../saint-seiya-api-data/characters/index.json')
const clothes = require('../../../../../../../saint-seiya-api-data/clothes/index.json')
const curiosities = require('../../../../../../../saint-seiya-api-data/curiosities/index.json')
const debuts = require('../../../../../../../saint-seiya-api-data/debuts/index.json')
const groupsAbel = require('../../../../../../../saint-seiya-api-data/groupsAbel/index.json')
const groupsApsu = require('../../../../../../../saint-seiya-api-data/groupsApsu/index.json')
const groupsAres = require('../../../../../../../saint-seiya-api-data/groupsAres/index.json')
const groupsArtemis = require('../../../../../../../saint-seiya-api-data/groupsArtemis/index.json')
const groupsArthur = require('../../../../../../../saint-seiya-api-data/groupsArthur/index.json')
const groupsAstraea = require('../../../../../../../saint-seiya-api-data/groupsAstraea/index.json')
const groupsAthena = require('../../../../../../../saint-seiya-api-data/groupsAthena/index.json')
const groupsBalor = require('../../../../../../../saint-seiya-api-data/groupsBalor/index.json')
const groupsCronus = require('../../../../../../../saint-seiya-api-data/groupsCronus/index.json')
const groupsCyclops = require('../../../../../../../saint-seiya-api-data/groupsCyclops/index.json')
const groupsEris = require('../../../../../../../saint-seiya-api-data/groupsEris/index.json')
const groupsGarnet = require('../../../../../../../saint-seiya-api-data/groupsGarnet/index.json')
const groupsHades = require('../../../../../../../saint-seiya-api-data/groupsHades/index.json')
const groupsHakuryu = require('../../../../../../../saint-seiya-api-data/groupsHakuryu/index.json')
const groupsLamech = require('../../../../../../../saint-seiya-api-data/groupsLamech/index.json')
const groupsOdin = require('../../../../../../../saint-seiya-api-data/groupsOdin/index.json')
const groupsOthers = require('../../../../../../../saint-seiya-api-data/groupsOthers/index.json')
const groupsPallas = require('../../../../../../../saint-seiya-api-data/groupsPallas/index.json')
const groupsPoseidon = require('../../../../../../../saint-seiya-api-data/groupsPoseidon/index.json')
const groupsRa = require('../../../../../../../saint-seiya-api-data/groupsRa/index.json')
const groupsTezcatlipoca = require('../../../../../../../saint-seiya-api-data/groupsTezcatlipoca/index.json')
const groupsTyphon = require('../../../../../../../saint-seiya-api-data/groupsTyphon/index.json')
const groupsZeus = require('../../../../../../../saint-seiya-api-data/groupsZeus/index.json')
const midias = require('../../../../../../../saint-seiya-api-data/midias/index.json')
const ranks = require('../../../../../../../saint-seiya-api-data/ranks/index.json')
const saintsData = require('../../../../../../../saint-seiya-api-data/saints/index.json')

const { loadCharacterData } = require('../characters/characters.controllers')

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

export const loadSaintData = saintObject => {
  const saint = Object.assign({}, saintObject);

  const characterId = saint.name;

  saint.characterId = characterId;

  characters.forEach(character => {
    if (character.id === saint.name) {
      saint.name = character.name;
    }
  });

  clothes.forEach(cloth => {
    if (cloth.id === saint.cloth) {
      saint.cloth = cloth.name;
    }
  });

  let group;

  if (saint.group.includes('abel')) group = getGroup(groupsAbel, saint);
  if (saint.group.includes('apsu')) group = getGroup(groupsApsu, saint);
  if (saint.group.includes('ares') || saint.group.includes('mars')) group = getGroup(groupsAres, saint);
  if (saint.group.includes('artemis')) group = getGroup(groupsArtemis, saint);
  if (saint.group.includes('arthur')) group = getGroup(groupsArthur, saint);
  if (saint.group.includes('astraea')) group = getGroup(groupsAstraea, saint);
  if (saint.group.includes('athena')) group = getGroup(groupsAthena, saint);
  if (saint.group.includes('balor')) group = getGroup(groupsBalor, saint);
  if (saint.group.includes('cronus')) group = getGroup(groupsCronus, saint);
  if (saint.group.includes('cyclops')) group = getGroup(groupsCyclops, saint);
  if (saint.group.includes('eris')) group = getGroup(groupsEris, saint);
  if (saint.group.includes('garnet')) group = getGroup(groupsGarnet, saint);
  if (saint.group.includes('hades')) group = getGroup(groupsHades, saint);
  if (saint.group.includes('hakuryu')) group = getGroup(groupsHakuryu, saint);
  if (saint.group.includes('lamech')) group = getGroup(groupsLamech, saint);
  if (saint.group.includes('odin') || saint.group.includes('blue-warrior')) group = getGroup(groupsOdin, saint);
  if (saint.group.includes('other-characters')) group = getGroup(groupsOthers, saint);
  if (saint.group.includes('pallas')) group = getGroup(groupsPallas, saint);
  if (saint.group.includes('poseidon')) group = getGroup(groupsPoseidon, saint);
  if (saint.group.includes('ra-')) group = getGroup(groupsRa, saint);
  if (saint.group.includes('tezcatlipoca')) group = getGroup(groupsTezcatlipoca, saint);
  if (saint.group.includes('typhon')) group = getGroup(groupsTyphon, saint);
  if (saint.group.includes('zeus')) group = getGroup(groupsZeus, saint);

  if (group) {
    saint.class = group;
  } else {
    console.error(`Error:
      Saint id ${saint.id} with name ${saint.name || 'undefined'} from group ${saint.group || 'undefined'} not found, group is ${group}
    `);
  }

  ranks.forEach(rank => {
    if (rank.id === saint.rank) {
      saint.rank = rank.name;
    }
  });

  characters.forEach(character => {
    if (character.id === saint.affiliation) {
      saint.affiliation = character;
    }
  });

  saint.image = saint.image || noSchemeImage;

  saint.artists = [];

  artists.find(artist => {
    if (saint.artistSaint === artist.id) {
      saint.artists.push({ details: artist, type: 'saint' });
    }

    if (saint.artistCloth === artist.id) {
      saint.artists.push({ details: artist, type: 'cloth' });
    }
  });

  saint.attacks = [];

  attackers.forEach(attacker => {
    if (attacker.character === characterId) {
      const attack = attacks.find(attack => attack.id === attacker.attack);

      saint.attacks.push(attack.name);
    }
  });

  debuts.forEach(debut => {
    if (debut.id === saint.debut) {
      midias.forEach(midia => {
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
  return debuts.map(debutObject => {
    const debut = Object.assign({}, debutObject);

    const midia = midias.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    return debut;
  });
}

const getColletions = () => {
  const collections = [];

  collections.push({ collectionPath: 'artists', collection: artists });

  collections.push({ collectionPath: 'characters', collection: charactersData.map(character => loadCharacterData(character)) });

  collections.push({ collectionPath: 'curiosities', collection: curiosities });

  collections.push({ collectionPath: 'saints', collection: saintsData.map(saint => loadSaintsData(saint)) });

  collections.push({
    collectionPath: 'constellations',
    collection: groupsAthena.filter(group => group.group === 'athena-saints'),
  });

  collections.push({
    collectionPath: 'evil-stars',
    collection: groupsHades.filter(group => group.group === 'hades-celestial-star' ||
      group.group === 'hades-terrestrial-star'),
  });

  collections.push({
    collectionPath: 'ares-legions',
    collection: groupsAres.filter(group => group.group.includes('ares-legions')),
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
    const filteredSaints = saints.filter(saint => saint.group.includes(group));

    const groupSaints = filteredSaints.reduce((accumulator, currentValue) => {
      if (currentValue && currentValue.class) {
        accumulator[currentValue.class.name] = [...accumulator[currentValue.class.name] || [], currentValue];
      } else {
        console.log('===================');
        console.error(currentValue)
        console.log('===================');
      }

      return accumulator;
    }, {});

    for (let key in groupSaints) {
      groupedSaints.push({ name: key, saints: groupSaints[key].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1)});
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
  return saintsData;
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

export function getClassesByArtist(request, response) {
  const collections = getColletions();

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
}

export function getClassesByDebut(request, response) {
  const collections = getColletions();

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
}

export function getSaint(request, response) {
  const collections = getColletions();

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
    response.status(404).json({ message: `${className} not found` });
  }
}
