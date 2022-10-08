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
