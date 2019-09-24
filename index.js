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
    "debuts",
    "familyMembers",
    "kinships",
    "lists",
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
    all: 'all',
    characters: 'characters',
    debuts: 'debuts',
    lists: 'lists',
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

    if (!saint.scheme) {
        saint.scheme = "https://firebasestorage.googleapis.com/v0/b/saint-seiya-api-accd5.appspot.com/o/others%2Fno-scheme.png?alt=media&token=fe50ebdc-d7d6-4238-81c4-c49a48c2c40a";
    }

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

    content.lists.forEach(list => {
        if (list.id === saint.list) {
            saint.list = list.name;
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

app.get(`/${initialURLs.lists}/:type`, (req, res) => {
    const { type } = req.params;

    const lists = content.lists.filter(list => {
        if (list.id.includes(type)) {
            const saints = content.saints.filter(saint => list.id === saint.list);
            
            list.saints = saints ? saints.map(saint => buildSaint(saint.id)) : [];

            return list;
        }
    });
    
    const typeName = type.charAt(0).toUpperCase() + type.replace('-', ' ').substring(1);
    
    if (lists.length) {
        response.success = true;
        response.message = `${typeName} founded`;

        let data = {};

        if (type.includes('constellation')) {
            data = { modernConstellations: lists.slice(0, 88), otherConstellations: lists.slice(88) };
        } else if (type.includes('evil-star')) {
            data = { destinyStars: lists.slice(0, 108), otherCases: lists.slice(108) };
        } else {
            data = { lists };
        }

        response.data = data;
        res.status(200).json(response);
    } else {
        response.success = false;
        response.message = `${typeName} not found`;
        response.data = {};
        res.status(404).send(response);
    }
});

app.get(`/${initialURLs.lists}/:type/:id`, (req, res) => {
    const { type } = req.params;
    
    const id = `${req.params.type}-${req.params.id}`;

    const list = content.lists.find(list => list.id === id);
    
    const typeName = type.charAt(0).toUpperCase() + type.replace('-', ' ').substring(1);

    if (list) {
        const saints = content.saints.filter(saint => saint.list === list.id);

        response.success = true;
        response.message = `Characters from ${typeName} founded`;
        response.data = { list, saints: saints.map(saint => buildSaint(saint.id)) };
        res.status(200).json(response);
    } else {
        response.success = false;
        response.message = `${typeName} not found`;
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

app.get('/:class', (req, res) => {
    const saints = [];
    let className = '';

    content.classes.forEach(cls => {
        if (req.params.class === cls.name.toLowerCase().replace(' ', '-')) {
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

app.get('/:class/:id', (req, res) => {
    let notfound = false;
    
    content.classes.forEach(cls => {
        if (req.params.class === cls.name.toLowerCase().replace(' ', '-')) {
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
        response.message = `${req.params.class} not found`;
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