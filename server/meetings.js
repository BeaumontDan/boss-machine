// Import Express
const meetingsRouter = require('express').Router();

//Export Meetings Router
module.exports = meetingsRouter;

// Helper Functions from Database
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

// Get all Meetings from database
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// POST new Meeting to database
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    if (newMeeting) {
        res.send(newMeeting);
    } else {
        res.status(400).send({ error: 'Invalid Meeting' });
    }
});

// Delete Meetings from database
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});