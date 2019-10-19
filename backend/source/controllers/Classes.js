const Content = require('../models/Content.js');

module.exports = {
  async getClassNames(request, response) {
    const content = await Content.load();

    response.json(content.classes);
  },
  async getAllClasses(request, response) {
    const content = await Content.load();

    const saints = [];
  
    for (let i = 0; i < content.saints.length; i++) {
      const saint = content.saints[i];

      saints.push(await Content.buildSaint(saint.id));
    }
  
    response.json({ saints });
  },
  async getClassSaints(request, response) {
    const content = await Content.load();

    let cls = content.classes.find(cls => request.params.class === cls.name.toLowerCase().replace(' ', '-'));
  
    if (request.params.class === 'constellations') {
      const modernConstellations = await Content.buildConstellations(content.constellations.slice(0, 88));
  
      const otherConstellations = await Content.buildConstellations(content.constellations.slice(88));
  
      response.json({ modernConstellations, otherConstellations });
    } else if (request.params.class === 'evil-stars') {
      const evilStars = await Content.buildEvilStars(content.evilStars.slice(0, 88));
  
      const otherEvilStars = await Content.buildEvilStars(content.evilStars.slice(108));
  
      response.json({ evilStars, otherEvilStars });
    } else if (cls) {
      const saints = [];
  
      for (let i = 0; i < content.saints.length; i++) {
        const saint = content.saints[i];

        if (saint.class === cls.id) {
          saints.push(await Content.buildSaint(saint.id));
        }
      }
  
      response.json({ saints });
    } else {
      response.status(404).json({ message: `${request.params.class} not found` });
    }
  },
  async getSaint(request, response) {
    const content = await Content.load();

    if (request.params.class.includes('constellation')) {
      const constellation = content.constellations.find(constellation => constellation.id === request.params.id);
  
      const saints = [];
  
      for (let i = 0; i < content.saints.length; i++) {
        const saint = content.saints[i];

        if (`constellation-${constellation.id}` === saint.symbol) {
          saints.push(await Content.buildSaint(saint.id));
        }
      }
      constellation.saints = saints;
  
      response.json({ constellation });
    } else if (request.params.class.includes('evil-star')) {
      const evilStar = content.evilStars.find(evilStar => evilStar.id === request.params.id);
  
      const saints = [];
  
      for (let i = 0; i < content.saints.length; i++) {
        const saint = content.saints[i];

        if (`evil-star-${evilStar.id}` === saint.symbol) {
          saints.push(await Content.buildSaint(saint.id));
        }
      }
  
      evilStar.saints = saints;
  
      response.json({ evilStar });
    } else {
      const cls = content.classes.find(cls => {
        if (request.params.class === cls.name.toLowerCase().replace(' ', '-') ||
            request.params.class === cls.singular.toLowerCase().replace(' ', '-')) {
          return cls;
        }
      });
  
      if (cls) {
        const saint = content.saints.find(saint => saint.class === cls.id && saint.id === request.params.id);
    
        if (saint) {
          response.json({ saint: await Content.buildSaint(saint.id) });
        } else {
          response.status(404).json({ message: `${request.params.class} not found` });
        }
      } else {
        response.status(404).json({ message: `${request.params.class} not found` });
      }
    }
  }
}