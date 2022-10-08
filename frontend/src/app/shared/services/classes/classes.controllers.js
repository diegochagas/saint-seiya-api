//#region imports jsons
export const artistsData = require('../../../../../../../saint-seiya-api-data/artists/index.json')
export const attackersData = require('../../../../../../../saint-seiya-api-data/attackers/index.json')
export const attacksData = require('../../../../../../../saint-seiya-api-data/attacks/index.json')
export const charactersData = require('../../../../../../../saint-seiya-api-data/characters/index.json')
export const classNamesData = require('../../../../../../../saint-seiya-api-data/classNames/index.json')
export const clothesData = require('../../../../../../../saint-seiya-api-data/clothes/index.json')
export const curiositiesData = require('../../../../../../../saint-seiya-api-data/curiosities/index.json')
export const debutsData = require('../../../../../../../saint-seiya-api-data/debuts/index.json')
export const familyMembersData = require('../../../../../../../saint-seiya-api-data/familyMembers/index.json')
export const groupsAbelData = require('../../../../../../../saint-seiya-api-data/groupsAbel/index.json')
export const groupsApsuData = require('../../../../../../../saint-seiya-api-data/groupsApsu/index.json')
export const groupsAresData = require('../../../../../../../saint-seiya-api-data/groupsAres/index.json')
export const groupsArtemisData = require('../../../../../../../saint-seiya-api-data/groupsArtemis/index.json')
export const groupsArthurData = require('../../../../../../../saint-seiya-api-data/groupsArthur/index.json')
export const groupsAstraeaData = require('../../../../../../../saint-seiya-api-data/groupsAstraea/index.json')
export const groupsAthenaData = require('../../../../../../../saint-seiya-api-data/groupsAthena/index.json')
export const groupsBalorData = require('../../../../../../../saint-seiya-api-data/groupsBalor/index.json')
export const groupsCronusData = require('../../../../../../../saint-seiya-api-data/groupsCronus/index.json')
export const groupsCyclopsData = require('../../../../../../../saint-seiya-api-data/groupsCyclops/index.json')
export const groupsErisData = require('../../../../../../../saint-seiya-api-data/groupsEris/index.json')
export const groupsGarnetData = require('../../../../../../../saint-seiya-api-data/groupsGarnet/index.json')
export const groupsHadesData = require('../../../../../../../saint-seiya-api-data/groupsHades/index.json')
export const groupsHakuryuData = require('../../../../../../../saint-seiya-api-data/groupsHakuryu/index.json')
export const groupsLamechData = require('../../../../../../../saint-seiya-api-data/groupsLamech/index.json')
export const groupsOdinData = require('../../../../../../../saint-seiya-api-data/groupsOdin/index.json')
export const groupsOthersData = require('../../../../../../../saint-seiya-api-data/groupsOthers/index.json')
export const groupsPallasData = require('../../../../../../../saint-seiya-api-data/groupsPallas/index.json')
export const groupsPoseidonData = require('../../../../../../../saint-seiya-api-data/groupsPoseidon/index.json')
export const groupsRaData = require('../../../../../../../saint-seiya-api-data/groupsRa/index.json')
export const groupsTezcatlipocaData = require('../../../../../../../saint-seiya-api-data/groupsTezcatlipoca/index.json')
export const groupsTyphonData = require('../../../../../../../saint-seiya-api-data/groupsTyphon/index.json')
export const groupsZeusData = require('../../../../../../../saint-seiya-api-data/groupsZeus/index.json')
export const kinshipsData = require('../../../../../../../saint-seiya-api-data/kinships/index.json')
export const mastersData = require('../../../../../../../saint-seiya-api-data/masters/index.json')
export const midiasData = require('../../../../../../../saint-seiya-api-data/midias/index.json')
export const nationalitiesData = require('../../../../../../../saint-seiya-api-data/nationality/index.json')
export const placesData = require('../../../../../../../saint-seiya-api-data/places/index.json')
export const ranksData = require('../../../../../../../saint-seiya-api-data/ranks/index.json')
export const saintsData = require('../../../../../../../saint-seiya-api-data/saints/index.json')
//#endregion

