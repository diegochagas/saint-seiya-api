const artists = require('../../../../../../../saint-seiya-api-data/artists/index.json')
const attackers = require('../../../../../../../saint-seiya-api-data/attackers/index.json')
const attacks = require('../../../../../../../saint-seiya-api-data/attacks/index.json')
const characters = require('../../../../../../../saint-seiya-api-data/characters/index.json')
const clothes = require('../../../../../../../saint-seiya-api-data/clothes/index.json')
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
const saints = require('../../../../../../../saint-seiya-api-data/saints/index.json')
const ranks = require('../../../../../../../saint-seiya-api-data/ranks/index.json')

export const noSchemeImage = "assets/cloth-schemes/others/no-scheme.png";

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
