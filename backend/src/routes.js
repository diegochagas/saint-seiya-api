const express = require('express');

const ArtistsController = require('./controllers/Artists.js');
const DebutsController = require('./controllers/Debuts.js');
const CharactersController = require('./controllers/Characters.js');
const ClassesController = require('./controllers/Classes.js');

const routes = express.Router();

routes.get('/artists', ArtistsController.getArtists);

routes.get('/artist/:id', ArtistsController.getArtist);

routes.get('/debuts', DebutsController.getDebuts);

routes.get('/debut/:id', DebutsController.getDebut);

routes.get('/characters', CharactersController.getCharacters);

routes.get('/character/:id', CharactersController.getCharacter);

routes.get('/curiosities', CharactersController.getCuriosities);

routes.get('/all-classes', ClassesController.getAllClasses);

routes.get('/:class', ClassesController.getClassSaints);

routes.get('/:class/:id', ClassesController.getSaint);

routes.get('/classes/debut/:id', ClassesController.getClassesByDebut);

routes.get('/classes/artist/:id', ClassesController.getClassesByArtist);

module.exports = routes;
