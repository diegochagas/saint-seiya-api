const csv = require('csvtojson');
const FileSystem = require("fs");

const files = [
  'affiliations',
  'artists',
  'attackers',
  'attacks',
  'characters',
  'chronotectorWeapons',
  'classes',
  'cloths',
  'constellations',
  'curiosities',
  'debuts',
  'evilStars',
  'familyMembers',
  'kinships',
  'masters',
  'midias',
  'nationality',
  'places',
  'ranks',
  'saints'
];

files.forEach(file => {
  csv().fromFile(`./csv/${file}.csv`).then(jsonObj=>{
    FileSystem.writeFileSync(`./json/${file}.json`, JSON.stringify(jsonObj));
  });
});
