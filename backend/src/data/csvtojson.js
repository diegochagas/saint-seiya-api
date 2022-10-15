const csv = require('csvtojson');
const FileSystem = require("fs");

const files = [
  'artists',
  'attackers',
  'attacks',
  'characters',
  'classNames',
  'clothes',
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
  'groupsChronos',
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

function writeFileOnDataRepository(file, jsonObj) {
  let directoryPath = `../../../../saint-seiya-api-data/${file}`;
  let filePath = `${directoryPath}/index.json`;
  
  // If target is a directory, a new file with the same name will be created
  if (FileSystem.existsSync(directoryPath)) {
    FileSystem.writeFileSync(filePath, JSON.stringify(jsonObj));
  } else {
    FileSystem.mkdirSync(directoryPath);
  
    FileSystem.writeFileSync(filePath, JSON.stringify(jsonObj));
  }
}

function writeFileOnFrontEndSide(file, jsonObj) {
  FileSystem.writeFileSync(`../../../frontend/src/app/api/data/${file}.json`, JSON.stringify(jsonObj));
}

files.forEach(file => {
  csv().fromFile(`./csv/${file}.csv`).then(jsonObj=>{
    writeFileOnDataRepository(file, jsonObj);

    writeFileOnFrontEndSide(file, jsonObj);
  });
});