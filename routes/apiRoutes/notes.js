const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { notes } = require('../../db/db.json');

// Get notes
router.get('/notes', (req, res) => res.json(notes));

// get note by id
router.get('/notes/:id', (req, res) => {
  const found = notes.some((notes) => notes.id === req.params.id);

  if (found) {
    res.json(notes.filter((notes) => notes.id === req.params.id));
  } else {
    res.status(400).json({ error: `Note not found with id ${req.params.id}` });
  }
});

// Create note
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  if (!newNote.title || !newNote.text) {
    return res.status(400).json({ error: 'Please include a title and note.' });
  }

  notes.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes: notes }, null, 2)
  );

  const response = {
    status: 'success',
    body: notes,
  };

  res.json(response);
});

// Update note
router.put('/notes/:id', (req, res) => {
  const found = notes.some((notes) => notes.id === req.params.id);
  const updatedNote = req.body;
  if (found) {
    notes.forEach((note) => {
      if (note.id === req.params.id) {
        note.title = updatedNote.title ? updatedNote.title : note.title;
        note.text = updatedNote.text ? updatedNote.text : note.text;

        res.json({ msg: `Note ${req.params.id} Updated`, notes });
      }
    });
  } else {
    res.status(400).json({ error: `Note not found with id ${req.params.id}` });
  }
});

// Delete note
router.delete('/notes/:id', (req, res) => {
  const found = notes.some((notes) => notes.id === req.params.id);

  if (found) {
    res.json({
      msg: 'Note Deleted',
      notes: notes.filter((notes) => notes.id !== req.params.id),
    });
  } else {
    res.status(400).json({ error: `Note not found with id ${req.params.id}` });
  }
  return notes;
});

module.exports = router;
