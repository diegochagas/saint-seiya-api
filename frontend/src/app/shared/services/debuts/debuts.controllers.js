export const debutsData = require('../../../api/debuts.json')
export const midiasData = require('../../../api/midias.json')

const loadDebutData = (debutObject) => {
  const debut = Object.assign({}, debutObject);

  const midia = midiasData.find(midia => midia.id === debut.midia);

  debut.midia = midia.name;

  return debut;
}

export const getDebutsData = () => {
  return debutsData.map(debut => loadDebutData(debut));
}

export const getDebutData = (id) => {
  let debut;

  for (let i = 0; i < debutsData.length; i++) {
    if (debutsData[i].id === id) {
      debut = debutsData[i];
    }
  }

  return loadDebutData(debut)
}
