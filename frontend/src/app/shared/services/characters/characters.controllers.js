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

const { loadSaintData } = require('../classes/classes.controllers')

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

const loadCharacterData = (
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

export function getCharactersData(
  attackers,
  attacks,
  characters,
  debuts,
  familyMembers,
  kinships,
  masters,
  midias,
  nationalities,
  places,
  saints
) {
  const filteredCharacters = characters.filter(character => !!character.name);

  return filteredCharacters.map(character => loadCharacterData(
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
      character
    )
  );
}

export function getCharacterData(
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
  id
) {
  let character;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].id === id) {
      character = characters[i];
    }
  }

  return loadCharacterData(
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
    character
  );
}
