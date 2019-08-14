const app = require('express')();
const csv = require('csv-parser');
const fs = require('fs');

const port = 3000;

const response = { 'success': false, 'message': '', 'data': {} };
const content = {};
const fileNames = [
    "artists",
    "attackers",
    "attacks",
    "characters",
    "classes",
    "cloths",
    "constellations",
    "debuts",
    "familyMembers",
    "gods",
    "kinshipTypes",
    "masters",
    "nationality",
    "ranks",
    "saints",
];
const genders = ['Male', 'Female'];
const bloodTypes = ['A', 'B', 'AB', 'O'];

fileNames.forEach(name => {
    content[name] = [];
    fs.createReadStream(`public/data/${name}.csv`)
    .pipe(csv())
    .on('data', csvContent => {
        content[name].push(csvContent);
    });
});

const buildCloth = character => {
    const cloths = [];
    content.saints.forEach(saint => {
        if (saint.character === character.id) {
            const clothInformations = { name: "", class: "", rank: "", affiliation: "", scheme: "", artist: "" };

            content.cloths.forEach(cloth => {
                if (cloth.id === saint.cloth) {
                    clothInformations.name = cloth.name;
                }
            });

            content.classes.forEach(classInformations => {
                if (classInformations.id === saint.class) {
                    clothInformations.class = classInformations.name;
                }
            });

            content.gods.forEach(god => {
                if (god.id === saint.affiliation) {
                    clothInformations.affiliation = god.name;
                }
            });

            content.ranks.forEach(rank => {
                if (rank.id === saint.rank) {
                    clothInformations.rank = rank.name;
                }
            });

            clothInformations.scheme = saint.scheme;

            content.artists.find(artist => {
                if (saint.artist === artist.id) {
                    clothInformations.artist = artist.name;
                }
            });

            cloths.push(clothInformations);
        }
    });
    return cloths;
}

const buildCharacter = char => {
    const character = Object.assign({}, char);

    character.gender = genders[character.gender];
    
    content.nationality.forEach(nationality => {
        if (nationality.num_code === character.nationality) {
            character.nationality = nationality.nationality;
        }
    });

    character.cloth = buildCloth(character);
    
    content.nationality.forEach(nationality => {
        if (nationality.num_code === character.training) {
            character.training = nationality.en_short_name;
        }
    });
    
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

    character.family = [];
    content.familyMembers.forEach(family => {
        if (family.character === character.id) {
            const member = content.characters.find(member => member.id === family.member);
            const type = content.kinshipTypes.find(kinship => kinship.id === family.kinship);
            character.family.push(`${member.name} (${type.kinship})`);
        }
    });

    character.blood = bloodTypes[character.blood];
    
    content.debuts.forEach(debut =>  {
        if (debut.id === character.debut) {
            character.debut = debut.debut;
        }
    });
    
    return character;   
}

app.get('/characters', (req, res) => {
    response.success = true;
    response.message = 'Characters founded';
    response.data = content.characters;
    return res.status(200).json(response);
});

app.get('/characters/:id', (req, res) => {
    const character = content.characters.find(character => character.id === req.params.id);
    if (character) {
        response.success = true;
        response.message = 'Character founded';
        response.data = { character: buildCharacter(character) };
        return res.status(200).json(response);
    } else {
        response.success = false;
        response.message = 'Saint not found';
        response.data = {};
        res.status(404).send(response);
    }
});

app.get('/saints', (req, res) => {
    response.success = true;
    response.message = 'Saints founded';
    response.data = { saints };
    return res.status(200).json(response);
});

app.get('/saints/:id', (req, res) => {
    const saint = content.saints.find(saint => saint.id === req.params.id);
    if (saint) {
        response.success = true;
        response.message = 'Saint founded';
        response.data = { saint: buildCharacter(saint) };
        return res.status(200).json(response);
    } else {
        response.success = false;
        response.message = 'Saint not found';
        response.data = {};
        res.status(404).send(response);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('To shutdown the server: ctrl + c');
});