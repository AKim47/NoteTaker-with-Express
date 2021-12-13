const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

const fs = require('fs');

const path = require('path');

const notes = require('./db/db.json');

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));

// parse incoming JSON data
app.use(express.json());

// return index.html
//remember to remove Develop

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// return notes.html

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// read db.json and return all saved notes as JSON

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

function newNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return body;
}

// save new note to db.json, and return new note to client
app.post('/api/notes', (req, res) => {
    //set id based on what the next index of array is
    req.body.id = notes["notes"].length.toString();
    
    const note = newNote(req.body, notes["notes"]);

    res.json(note);
});

// function findById(id, notesArray) {
//     const result = notesArray.filter(notes => notes.id === id)[0];
//     return result;
//   };

// DELETE /api/notes/:id
//app.delete('/api/notes/:id', (req, res) =>)
//const result = findById(req.params.id, notes);