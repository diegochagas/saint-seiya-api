const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser')

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/dist/`));

const PORT = process.env.PORT || 8080;

const content = {};

const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O', 'Ikhor'];

const noSchemeImage = "https://firebasestorage.googleapis.com/v0/b/saint-seiya-api-accd5.appspot.com/o/others%2Fno-scheme.png?alt=media&token=fe50ebdc-d7d6-4238-81c4-c49a48c2c40a";

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

const getData = fileName => {
  content[fileName] = [];

  fs.createReadStream(`data/${fileName}.csv`)
    .pipe(csv())
    .on('data', data => {
      content[fileName].push(data);
    });
}

fileNames.forEach(name => getData(name));

const buildSaint = saintId => {
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

const buildCloths = character => {
  const cloths = [];
  content.saints.forEach(saint => {
    if (saint.name === character.id) {
      const cloth = buildSaint(saint.id);

      delete cloth.name;

      cloths.push(cloth);
    }
  });
  return cloths;
}

const buildCharacter = characterObject => {
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

  character.cloth = buildCloths(character);

  character.image = character.cloth.length ? character.cloth[0].image : noSchemeImage;

  return character;
}

const buildResponse = (message, data = {}) => ({ message, data });

app.get('/api/debuts', (req, res) => {
  const debuts = content.debuts.map(debutObject => {
    const debut = Object.assign({}, debutObject);

    const midia = content.midias.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    return debut;
  });

  res.status(200).json(buildResponse('Debuts founded', debuts));
});

app.get('/api/debut/:id', (req, res) => {
  const debutObject = content.debuts.find(debut => debut.id === req.params.id);

  if (debutObject) {
    const debut = Object.assign({}, debutObject);

    const midia = content.midias.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    const characters = content.characters.filter(character => character.debut === debut.id);

    const data = { debut, characters: characters.map(character => buildCharacter(character)) };

    res.status(200).json(buildResponse('Debut founded', data));
  } else {

    res.status(404).json(buildResponse('Debut not found'));
  }
});

app.get('/api/characters', (req, res) => {
  const characters = content.characters.map(character => buildCharacter(character));

  res.status(200).json(buildResponse('Characters founded', characters));
});

app.get('/api/character/:id', (req, res) => {
  const character = content.characters.find(character => character.id === req.params.id);

  if (character) {
    res.status(200).json(buildResponse('Character founded', buildCharacter(character)));
  } else {
    res.status(404).json(buildResponse('Character not found'));
  }
});

app.get('/api/curiosities', (req, res) => res.status(200).json(buildResponse('Curiosities founded', content.curiosities)));

app.get('/api/class-names', (req, res) => res.status(200).json(buildResponse('Class names founded', content.classes)));

app.get('/api/all-classes', (req, res) => {
  const allClasses = [];

  content.saints.forEach(saint => allClasses.push(buildSaint(saint.id)));

  res.status(200).json(buildResponse(`All classes founded`, allClasses));
})

app.get('/api/:class', (req, res) => {
  let cls = content.classes.find(cls => req.params.class === cls.name.toLowerCase().replace(' ', '-'));

  if (req.params.class === 'constellations') {
    const modernConstellations = [];

    content.constellations.slice(0, 88).forEach(constellation => {
      const saints = [];

      content.saints.forEach(saint => {
        if (`constellation-${constellation.id}` === saint.symbol) {
          saints.push(buildSaint(saint.id));
        }
      });

      constellation.saints = saints;

      modernConstellations.push(constellation);
    });

    const otherConstellations = [];

    content.constellations.slice(88).forEach(constellation => {
      const saints = [];

      content.saints.forEach(saint => {
        if (`constellation-${constellation.id}` === saint.symbol) {
          saints.push(buildSaint(saint.id));
        }
      });

      constellation.saints = saints;

      otherConstellations.push(constellation);
    });

    res.status(200).json(buildResponse('Constellations founded', { modernConstellations, otherConstellations }));
  } else if (req.params.class === 'evil-stars') {
    const evilStars = [];

    content.evilStars.slice(0, 88).forEach(evilStar => {
      const saints = [];

      content.saints.forEach(saint => {
        if (`evil-star-${evilStar.id}` === saint.symbol) {
          saints.push(buildSaint(saint.id));
        }
      });

      evilStar.saints = saints;

      evilStars.push(evilStar);
    });

    const otherEvilStars = [];

    content.evilStars.slice(88).forEach(evilStar => {
      const saints = [];

      content.saints.forEach(saint => {
        if (`evil-star-${evilStar.id}` === saint.symbol) {
          saints.push(buildSaint(saint.id));
        }
      });

      evilStar.saints = saints;

      otherEvilStars.push(evilStar);
    });

    res.status(200).json(buildResponse('Evil stars founded', { evilStars, otherEvilStars }));
  } else if (cls) {
    const saints = [];

    content.saints.forEach(saint => {
      if (saint.class === cls.id) {
        saints.push(buildSaint(saint.id));
      }
    });

    res.status(200).json(buildResponse(`${ cls.name } founded`, saints));
  } else {
    res.status(404).json(buildResponse(`${req.params.class} not found`));
  }
});

app.get('/api/:class/:id', (req, res) => {
  if (req.params.class.includes('constellation')) {
    const constellation = content.constellations.find(constellation => constellation.id === req.params.id);

    const saints = [];

    content.saints.forEach(saint => {
      if (`constellation-${constellation.id}` === saint.symbol) {
        saints.push(buildSaint(saint.id));
      }
    });

    constellation.saints = saints;

    res.status(200).json(buildResponse(`Constellation founded`, constellation));
  } else if (req.params.class.includes('evil-star')) {
    const evilStar = content.evilStars.find(evilStar => evilStar.id === req.params.id);

    const saints = [];

    content.saints.forEach(saint => {
      if (`evil-star-${evilStar.id}` === saint.symbol) {
        saints.push(buildSaint(saint.id));
      }
    });

    evilStar.saints = saints;

    res.status(200).json(buildResponse(`Evil star founded`, evilStar));
  } else {
    const cls = content.classes.find(cls => req.params.class === cls.name.toLowerCase().replace(' ', '-'));

    const saint = content.saints.find(saint => saint.class === cls.id && saint.id === req.params.id);

    if (saint) {
      res.status(200).json(buildResponse(`${cls.name} founded`, { saint: buildSaint(saint.id) }));
    } else {
      res.status(404).json(buildResponse(`${req.params.class} not found`));
    }
  }
});

app.get('*', (req, res) => res.sendFile(path.join(`$/dist/$/index.html`)));

app.use((req, res, next) => res.status(404).json(buildResponse(`${req.url} not found`)));

app.use((err, req, res, next) => res.status(500).json(buildResponse(String(err))));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
