const router = require('express').Router();
const fs = require('fs');
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
  res.json(notes);
});

// Update note
router.put('/notes/:id', (req, res) => {
  const found = notes.some((notes) => notes.id === req.params.id);

  if (found) {
    const updatedNote = req.body;

    notes.forEach((notes) => {
      if (notes.id === req.params.id) {
        notes.title = updatedNote.title ? updatedNote.title : notes.title;
        notes.text = updatedNote.text ? updatedNote.text : notes.text;

        res.json({ msg: 'Note Updated', notes });
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
});

module.exports = router;
