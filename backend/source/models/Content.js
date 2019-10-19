const csv = require('csvtojson');

const fileNames = [
  "affiliations",
  "artists",
  "attackers",
  "attacks",
  "characters",
  "classes",
  "cloths",
  "constellations",
  "curiosities",
  "debuts",
  "evilStars",
  "familyMembers",
  "kinships",
  "masters",
  "midias",
  "nationality",
  "places",
  "ranks",
  "saints"
];

const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O', 'Ikhor'];

const noSchemeImage = "https://firebasestorage.googleapis.com/v0/b/saint-seiya-api-accd5.appspot.com/o/others%2Fno-scheme.png?alt=media&token=fe50ebdc-d7d6-4238-81c4-c49a48c2c40a";

const load = async () => {
  const content = {};
  
  for (let i = 0; i < fileNames.length; i++) {
    const name = fileNames[i];

    const data = await csv().fromFile(`data/${name}.csv`);
  
    content[name] = data;
  }

  return content;
}

const buildSaint = async saintId => {
  const content = await load();

  const saintObject = content.saints.find(saint => saint.id === saintId);
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
      saint.artist = artist.name;
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
}

const buildCloths = async character => {
  const content = await load();

  const cloths = [];
  
  for (let i = 0; i < content.saints.length; i++) {
    const saint = content.saints[i];

    if (saint.name === character.id) {
      const cloth = await buildSaint(saint.id);

      delete cloth.name;

      cloths.push(cloth);
    }
  }
  return cloths;
}

const buildCharacter = async characterObject => {
  const content = await load();

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
          character.family.push({ id: member.id, member: `${member.name} (${kinship.name})`});
      }

      if (family.member === character.id) {
          const member = content.characters.find(character => character.id === family.character);
          const kinship = content.kinships.find(kinship => kinship.id === family.characterKinship);
          character.family.push({ id: member.id, member: `${member.name} (${kinship.name})`});
      }
  });

  const bloodType = bloodTypes[character.blood];

  character.blood = bloodType ? bloodType : "";

  content.debuts.forEach(debut =>  {
    if (debut.id === character.debut) {
      content.midias.forEach(midia => {
        if (midia.id === debut.midia) {
          character.debut = debut.name;

          character.midia = midia.name;
        }
      });
    }
  });

  character.cloth = await buildCloths(character);

  character.image = character.cloth.length ? character.cloth[0].image : noSchemeImage;

  return character;
}

const buildConstellations = async constellations => {
  const content = await load();

  for(let i = 0; i < constellations.length; i++) {        
    const constellation = constellations[i];

    const saints = [];

    for (let j = 0; j < content.saints.length; j++) {
      const saint = content.saints[j];

      if (`constellation-${constellation.id}` === saint.symbol) {
        saints.push(await buildSaint(saint.id));
      }
    }

    constellation.saints = saints;

    constellations[i] = constellation;
  }

  return constellations;
}

const buildEvilStars = async evilStars => {
  const content = await load();

  for (let i = 0; i < evilStars.length; i++) {
    const evilStar = evilStars[i];
    
    const saints = [];

    for (let j = 0; j < content.saints.length; j++) {
      const saint = content.saints[j];

      if (`evil-star-${evilStar.id}` === saint.symbol) {
        saints.push(await buildSaint(saint.id));
      }
    }

    evilStar.saints = saints;

    evilStars[i] = evilStar;
  }

  return evilStars;
}

module.exports = {
  bloodTypes,
  buildCharacter,
  buildCloths,
  buildConstellations,
  buildEvilStars,
  buildSaint,
  genders,
  load,
};