export const noSchemeImage = "assets/cloth-schemes/others/no-scheme.png";

const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O', 'Ikhor'];

const getCharacterBirthDate = character => {
  if (character.age && character.birthDay && character.birthMonth && character.actualDate) {
    const age = parseInt(character.age);
    const day = parseInt(character.birthDay);
    const month = parseInt(character.birthMonth);
    const date = new Date(character.actualDate);
    let year = date.getFullYear() - age;

    if ((date.getMonth() + 1) < month || ((date.getMonth() + 1) == month && date.getDate() < day)) {
        year--;
    }

    return `${day}/${month}/${year}`;
  } else if (character.birthDay && character.birthMonth) {
    return `${character.birthDay}/${character.birthMonth}`;
  } else {
    return "";
  }
}

const getCharacterKinship = (characters, familyMembers, kinships) => {
  return characters.map(character => {
    const families = [];

    familyMembers.forEach(family => {
      if (family.character === character.id) {
        const member = characters.find(character => character.id === family.member);
        const kinship = kinships.find(kinship => kinship.id === family.kinship);

        if(member && kinship) {
          let additionalKinship = ''

          if(family.twin) additionalKinship = 'twin ' + additionalKinship;
          if(family.half) additionalKinship = 'half ' + additionalKinship;
          if(family.adopt) additionalKinship = 'adopt ' + additionalKinship;
          if(family.step) additionalKinship = 'step ' + additionalKinship;

          families.push({ id: member.id, member: `${member.name} (${additionalKinship}${kinship.name})` });
        }
      }
    })

    character.family = families.sort((a, b) => a.member == b.member ? 0 : + (a.member > b.member) || -1);

    return character;
  });
}

export const loadCharacterData = (
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
  characterObject
 ) => {
  const character = Object.assign({}, characterObject);
  character.birth = getCharacterBirthDate(character);

  character.gender = genders[character.gender];

  nationalities.forEach(nationality => {
    if (nationality.num_code === character.nationality) {
      character.nationality = nationality.nationality;
    }

    if (nationality.num_code === character.training) {
      const place = places.find(place => place.id === character.place);

      character.training = place ? `${place.name}, ${nationality.en_short_name}` : nationality.en_short_name;
    }
  });

  delete character.place;

  character.master = [];
  character.apprentice = [];
  masters.forEach(master => {
    if (master.apprentice === character.id) {
      characters.forEach(masterInformations => {
        if (masterInformations.id === master.master) {
          character.master.push({ id: masterInformations.id, name: masterInformations.name });
        }
      });
    }

    if (master.master === character.id) {
      characters.forEach(apprentice => {
        if (apprentice.id === master.apprentice) {
          character.apprentice.push({ id: apprentice.id, name: apprentice.name });
        }
      });
    }
  });

  character.attacks = [];
  attackers.forEach(attacker => {
    if (attacker.character === character.id) {
      const attack = attacks.find(attack => attack.id === attacker.attack);
      character.attacks.push(attack.name);
    }
  });

  character.height = character.height ? `${character.height}cm` : "";
  character.weight = character.weight ? `${character.weight}kg` : "";

  const bloodType = bloodTypes[character.blood];
  character.blood = bloodType ? bloodType : "";

  debuts.forEach(debut => {
    if (debut.id === character.debut) {
      midias.forEach(midia => {
        if (midia.id === debut.midia) {
          character.debut = debut.name;

          character.midia = midia.name;
        }
      });
    }
  });

  const filteredSaints = saints.filter(saint => saint.name === character.id);

  character.clothes = filteredSaints.map(saint => loadSaintData(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    debuts,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    midias,
    ranks,
    saint
  ));

  character.image = character.clothes.length ? character.clothes[0].image : noSchemeImage;

  character.family = getCharacterKinship(characters, familyMembers, kinships);

  return character;
}

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

