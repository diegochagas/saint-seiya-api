const csv = require('csvtojson');
const FileSystem = require("fs");

const files = [
  'artists',
  'attackers',
  'attacks',
  'characters',
  'cloths',
  'curiosities',
  'debuts',
  'familyMembers',
  'groupsAbel',
  'groupsApsu',
  'groupsAres',
  'groupsArtemis',
  'groupsArthur',
  'groupsAstraea',
  'groupsAthena',
  'groupsBalor',
  'groupsCronus',
  'groupsCyclops',
  'groupsEris',
  'groupsGarnet',
  'groupsHades',
  'groupsHakuryu',
  'groupsLamech',
  'groupsOdin',
  'groupsOthers',
  'groupsPallas',
  'groupsPoseidon',
  'groupsRa',
  'groupsTezcatlipoca',
  'groupsTyphon',
  'groupsZeus',
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
    FileSystem.writeFileSync(`../../../../saint-seiya-api-data/${file}.json`, JSON.stringify(jsonObj));
  });
});
