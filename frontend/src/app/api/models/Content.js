const data = require('../data')

const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O', 'Ikhor'];

const noSchemeImage = "assets/cloth-schemes/others/no-scheme.png";

const getContent = () => {
  const content = {};

  Object.keys(data).forEach(name => {
    content[name] = data[name];
  })

  return content;
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

const loadSaintsData = (saints, content) => {
  return saints.map(saintObject => {
    const saint = Object.assign({}, saintObject);

    const characterId = saint.name;

    saint.characterId = characterId;

    content.characters.forEach(character => {
      if (character.id === saint.name) {
        saint.name = character.name;
      }
    });

    content.clothes.forEach(cloth => {
      if (cloth.id === saint.cloth) {
        saint.cloth = cloth.name;
      }
    });

    let group;

    if (saint.group.includes('abel')) group = getGroup(content.groupsAbel, saint);
    if (saint.group.includes('apsu')) group = getGroup(content.groupsApsu, saint);
    if (saint.group.includes('ares') || saint.group.includes('mars')) group = getGroup(content.groupsAres, saint);
    if (saint.group.includes('artemis')) group = getGroup(content.groupsArtemis, saint);
    if (saint.group.includes('arthur')) group = getGroup(content.groupsArthur, saint);
    if (saint.group.includes('astraea')) group = getGroup(content.groupsAstraea, saint);
    if (saint.group.includes('athena')) group = getGroup(content.groupsAthena, saint);
    if (saint.group.includes('balor')) group = getGroup(content.groupsBalor, saint);
    if (saint.group.includes('chronos')) group = getGroup(content.groupsChronos, saint);
    if (saint.group.includes('cronus')) group = getGroup(content.groupsCronus, saint);
    if (saint.group.includes('cyclops')) group = getGroup(content.groupsCyclops, saint);
    if (saint.group.includes('eris')) group = getGroup(content.groupsEris, saint);
    if (saint.group.includes('garnet')) group = getGroup(content.groupsGarnet, saint);
    if (saint.group.includes('hades')) group = getGroup(content.groupsHades, saint);
    if (saint.group.includes('hakuryu')) group = getGroup(content.groupsHakuryu, saint);
    if (saint.group.includes('lamech')) group = getGroup(content.groupsLamech, saint);
    if (saint.group.includes('odin') || saint.group.includes('blue-warrior')) group = getGroup(content.groupsOdin, saint);
    if (saint.group.includes('other-characters')) group = getGroup(content.groupsOthers, saint);
    if (saint.group.includes('pallas')) group = getGroup(content.groupsPallas, saint);
    if (saint.group.includes('poseidon')) group = getGroup(content.groupsPoseidon, saint);
    if (saint.group.includes('ra-')) group = getGroup(content.groupsRa, saint);
    if (saint.group.includes('tezcatlipoca')) group = getGroup(content.groupsTezcatlipoca, saint);
    if (saint.group.includes('typhon')) group = getGroup(content.groupsTyphon, saint);
    if (saint.group.includes('zeus')) group = getGroup(content.groupsZeus, saint);

    if (group) {
      saint.class = group;
    } else {
      console.error(`Error:
        Saint id ${saint.id} with name ${saint.name || 'undefined'} from group ${saint.group || 'undefined'} not found, group is ${group}
      `);
    }

    content.ranks.forEach(rank => {
      if (rank.id === saint.rank) {
        saint.rank = rank.name;
      }
    });

    content.characters.forEach(character => {
      if (character.id === saint.affiliation) {
        saint.affiliation = character;
      }
    });

    saint.image = saint.image || noSchemeImage;

    saint.artists = [];

    content.artists.find(artist => {
      if (saint.artistSaint === artist.id) {
        saint.artists.push({ details: artist, type: 'saint' });
      }

      if (saint.artistCloth === artist.id) {
        saint.artists.push({ details: artist, type: 'cloth' });
      }
    });

    saint.attacks = [];

    content.attackers.forEach(attacker => {
      if (attacker.character === characterId) {
        const attack = content.attacks.find(attack => attack.id === attacker.attack);

        saint.attacks.push(attack.name);
      }
    });

    content.debuts.forEach(debut => {
      if (debut.id === saint.debut) {
        content.midias.forEach(midia => {
          if (midia.id === debut.midia) {
            saint.debut = { ...debut, midia };
          }
        });
      }
    });

    return saint;
  });
}

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

const getCharacterKinship = (familyMembers, characters, kinships) => {
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

const loadCharactersData = content => {
  const characters = content.characters.map(characterObject => {
    const character = Object.assign({}, characterObject);

    character.birth = getCharacterBirthDate(character);

    character.gender = genders[character.gender];

    content.nationality.forEach(nationality => {
      if (nationality.num_code === character.nationality) {
        character.nationality = nationality.nationality;
      }

      if (nationality.num_code === character.training) {
        const place = content.places.find(place => place.id === character.place);

        character.training = place ? `${place.name}, ${nationality.en_short_name}` : nationality.en_short_name;
      }
    });

    delete character.place;

    character.master = [];
    character.apprentice = [];
    content.masters.forEach(master => {
      if (master.apprentice === character.id) {
        content.characters.forEach(masterInformations => {
          if (masterInformations.id === master.master) {
            character.master.push({ id: masterInformations.id, name: masterInformations.name });
          }
        });
      }

      if (master.master === character.id) {
        content.characters.forEach(apprentice => {
          if (apprentice.id === master.apprentice) {
            character.apprentice.push({ id: apprentice.id, name: apprentice.name });
          }
        });
      }
    });

    character.attacks = [];
    content.attackers.forEach(attacker => {
      if (attacker.character === character.id) {
        const attack = content.attacks.find(attack => attack.id === attacker.attack);
        character.attacks.push(attack.name);
      }
    });

    character.height = character.height ? `${character.height}cm` : "";
    character.weight = character.weight ? `${character.weight}kg` : "";

    const bloodType = bloodTypes[character.blood];

    character.blood = bloodType ? bloodType : "";

    content.debuts.forEach(debut => {
      if (debut.id === character.debut) {
        content.midias.forEach(midia => {
          if (midia.id === debut.midia) {
            character.debut = { ...debut, midia };
          }
        });
      }
    });

    const saints = content.saints.filter(saint => saint.name === character.id);

    character.clothes = loadSaintsData(saints, content);

    character.image = character.clothes.length ? character.clothes[0].image : noSchemeImage;

    character.family = [];

    return character;
  });

  return getCharacterKinship(content.familyMembers, characters, content.kinships);
}

const loadDebutsData = content => {
  return content.debuts.map(debutObject => {
    const debut = Object.assign({}, debutObject);

    debut.midia = content.midias.find(midia => midia.id === debut.midia);

    return debut;
  });
}

const getColletions = () => {
  const collections = [];

  const content = getContent();

  collections.push({ collectionPath: 'artists', collection: content.artists });

  collections.push({ collectionPath: 'characters', collection: loadCharactersData(content) });

  collections.push({ collectionPath: 'curiosities', collection: content.curiosities });

  collections.push({ collectionPath: 'saints', collection: loadSaintsData(content.saints, content) });

  collections.push({
    collectionPath: 'constellations',
    collection: content.groupsAthena.filter(group => group.group === 'athena-saints'),
  });

  collections.push({
    collectionPath: 'evil-stars',
    collection: content.groupsHades.filter(group => group.group === 'hades-celestial-star' || group.group === 'hades-terrestrial-star'),
  });

  collections.push({
    collectionPath: 'ares-legions',
    collection: content.groupsAres.filter(group => group.group.includes('ares-legions')),
  });

  collections.push({ collectionPath: 'debuts', collection: loadDebutsData(content) });

  collections.push({ collectionPath: 'classNames', collection: content.classNames });

  return collections;
}

module.exports = { getColletions };
