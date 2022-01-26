const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  res.json(notes);
});

// app.post('/api/notes', (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
