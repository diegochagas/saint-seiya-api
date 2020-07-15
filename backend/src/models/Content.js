const data = require('../data')

const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O', 'Ikhor'];

const noSchemeImage = "assets/cloth-schemes/others/no-scheme.png";

const getCSVContent = async () => {
  const content = {};

  Object.keys(data).forEach(name => {
    content[name] = data[name];
  })

  return content;
}

const getGroupName = (groups, saint) => {
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];

    if (saint.group === `${group.group}-${group.id}`) return group.name;
    else if (saint.group === group.group) return group.name;
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

    content.cloths.forEach(cloth => {
      if (cloth.id === saint.cloth) {
        saint.cloth = cloth.name;
      }
    });

    content.classes.forEach(classInformations => {
      if (classInformations.id === saint.class) {
        saint.class = classInformations.name;
      }
    });

    content.ranks.forEach(rank => {
      if (rank.id === saint.rank) {
        saint.rank = rank.name;
      }
    });

    content.affiliations.forEach(affiliation => {
      if (affiliation.id === saint.affiliation) {
        saint.affiliation = affiliation.name;
      }
    });

    saint.image = saint.image || noSchemeImage;

    content.artists.find(artist => {
      if (saint.artist === artist.id) {
        saint.artist = artist;
      }
    });

    saint.attacks = [];

    content.attackers.forEach(attacker => {
      if (attacker.character === characterId) {
        const attack = content.attacks.find(attack => attack.id === attacker.attack);

        saint.attacks.push(attack.name);
      }
    });

    if (saint.group.includes('apollo')) saint.groupName = getGroupName(content.groupsApollo, saint);
    if (saint.group.includes('ares')) saint.groupName = getGroupName(content.groupsAres, saint);
    if (saint.group.includes('artemis')) saint.groupName = getGroupName(content.groupsArtemis, saint);
    if (saint.group.includes('astraea')) saint.groupName = getGroupName(content.groupsAstraea, saint);
    if (saint.group.includes('athena')) saint.groupName = getGroupName(content.groupsAthena, saint);
    if (saint.group.includes('balor')) saint.groupName = getGroupName(content.groupsBalor, saint);
    if (saint.group.includes('cronus')) saint.groupName = getGroupName(content.groupsCronus, saint);
    if (saint.group.includes('eris')) saint.groupName = getGroupName(content.groupsEris, saint);
    if (saint.group.includes('garnet')) saint.groupName = getGroupName(content.groupsGarnet, saint);
    if (saint.group.includes('gladiators')) saint.groupName = getGroupName(content.groupsGladiators, saint);
    if (saint.group.includes('hades')) saint.groupName = getGroupName(content.groupsHades, saint);
    if (saint.group.includes('hakuryu')) saint.groupName = getGroupName(content.groupsHakuryu, saint);
    if (saint.group.includes('lamech')) saint.groupName = getGroupName(content.groupsLamech, saint);
    if (saint.group.includes('odin')) saint.groupName = getGroupName(content.groupsOdin, saint);
    if (saint.group.includes('others')) saint.groupName = getGroupName(content.groupsOthers, saint);
    if (saint.group.includes('pallas')) saint.groupName = getGroupName(content.groupsPallas, saint);
    if (saint.group.includes('poseidon')) saint.groupName = getGroupName(content.groupsPoseidon, saint);
    if (saint.group.includes('ra-')) saint.groupName = getGroupName(content.groupsRa, saint);
    if (saint.group.includes('apollo')) saint.groupName = getGroupName(content.groupsApollo, saint);
    if (saint.group.includes('tezcatlipoca')) saint.groupName = getGroupName(content.groupsTezcatlipoca, saint);
    if (saint.group.includes('typhon')) saint.groupName = getGroupName(content.groupsTyphon, saint);
    if (saint.group.includes('zeus')) saint.groupName = getGroupName(content.groupsZeus, saint);

    content.debuts.forEach(debut => {
      if (debut.id === saint.debut) {
        content.midias.forEach(midia => {
          if (midia.id === debut.midia) {
            saint.debut = debut.name;

            saint.midia = midia.name;
          }
        });
      }
    });

    return saint;
  });
}

const loadCharactersData = content => {
  return content.characters.map(characterObject => {
    const character = Object.assign({}, characterObject);

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

    character.family = [];
    content.familyMembers.forEach(family => {
      if (family.character === character.id) {
        const member = content.characters.find(character => character.id === family.member);
        const kinship = content.kinships.find(kinship => kinship.id === family.memberKinship);
        character.family.push({ id: member.id, member: `${member.name} (${kinship.name})` });
      }

      if (family.member === character.id) {
        const member = content.characters.find(character => character.id === family.character);
        const kinship = content.kinships.find(kinship => kinship.id === family.characterKinship);
        character.family.push({ id: member.id, member: `${member.name} (${kinship.name})` });
      }
    });

    const bloodType = bloodTypes[character.blood];

    character.blood = bloodType ? bloodType : "";

    content.debuts.forEach(debut => {
      if (debut.id === character.debut) {
        content.midias.forEach(midia => {
          if (midia.id === debut.midia) {
            character.debut = debut.name;

            character.midia = midia.name;
          }
        });
      }
    });

    const saints = content.saints.filter(saint => saint.name === character.id);

    character.cloths = loadSaintsData(saints, content);

    character.image = character.cloths.length ? character.cloths[0].image : noSchemeImage;

    return character;
  });
}

const loadDebutsData = content => {
  return content.debuts.map(debutObject => {
    const debut = Object.assign({}, debutObject);

    const midia = content.midias.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    return debut;
  });
}

const getColletions = async () => {
  const collections = [];

  const content = await getCSVContent();

  collections.push({ collectionPath: 'characters', collection: loadCharactersData(content) });

  collections.push({ collectionPath: 'curiosities', collection: content.curiosities });

  collections.push({ collectionPath: 'classNames', collection: content.classes });

  collections.push({ collectionPath: 'saints', collection: loadSaintsData(content.saints, content) });

  collections.push({
    collectionPath: 'constellations',
    collection: content.groupsAthena.filter(group => group.group === 'athena-constellations'),
  });

  collections.push({
    collectionPath: 'evil-stars',
    collection: content.groupsHades.filter(group => group.group === 'hades-celestial-star' || group.group === 'hades-terrestrial-star'),
  });

  collections.push({ collectionPath: 'debuts', collection: loadDebutsData(content) });

  return collections;
}

module.exports = { getColletions };
