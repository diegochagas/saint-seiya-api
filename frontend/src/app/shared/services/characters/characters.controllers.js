const attackersData = require('../../../api/attackers.json');
const attacksData = require('../../../api/attacks.json');
const charactersData = require('../../../api/characters.json');
const debutsData = require('../../../api/debuts.json');
const familyMembersData = require('../../../api/familyMembers.json');
const kinshipsData = require('../../../api/kinships.json');
const mastersData = require('../../../api/masters.json');
const midiasData = require('../../../api/midias.json');
const nationalitiesData = require('../../../api/nationality.json');
const placesData = require('../../../api/places.json');
const saintsData = require('../../../api/saints.json');

const { loadSaintData, noSchemeImage } = require('../classes/classes.controllers');

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
  return charactersData.map(character => {
    const families = [];

    familyMembersData.forEach(family => {
      if (family.character === character.id) {
        const member = charactersData.find(character => character.id === family.member);
        const kinship = kinshipsData.find(kinship => kinship.id === family.kinship);

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

export function loadCharacterData(characterObject) {
  const character = Object.assign({}, characterObject);
  character.birth = getCharacterBirthDate(character);

  character.gender = genders[character.gender];

  nationalitiesData.forEach(nationality => {
    if (nationality.num_code === character.nationality) {
      character.nationality = nationality.nationality;
    }

    if (nationality.num_code === character.training) {
      const place = placesData.find(place => place.id === character.place);

      character.training = place ? `${place.name}, ${nationality.en_short_name}` : nationality.en_short_name;
    }
  });

  delete character.place;

  character.master = [];
  character.apprentice = [];
  mastersData.forEach(master => {
    if (master.apprentice === character.id) {
      charactersData.forEach(masterInformations => {
        if (masterInformations.id === master.master) {
          character.master.push({ id: masterInformations.id, name: masterInformations.name });
        }
      });
    }

    if (master.master === character.id) {
      charactersData.forEach(apprentice => {
        if (apprentice.id === master.apprentice) {
          character.apprentice.push({ id: apprentice.id, name: apprentice.name });
        }
      });
    }
  });

  character.attacks = [];
  attackersData.forEach(attacker => {
    if (attacker.character === character.id) {
      const attack = attacksData.find(attack => attack.id === attacker.attack);
      character.attacks.push(attack.name);
    }
  });

  character.height = character.height ? `${character.height}cm` : "";
  character.weight = character.weight ? `${character.weight}kg` : "";

  const bloodType = bloodTypes[character.blood];
  character.blood = bloodType ? bloodType : "";

  debutsData.forEach(debut => {
    if (debut.id === character.debut) {
      midiasData.forEach(midia => {
        if (midia.id === debut.midia) {
          character.debut = debut.name;

          character.midia = midia.name;
        }
      });
    }
  });

  const filteredSaints = saintsData.filter(saint => saint.name === character.id);

  character.clothes = filteredSaints.map(saint => loadSaintData(saint));

  character.image = character.clothes.length ? character.clothes[0].image : noSchemeImage;

  character.family = getCharacterKinship();

  return character;
}

export function getCharactersData() {
  const filteredCharacters = charactersData.filter(character => !!character.name);

  return filteredCharacters.map(character => loadCharacterData(character));
}

export function getCharacterData(id) {
  let character;

  for (let i = 0; i < charactersData.length; i++) {
    if (charactersData[i].id === id) {
      character = charactersData[i];
    }
  }

  return loadCharacterData(character);
}

export function getCuriosities() {
  const collections = getColletions();

  let curiosities = [];

  for(let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'curiosities') {
      curiosities = collections[i].collection;
    }
  }

  return curiosities;
}