export const loadSaintData = (
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  debuts,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  midias,
  ranks,
  saintObject
) => {
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

const loadDebutsData = (debuts, midias) => {
  return debuts.map(debutObject => {
    const debut = Object.assign({}, debutObject);

    const midia = midias.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    return debut;
  });
}

const getColletions = (
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  curiosities,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
) => {
  const collections = [];

  collections.push({ collectionPath: 'artists', collection: artists });

  collections.push({ collectionPath: 'characters', collection: characters.map(character => loadCharacterData(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    curiosities,
    debuts,
    familyMembers,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    kinships,
    masters,
    midias,
    nationalities,
    places,
    ranks,
    saints,
    character
  )) });

  collections.push({ collectionPath: 'curiosities', collection: curiosities });

  collections.push({ collectionPath: 'saints', collection: saints.map(saint => loadSaintData(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    debuts,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    midias,
    ranks,
    saint
  )) });

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

  collections.push({ collectionPath: 'debuts', collection: loadDebutsData(debuts, midias) });

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

function groupSaints(saints, group) {
  const groupedSaints = [];

  try {
    const filteredSaints = saints.filter(saint => saint.group.includes(group));

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

export function getAllClasses(
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  curiosities,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
) {
  const collections = getColletions(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    curiosities,
    debuts,
    familyMembers,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    kinships,
    masters,
    midias,
    nationalities,
    places,
    ranks,
    saints,
  );

  let saintsFullData = [];

  for (let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'saints') {
      saintsFullData = collections[i].collection;
    }
  }

  return saintsFullData;
}

export function getClassSaints(
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  curiosities,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
  className
) {
  const collections = getColletions(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    curiosities,
    debuts,
    familyMembers,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    kinships,
    masters,
    midias,
    nationalities,
    places,
    ranks,
    saints,
  );

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

export function getClassesByArtist(
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  curiosities,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
  id
) {
  const collections = getColletions(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    curiosities,
    debuts,
    familyMembers,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    kinships,
    masters,
    midias,
    nationalities,
    places,
    ranks,
    saints,
  );

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

export function getClassesByDebut(
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  curiosities,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
  id
) {
  const collections = getColletions(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    curiosities,
    debuts,
    familyMembers,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    kinships,
    masters,
    midias,
    nationalities,
    places,
    ranks,
    saints,
  );

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

export function getSaintData(
  artists,
  attackers,
  attacks,
  characters,
  clothes,
  curiosities,
  debuts,
  familyMembers,
  groupsAbel,
  groupsApsu,
  groupsAres,
  groupsArtemis,
  groupsArthur,
  groupsAstraea,
  groupsAthena,
  groupsBalor,
  groupsCronus,
  groupsCyclops,
  groupsEris,
  groupsGarnet,
  groupsHades,
  groupsHakuryu,
  groupsLamech,
  groupsOdin,
  groupsOthers,
  groupsPallas,
  groupsPoseidon,
  groupsRa,
  groupsTezcatlipoca,
  groupsTyphon,
  groupsZeus,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  ranks,
  saints,
  className,
  id
) {
  const collections = getColletions(
    artists,
    attackers,
    attacks,
    characters,
    clothes,
    curiosities,
    debuts,
    familyMembers,
    groupsAbel,
    groupsApsu,
    groupsAres,
    groupsArtemis,
    groupsArthur,
    groupsAstraea,
    groupsAthena,
    groupsBalor,
    groupsCronus,
    groupsCyclops,
    groupsEris,
    groupsGarnet,
    groupsHades,
    groupsHakuryu,
    groupsLamech,
    groupsOdin,
    groupsOthers,
    groupsPallas,
    groupsPoseidon,
    groupsRa,
    groupsTezcatlipoca,
    groupsTyphon,
    groupsZeus,
    kinships,
    masters,
    midias,
    nationalities,
    places,
    ranks,
    saints,
  );

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
