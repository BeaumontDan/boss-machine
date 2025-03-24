// Import Express
const ideasRouter = require('express').Router();

//Export Ideas Router
module.exports = ideasRouter;

// Helper Functions from Database
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send({ error: 'Idea not found' });
    }
});

// GET all Ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// POST new Idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        res.status(400).send({ error: 'Invalid Idea' });
    }
});

// GET Single Idea
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// PUT update Idea
ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.status(204);
    } else {
        res.status(404).send({ error: 'Idea not found' });
    }
    res.send();
});

// DELETE Idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204);
    } else {
        res.status(500)({ error: 'Idea not found' });
    }
    res.send();
});