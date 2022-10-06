export const debutsData = require('../../../../../../../saint-seiya-api-data/debuts/index.json')
export const midiasData = require('../../../../../../../saint-seiya-api-data/midias/index.json')

const loadDebutData = (debutObject, midias) => {
  const debut = Object.assign({}, debutObject);

  const midia = midias.find(midia => midia.id === debut.midia);

  debut.midia = midia.name;

  return debut;
}

export const getDebutsData = (debuts, midias) => {
  return debuts.map(debut => loadDebutData(debut, midias));
}

export const getDebutData = (debuts, midias, id) => {
  let debut;

  for (let i = 0; i < debuts.length; i++) {
    if (debuts[i].id === id) {
      debut = debuts[i];
    }
  }

  return loadDebutData(debut, midias)
}
