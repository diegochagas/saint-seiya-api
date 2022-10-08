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

const { loadCharacterData } = require('../classes/classes.controllers')

export function getCharactersData(
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

export function getCuriosities(request, response) {
  const collections = getColletions();

  let curiosities = [];

  for(let i = 0; i < collections.length; i++) {
    if (collections[i].collectionPath === 'curiosities') {
      curiosities = collections[i].collection;
    }
  }

  response.json(curiosities);
}
