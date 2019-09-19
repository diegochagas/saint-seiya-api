const express = require('express');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 5000;

const response = { 'success': false, 'message': '', 'data': {} };
    
const content = {};

const fileNames = [
    "affiliations",
    "artists",
    "attackers",
    "attacks",
    "characters",
    "classes",
    "cloths",
    "constellations",
    "debuts",
    "destinyStars",
    "familyMembers",
    "kinships",
    "masters",
    "midias",
    "midias",
    "nationality",
    "places",
    "ranks",
    "saints"
];

fileNames.forEach(name => {
    content[name] = [];
    fs.createReadStream(`data/${name}.csv`)
    .pipe(csv())
    .on('data', csvContent => {
        content[name].push(csvContent);
    });
});

const initialURLs = { 
    characters: 'characters',
    all: 'all',
    constellations: 'constellations',
    evilStars: 'evil-stars',
    debuts: 'debuts'
};

let urls = [];

const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O', 'Ikhor'];

const buildSaint = saintId => {
    const saintObject = content.saints.find(saint => saint.id === saintId);
    const saint = Object.assign({}, saintObject);

    const characterId = saint.character;

    content.characters.forEach(character => {
        if (character.id === saint.character) {
            saint.character = character.name;
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

    content.affiliations.forEach(affiliation => {
        if (affiliation.id === saint.affiliation) {
            saint.affiliation = affiliation.name;
        }
    });

    content.ranks.forEach(rank => {
        if (rank.id === saint.rank) {
            saint.rank = rank.name;
        }
    });

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
    
    return saint;
}

const buildCloths = character => {
    const cloths = [];
    content.saints.forEach(saint => {
        if (saint.character === character.id) {
            const cloth = buildSaint(saint.id);

            delete cloth.id;
            delete cloth.character;

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
                    character.master.push(masterInformations.name);
                }
            });
        }

        if (master.master === character.id) {
            content.characters.forEach(apprentice => {
                if (apprentice.id === master.apprentice) {
                    character.apprentice.push(apprentice.name);
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
            character.family.push(`${member.name} (${kinship.name})`);
        }
        
        if (family.member === character.id) {
            const member = content.characters.find(character => character.id === family.character);
            const kinship = content.kinships.find(kinship => kinship.id === family.characterKinship);
            character.family.push(`${member.name} (${kinship.name})`);
        }
    });

    const bloodType = bloodTypes[character.blood]; 

    character.blood = bloodType ? bloodType : "";
    
    content.debuts.forEach(debut =>  {
        if (debut.id === character.debut) {
            content.midias.forEach(midia => {
                if (midia.id === debut.midia) {
                    character.debut = `${midia.name}: ${debut.name}`;
                }
            });
        }
    });

    character.cloth = buildCloths(character);
    
    return character;   
}

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/urls', (req, res) => {
    urls = [];

    for (let key in initialURLs) {
        urls.push(initialURLs[key]);
    }

    content.classes.map(cls => urls.push(cls.name.toLowerCase().replace(' ', '-')));
    
    res.status(200).json(urls);
});

app.get(`/${initialURLs.debuts}`, (req, res) => {
    const debuts = content.debuts.map(debutObject => {
        const debut = Object.assign({}, debutObject);

        const midia = content.midias.find(midia => midia.id === debut.midia);

        debut.midia = midia.name;

        return debut;
    });

    response.success = true;
    response.message = 'Debuts founded';
    response.data = debuts;
    res.status(200).json(response);
});

app.get(`/${initialURLs.debuts}/:id`, (req, res) => {
    const debutObject = content.debuts.find(debut => debut.id === req.params.id);

    const debut = Object.assign({}, debutObject);

    const midia = content.midias.find(midia => midia.id === debut.midia);

    debut.midia = midia.name;

    if (debut) {
        const characters = content.characters.filter(character => character.debut === debut.id);

        response.success = true;
        response.message = 'Characters from debut founded';
        response.data = { debut, characters: characters.map(character => buildCharacter(character)) };
        res.status(200).json(response);
    } else {
        response.success = false;
        response.message = 'Debut not found';
        response.data = {};
        res.status(404).send(response);
    }
});

app.get(`/${initialURLs.characters}`, (req, res) => {
    response.success = true;
    response.message = 'Characters founded';
    response.data = content.characters.map(character => buildCharacter(character));
    res.status(200).json(response);
});

app.get(`/${initialURLs.characters}/:id`, (req, res) => {
    const character = content.characters.find(character => character.id === req.params.id);
    if (character) {
        response.success = true;
        response.message = 'Character founded';
        response.data = { character: buildCharacter(character) };
        res.status(200).json(response);
    } else {
        response.success = false;
        response.message = 'Saint not found';
        response.data = {};
        res.status(404).send(response);
    }
});

app.get(`/${initialURLs.all}`, (req, res) => {
    const saints = content.saints.map(saint => buildSaint(saint.id));
    response.success = true;
    response.message = 'All founded';
    response.data = { saints };
    res.status(200).json(response);
});

app.get(`/${initialURLs.constellations}`, (req, res) => {
    response.success = true;
    response.message = 'Constellations founded';
    response.data = { modernConstellations: content.constellations.slice(0, 88), otherConstellations: content.constellations.slice(88) };
    res.status(200).json(response);
});

app.get(`/${initialURLs.evilStars}`, (req, res) => {
    const stars = content.destinyStars.map(starObject => {
        const rankObject = content.ranks.find(rank => rank.id === starObject.rank);
        
        const rank = Object.assign({}, rankObject);
        
        const star = Object.assign({}, starObject);
        
        star.rank = rank.name;

        return star;
    });

    response.success = true;

    response.message = 'Evil stars founded';
    
    response.data = { evilStars: stars.slice(0, 108), otherCases: stars.slice(108) };
    
    res.status(200).json(response);
});

app.get('/:path', (req, res) => {
    const saints = [];
    let className = '';

    content.classes.forEach(cls => {
        if (req.params.path === cls.name.toLowerCase().replace(' ', '-')) {
            content.saints.forEach(saint => {
                if (saint.class === cls.id) {
                    className = cls.name;
                    saints.push(buildSaint(saint.id));
                }
            });
        }
    });

    if (saints.length) {
        response.success = true;
        response.message = `${className} founded`;
        response.data = { saints };
        res.status(200).json(response);
    } else {
        response.success = false;
        response.message = 'Saint not found';
        response.data = {};
        res.status(404).send(response);
    }
});

app.get('/:path/:id', (req, res) => {
    let notfound = false;
    
    content.classes.forEach(cls => {
        if (req.params.path === cls.name.toLowerCase().replace(' ', '-')) {
            content.saints.forEach(saint => {
                if (saint.class === cls.id && saint.id === req.params.id) {
                    response.success = true;
                    response.message = `${ cls.name } founded`;
                    response.data = { saint: buildSaint(saint.id) };
                    res.status(200).json(response);
                    notfound = false;
                } else {
                    notfound = true;
                }
            });
        } else {
            notfound = true;
        }
    });

    if (notfound) {
        response.success = false;
        response.message = `${req.params.path} not found`;
        response.data = {};
        res.status(404).send(response);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
    console.log('App is listening on port ' + PORT);
});