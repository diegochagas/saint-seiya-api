const Content = require('../models/Content.js');

module.exports = {
  async getDebuts(request, response) {
    const content = await Content.load();

    const debuts = content.debuts.map(debutObject => {
      const debut = Object.assign({}, debutObject);
  
      const midia = content.midias.find(midia => midia.id === debut.midia);
  
      debut.midia = midia.name;
  
      return debut;
    });
  
    response.json({ debuts });
  },
  async getDebut(request, response) {  
    const content = await Content.load();

    const debutObject = content.debuts.find(debut => debut.id === request.params.id);
  
    if (debutObject) {
      const debut = Object.assign({}, debutObject);
  
      const midia = content.midias.find(midia => midia.id === debut.midia);
  
      debut.midia = midia.name;
  
      response.json({ debut });
    } else {
      response.status(404).json({ message: 'Debut not found' });
    }
  }  
};