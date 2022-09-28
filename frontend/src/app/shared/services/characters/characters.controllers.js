const attackers = require('../../../../../../../saint-seiya-api-data/attackers/index.json')
const attacks = require('../../../../../../../saint-seiya-api-data/attacks/index.json')
const characters = require('../../../../../../../saint-seiya-api-data/characters/index.json')
const curiosities = require('../../../../../../../saint-seiya-api-data/curiosities/index.json')
const debuts = require('../../../../../../../saint-seiya-api-data/debuts/index.json')
const familyMembers = require('../../../../../../../saint-seiya-api-data/familyMembers/index.json')
const kinships = require('../../../../../../../saint-seiya-api-data/kinships/index.json')
const masters = require('../../../../../../../saint-seiya-api-data/masters/index.json')
const midias = require('../../../../../../../saint-seiya-api-data/midias/index.json')
const nationalities = require('../../../../../../../saint-seiya-api-data/nationality/index.json')
const places = require('../../../../../../../saint-seiya-api-data/places/index.json')
const saints = require('../../../../../../../saint-seiya-api-data/saints/index.json')

const { loadSaintData, noSchemeImage } = require('../classes/classes.controllers')

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

const getCharacterKinship = () => {
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

const loadCharacterData = characterObject => {
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

  character.cloths = filteredSaints.map(saint => loadSaintData(saint));

  character.image = character.cloths.length ? character.cloths[0].image : noSchemeImage;

  character.family = getCharacterKinship();

  return character;
}

export function getCharactersData() {
  const filteredCharacters = characters.filter(character => !!character.name);

  return filteredCharacters.map(character => loadCharacterData(character));
}

export function getCharacterData(id) {
  let character;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].id === id) {
      character = characters[i];
    }
  }

  return loadCharacterData(character)
}

export function getCuriositiesData() {
  return curiosities;
}
