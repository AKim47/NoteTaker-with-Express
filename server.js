const express = require('express');

const app = express();

const path = require('path');

const notes = require('./Develop/db/db.json');

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});

// return index.html
//remember to remove Develop

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// return notes.html

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

// read db.json and return all saved notes as JSON

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// save new note to db.json, and return new note to client
app.post('/api/notes', (req, res) => {
    
});

// DELETE /api/notes/:id
//app.delete('/api/notes/:id', (req, res) =>)