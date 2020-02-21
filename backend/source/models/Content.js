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

    if (saint.symbol.includes('constellation')) {
      content.constellations.forEach(constellation => {
        if (`constellation-${constellation.id}` === saint.symbol) {
          saint.symbol = `${constellation.name} Constellation`;
        }
      });
    }

    if (saint.symbol.includes('evil-star')) {
      content.evilStars.forEach(evilStar => {
        if (`evil-star-${evilStar.id}` === saint.symbol) {
          saint.symbol = evilStar.name;
        }
      });
    }

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

const loadConstellationsData = content => {
  return content.constellations.map(constellationObject => {
    const constellation = Object.assign({}, constellationObject);

    const saints = content.saints.filter(saint => `constellation-${constellation.id}` === saint.symbol);

    constellation.saints = loadSaintsData(saints, content);

    return constellation;
  });
}

const loadEvilStarsData = content => {
  return content.evilStars.map(evilStarObject => {
    const evilStar = Object.assign({}, evilStarObject);

    const saints = content.saints.filter(saint => `evil-star-${evilStar.id}` === saint.symbol);

    evilStar.saints = loadSaintsData(saints, content);

    return evilStar;
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

  collections.push({ collectionPath: 'constellations', collection: loadConstellationsData(content) });

  collections.push({ collectionPath: 'evilStars', collection: loadEvilStarsData(content) });

  collections.push({ collectionPath: 'debuts', collection: loadDebutsData(content) });

  return collections;
}

module.exports = { getColletions };
