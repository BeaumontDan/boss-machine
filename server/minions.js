// Import Express
const minionsRouter = require('express').Router();

// Export Minions Router
module.exports = minionsRouter;

// Helper Functions from Database
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send({ error: 'Minion not found' });
    }
});

// GET all Minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// POST new Minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET Single minion
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

// PUT update minion
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// DELETE minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500)({ error: 'Minion not found' });
    }
    res.send();
});

// GET all Minion's Work
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

// POST new Minion's Work
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionIF = req.params.minionId;
    const newWork = addToDatabase('work', workToAdd);
    res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send({ error: 'Work not found' });
    }
});

// PUT updated work
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(404).send({ error: 'Minion not found' });
    } else {
        updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

// DELETE work
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500)({ error: 'Work not found' });
    }
    res.send();
});